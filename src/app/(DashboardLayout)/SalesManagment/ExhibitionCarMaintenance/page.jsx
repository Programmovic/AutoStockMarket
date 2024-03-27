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

const CarMaintenanceExhibitionPage = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);

  useEffect(() => {
    // Fetch car maintenance data for the exhibition
    const fetchMaintenanceData = async () => {
      try {
        // Replace this with the actual API endpoint to fetch car maintenance data
        const response = await fetch("API_ENDPOINT_TO_FETCH_CAR_MAINTENANCE_DATA");
        if (response.ok) {
          const data = await response.json();
          setMaintenanceData(data);
        } else {
          console.error("Failed to fetch car maintenance data");
        }
      } catch (error) {
        console.error("Error fetching car maintenance data:", error);
      }
    };

    fetchMaintenanceData();
  }, []);

  return (
    <PageContainer title="Car Maintenance Exhibition" description="Maintenance expenses for exhibition cars">
      <DashboardCard title="Car Maintenance Records">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="car maintenance table">
            <TableHead>
              <TableRow>
                <TableCell>Car Name</TableCell>
                <TableCell>Maintenance Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {maintenanceData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.carName}</TableCell>
                  <TableCell>{item.maintenanceValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default CarMaintenanceExhibitionPage;
