'use client'
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { IconFileInvoice } from "@tabler/icons-react";
import { Add } from "@mui/icons-material";
import Loading from "../../loading";

const CarsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams()

  const createCar = searchParams.get('CreateCar')
  const [cars, setCars] = useState([]);
  const [modalOpen, setModalOpen] = useState(createCar || false);
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
    const currentDate = new Date();
    const carEntryDate = new Date(entryDate);
    const durationInMonths = (currentDate.getFullYear() - carEntryDate.getFullYear()) * 12 + currentDate.getMonth() - carEntryDate.getMonth();

    if (durationInMonths < 3) {
      return "🟢"; // Less than 3 months (green)
    } else if (durationInMonths < 6) {
      return "🟠"; // 3 to 6 months (orange)
    } else {
      return "🔴"; // Greater than 6 months (red)
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
                style={{ marginRight: 10 }}
              />
              <TextField
                name="entryDate"
                label="Entry Date"
                variant="outlined"
                size="small"
                type="date"
                value={filters.entryDate}
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
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cars.map((car) => (
                    <TableRow
                      key={car._id}
                      style={{ cursor: "pointer" }}
                      hover={true}
                    >
                      <TableCell
                        onClick={() => handleRowClick(car._id)}>{car.name}</TableCell>
                      <TableCell>{car.color}</TableCell>
                      <TableCell>{car.model}</TableCell>
                      <TableCell>{car.chassisNumber}</TableCell>
                      <TableCell>{car?.owner?.name}</TableCell>
                      <TableCell>{car.purchaseDetails}</TableCell>
                      <TableCell>
                        {new Date(car.entryDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{car.maintenance}</TableCell>
                      <TableCell>{car.currentLocation}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {getDurationMarker(car.entryDate)}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <IconButton
                          onClick={() => router.push(`/en/SalesManagment/Invoices/Car/${car._id}`)}
                          aria-label="See Invoices"
                          color="primary"
                        >
                          <IconFileInvoice />
                        </IconButton>
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
