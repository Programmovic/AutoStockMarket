"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
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
import { usePDF, Resolution, Margin } from "react-to-pdf";

const CarDetailsPage = ({ params }) => {
  const [car, setCar] = useState(null);
  const router = useRouter();
  const { id } = params; // Get the car ID from the query parameters
  const { toPDF, targetRef } = usePDF({
    filename: `Car_Details_${id}.pdf`,
    resolution: Resolution.HIGH,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: 10,
      // default is 'A4'
      format: "letter",
      // default is 'portrait'
      orientation: "portrait",
    },
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (id) {
        // Simulated data until API integration
        const data = {
          id: 1,
          carName: "Toyota Camry",
          color: "Blue",
          model: "2022",
          chassisNumber: "ABC123456",
          owner: "John Doe",
          by: "Company XYZ",
          source: "Dealer",
          purchaseDate: "2023-01-15",
          capital: 25000,
          maintenance: 500,
          total: 25500,
          day: 15,
          month: "January",
          todaysDate: "2024-03-29",
          vehicleLocation: "Garage",
        };
        setCar(data);
      }
    };

    fetchCarDetails();
  }, [id]);

  return (
    <PageContainer
      title="Car Details"
      description="Details of the selected car"
    >
      <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={() => toPDF()}>
            Download {car?.carName} Details
          </Button>
        </Box>
      <DashboardCard>
        
        <Box ref={targetRef}>
          {car ? (
            <Box>
              <Typography variant="h5" align="center" gutterBottom sx={{ mb: 2 }}>
                Car Details - {car.carName}
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="car details table">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <strong>ID:</strong>
                      </TableCell>
                      <TableCell>{car.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Car Name:</strong>
                      </TableCell>
                      <TableCell>{car.carName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Color:</strong>
                      </TableCell>
                      <TableCell>{car.color}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Model:</strong>
                      </TableCell>
                      <TableCell>{car.model}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Chassis Number:</strong>
                      </TableCell>
                      <TableCell>{car.chassisNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Owner:</strong>
                      </TableCell>
                      <TableCell>{car.owner}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>By:</strong>
                      </TableCell>
                      <TableCell>{car.by}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Source:</strong>
                      </TableCell>
                      <TableCell>{car.source}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Purchase Date:</strong>
                      </TableCell>
                      <TableCell>{car.purchaseDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Capital:</strong>
                      </TableCell>
                      <TableCell>${car.capital.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Maintenance:</strong>
                      </TableCell>
                      <TableCell>${car.maintenance.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Total:</strong>
                      </TableCell>
                      <TableCell>${car.total.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Day:</strong>
                      </TableCell>
                      <TableCell>{car.day}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Month:</strong>
                      </TableCell>
                      <TableCell>{car.month}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Today's Date:</strong>
                      </TableCell>
                      <TableCell>{car.todaysDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Vehicle Location:</strong>
                      </TableCell>
                      <TableCell>{car.vehicleLocation}</TableCell>
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
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default CarDetailsPage;
