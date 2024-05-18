// EmployeeSoldCars.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Typography,
  Box,
  TableHead,
  TableContainer,
} from "@mui/material";
import Loading from "../../loading";

const SalesRecords = ({ employeeId }) => {
  const [soldCars, setSoldCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employee's sold cars
  useEffect(() => {
    const fetchSoldCars = async () => {
      try {
        const response = await axios.get(
          `/api/employee/${employeeId}/sales_cars`
        );
        setSoldCars(response.data.soldCars);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee's sold cars:", error);
      }
    };

    fetchSoldCars();
  }, [employeeId]);

  return (
    <Box marginTop={5}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box marginBottom={5}>
            <Typography variant="h6" gutterBottom>
              Employee Sold Cars
            </Typography>
          </Box>

          <TableContainer component={Paper}>
            <Table aria-label="employee sold cars table">
              <TableHead>
                <TableRow>
                  <TableCell>Car</TableCell>
                  <TableCell>Previous Owner</TableCell>
                  <TableCell>Purchaser</TableCell>
                  <TableCell>Purchase Date</TableCell>
                  <TableCell>Purchase Price</TableCell>
                  <TableCell>Source of Selling</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {soldCars?.map((soldCar) => (
                  <TableRow key={soldCar._id}>
                    <TableCell>{soldCar.car}</TableCell>
                    <TableCell>{soldCar.previousOwner}</TableCell>
                    <TableCell>{soldCar.purchaser}</TableCell>
                    <TableCell>{soldCar.purchaseDate}</TableCell>
                    <TableCell>{soldCar.purchasePrice}</TableCell>
                    <TableCell>{soldCar.sourceOfSelling}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default SalesRecords;
