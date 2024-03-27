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

const CarsPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch car data here
    const fetchCars = async () => {
      try {
        // Replace this with actual API endpoint to fetch cars data
        const response = await fetch("API_ENDPOINT_TO_FETCH_CARS");
        if (response.ok) {
          const data = await response.json();
          setCars(data);
        } else {
          console.error("Failed to fetch cars data");
        }
      } catch (error) {
        console.error("Error fetching cars data:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <PageContainer title="Cars" description="Cars Inventory">
      <DashboardCard title="Cars">
        <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto" }}>
          <Table sx={{ minWidth: 650 }} aria-label="cars table">
            <TableHead>
              <TableRow>
                {/* Table headers adjusted for your columns */}
                <TableCell>ID</TableCell>
                <TableCell>Car Name</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Chassis Number</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>By</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Purchase Date</TableCell>
                <TableCell>Capital</TableCell>
                <TableCell>Maintenance</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Today&apos;s Date</TableCell>
                <TableCell>Vehicle Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id}>
                  {/* Table cells adjusted for your data structure */}
                  <TableCell>{car.id}</TableCell>
                  <TableCell>{car.carName}</TableCell>
                  <TableCell>{car.color}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.chassisNumber}</TableCell>
                  <TableCell>{car.owner}</TableCell>
                  <TableCell>{car.by}</TableCell>
                  <TableCell>{car.source}</TableCell>
                  <TableCell>{car.purchaseDate}</TableCell>
                  <TableCell>{car.capital}</TableCell>
                  <TableCell>{car.maintenance}</TableCell>
                  <TableCell>{car.total}</TableCell>
                  <TableCell>{car.day}</TableCell>
                  <TableCell>{car.month}</TableCell>
                  <TableCell>{car.todaysDate}</TableCell>
                  <TableCell>{car.vehicleLocation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default CarsPage;
