'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import CreateCarModal from "@/app/(DashboardLayout)/components/shared/CreateCarModal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  IconButton,
  TablePagination, // Import TablePagination component
} from "@mui/material";
import { Add } from "@mui/icons-material";
import Loading from "../../loading";

const CarsPage = () => {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    color: "",
    model: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Define rowsPerPage state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/car", {
        params: {
          ...filters,
          page: currentPage + 1, // Adjust page number to 1-based index
          perPage: rowsPerPage,
        },
      });
      const filteredCars = response.data.cars.filter(
        (car) => car.currentLocation !== "Sold"
      );
      setCars(filteredCars);
      setError("");
    } catch (error) {
      console.error("Error fetching cars:", error);
      setError("Failed to fetch cars. Please try again later.");
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [filters, currentPage, rowsPerPage]);

  const handleRowClick = (id) => {
    router.push(`/en/CarsInventory/Cars/${id}`);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const getDurationMarker = (entryDate) => {
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const twoWeeks = 2 * oneWeek;
    const currentDate = new Date();
    const carEntryDate = new Date(entryDate);
    const duration = currentDate.getTime() - carEntryDate.getTime();
    if (duration < oneWeek) {
      return "🟢";
    } else if (duration < twoWeeks) {
      return "🟠";
    } else {
      return "🔴";
    }
  };

  return (
    <PageContainer title="Cars" description="Cars Inventory">
      <DashboardCard title="Cars">


        <>
          <Box
            mb={2}
            display="flex"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Box mr={1}>
              <IconButton
                onClick={() => setModalOpen(true)}
                aria-label="add new car"
                color="primary"
              >
                <Add />
              </IconButton>
            </Box>

            <Box flexGrow={1}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                size="small"
                value={filters.name}
                onChange={handleFilterChange}
                style={{ marginRight: 10 }}
              />
              <TextField
                name="color"
                label="Color"
                variant="outlined"
                size="small"
                value={filters.color}
                onChange={handleFilterChange}
                style={{ marginRight: 10 }}
              />
              <TextField
                name="model"
                label="Model"
                variant="outlined"
                size="small"
                value={filters.model}
                onChange={handleFilterChange}
                style={{ marginRight: 10 }}
              />
              <TextField
                name="chassisNumber"
                label="Chassis Number"
                variant="outlined"
                size="small"
                value={filters.chassisNumber}
                onChange={handleFilterChange}
              />

            </Box>
          </Box>
          {loading ? (<Loading />) :
            (<TableContainer
              component={Paper}
              sx={{ maxWidth: "100%", overflowX: "auto" }}
            >
              <Table aria-label="cars table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Chassis Number</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Purchase Details</TableCell>
                    <TableCell>Entry Date</TableCell>
                    <TableCell>Maintenance</TableCell>
                    <TableCell>Current Location</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cars.map((car) => (
                    <TableRow
                      key={car._id}
                      onClick={() => handleRowClick(car._id)}
                      style={{ cursor: "pointer" }}
                      hover={true}
                    >
                      <TableCell>{car.name}</TableCell>
                      <TableCell>{car.color}</TableCell>
                      <TableCell>{car.model}</TableCell>
                      <TableCell>{car.chassisNumber}</TableCell>
                      <TableCell>{car.owner}</TableCell>
                      <TableCell>{car.purchaseDetails}</TableCell>
                      <TableCell>
                        {new Date(car.entryDate).toLocaleString()}
                      </TableCell>
                      <TableCell>{car.maintenance}</TableCell>
                      <TableCell>{car.currentLocation}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {getDurationMarker(car.entryDate)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>)
          }
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={cars.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ marginTop: 10 }}
          />
        </>
      </DashboardCard>
      <CreateCarModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        fetchCars={fetchCars}
      />
    </PageContainer>
  );
};

export default CarsPage;
