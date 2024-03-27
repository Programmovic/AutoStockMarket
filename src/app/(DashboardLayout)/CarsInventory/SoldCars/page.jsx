"use client";
import { useEffect, useState } from "react";
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
} from "@mui/material";

const SoldCarsPage = () => {
  const [soldCars, setSoldCars] = useState([]);

  useEffect(() => {
    // Fetch sold cars data here
    const fetchSoldCars = async () => {
      try {
        // Replace this with actual API endpoint to fetch sold cars data
        const response = await fetch("API_ENDPOINT_TO_FETCH_SOLD_CARS");
        if (response.ok) {
          const data = await response.json();
          setSoldCars(data);
        } else {
          console.error("Failed to fetch sold cars data");
        }
      } catch (error) {
        console.error("Error fetching sold cars data:", error);
      }
    };

    fetchSoldCars();
  }, []);

  return (
    <PageContainer title="Sold Cars" description="Sold Cars Inventory">
      <DashboardCard title="Sold Cars">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="sold cars table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Car ID</TableCell>
                <TableCell>Previous Owner</TableCell>
                <TableCell>Purchaser</TableCell>
                <TableCell>Purchase Date</TableCell>
                <TableCell>Purchase Price</TableCell>
                {/* Add more table headings for additional sold car details */}
              </TableRow>
            </TableHead>
            <TableBody>
              {soldCars.map((soldCar) => (
                <TableRow key={soldCar.id}>
                  <TableCell>{soldCar.id}</TableCell>
                  <TableCell>{soldCar.carId}</TableCell>
                  <TableCell>{soldCar.previousOwner}</TableCell>
                  <TableCell>{soldCar.purchaser}</TableCell>
                  <TableCell>{soldCar.purchaseDate}</TableCell>
                  <TableCell>{soldCar.purchasePrice}</TableCell>
                  {/* Render additional cell data for other sold car details */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default SoldCarsPage;
