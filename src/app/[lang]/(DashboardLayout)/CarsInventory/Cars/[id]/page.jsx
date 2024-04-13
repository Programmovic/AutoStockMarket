"use client";
// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import Axios
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Typography,
  Box,
  TableContainer,
  Button,
} from "@mui/material";

// Define the CarDetailsPage component
const CarDetailsPage = ({ params }) => {
  const [car, setCar] = useState(null); // State to hold the car data
  const router = useRouter();
  const { id } = params; // Get the car ID from the query parameters

  useEffect(() => {
    // Function to fetch car details by ID
    const fetchCarDetails = async () => {
      try {
        // Make a GET request to fetch the car details by ID
        const response = await axios.get(`/api/car/${id}`);
        setCar(response.data); // Update state with the fetched car data
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails(); // Invoke the fetchCarDetails function
  }, [id]); // Trigger the effect whenever the ID changes

  return (
    <PageContainer
      title="Car Details"
      description="Details of the selected car"
    >
      <DashboardCard>
        {car ? (
          <Box>
            <Typography variant="h5" align="center" gutterBottom sx={{ mb: 2 }}>
              Car Details - {car.name}
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="car details table">
                <TableBody>
                  {/* Display car details in table rows */}
                  <TableRow>
                    <TableCell><strong>ID:</strong></TableCell>
                    <TableCell>{car._id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Name:</strong></TableCell>
                    <TableCell>{car.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Color:</strong></TableCell>
                    <TableCell>{car.color}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Model:</strong></TableCell>
                    <TableCell>{car.model}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Chassis Number:</strong></TableCell>
                    <TableCell>{car.chassisNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Owner:</strong></TableCell>
                    <TableCell>{car.owner}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Purchase Details:</strong></TableCell>
                    <TableCell>{car.purchaseDetails}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Maintenance:</strong></TableCell>
                    <TableCell>{car.maintenance}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Current Location:</strong></TableCell>
                    <TableCell>{car.currentLocation}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Typography variant="body1" align="center">
            Loading car details...
          </Typography>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

// Export the CarDetailsPage component
export default CarDetailsPage;
