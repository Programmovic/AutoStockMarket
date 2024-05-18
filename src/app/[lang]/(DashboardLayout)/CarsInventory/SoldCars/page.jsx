'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Pagination,
  IconButton,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const SoldCarsPage = () => {
  const router = useRouter();
  const [soldCars, setSoldCars] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    carId: "",
    purchaserId: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Number of items per page
  const [error, setError] = useState(""); // Define error state

  // Define fetchSoldCars function
  const fetchSoldCars = async () => {
    try {
      console.log("fetching sold cars");
      const response = await axios.get("/api/sold-cars", {
        params: {
          ...filters,
          page: currentPage,
          perPage: perPage,
        },
      });
      setSoldCars(response.data.soldCars);
      setError(""); // Clear error on successful fetch
    } catch (error) {
      console.error("Error fetching sold cars:", error);
      setError("Failed to fetch sold cars. Please try again later.");
      setSoldCars([]); // Set soldCars array to empty in case of error
    }
  };

  useEffect(() => {
    fetchSoldCars();
  }, [filters, currentPage]);

  const handleRowClick = (id) => {
    router.push(`/en/CarsInventory/Cars/${id}`);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <PageContainer title="Sold Cars" description="Sold Cars Management">
      <DashboardCard title="Sold Cars">
        <Box
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Box mr={1}>
            <IconButton
              onClick={() => setModalOpen(true)}
              aria-label="add new sold car record"
              color="primary"
            >
              <Add />
            </IconButton>
          </Box>

          <Box flexGrow={1}>
            <TextField
              name="carId"
              label="Car ID"
              variant="outlined"
              size="small"
              value={filters.carId}
              onChange={handleFilterChange}
              style={{ marginRight: 10 }}
            />
            <TextField
              name="purchaserId"
              label="Purchaser ID"
              variant="outlined"
              size="small"
              value={filters.purchaserId}
              onChange={handleFilterChange}
            />
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto" }}>
          <Table aria-label="sold cars table">
            <TableHead>
              <TableRow>
                <TableCell>Car Name</TableCell>
                <TableCell>Purchaser Name</TableCell>
                <TableCell>Purchase Date</TableCell>
                <TableCell>Purchase Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {soldCars?.map((soldCar) => (
                <TableRow
                  key={soldCar._id}
                  onClick={() => handleRowClick(soldCar?.car?._id)}
                  style={{ cursor: "pointer" }}
                  hover={true}
                >
                  <TableCell>{soldCar.car.name}</TableCell>
                  <TableCell>{soldCar.purchaser.name}</TableCell>
                  <TableCell>{new Date(soldCar.purchaseDate).toLocaleDateString()}</TableCell>
                  <TableCell>${soldCar.purchasePrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(soldCars?.length / perPage)}
          page={currentPage}
          onChange={(event, page) => handlePaginationChange(page)}
          style={{ marginTop: 10 }}
        />
      </DashboardCard>
    </PageContainer>
  );
};

export default SoldCarsPage;
