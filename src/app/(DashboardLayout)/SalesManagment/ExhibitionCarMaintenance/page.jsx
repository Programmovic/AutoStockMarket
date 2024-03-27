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

const VehicleMaintenancePage = () => {
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    // Fetch vehicle maintenance data here
    const fetchVehicleData = async () => {
      try {
        // Replace this with the actual API endpoint to fetch vehicle data
        const response = await fetch("API_ENDPOINT_TO_FETCH_VEHICLE_DATA");
        if (response.ok) {
          const data = await response.json();
          setVehicleData(data);
        } else {
          console.error("Failed to fetch vehicle maintenance data");
        }
      } catch (error) {
        console.error("Error fetching vehicle maintenance data:", error);
      }
    };

    fetchVehicleData();
  }, []);

  return (
    <PageContainer title="Vehicle Maintenance" description="Details of vehicle maintenance tasks">
      <DashboardCard title="Vehicle Maintenance Records">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="vehicle maintenance table">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Chassis Number</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicleData.map((vehicle, index) => (
                <TableRow key={index}>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>{vehicle.color}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.chassisNumber}</TableCell>
                  <TableCell>{vehicle.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default VehicleMaintenancePage;
