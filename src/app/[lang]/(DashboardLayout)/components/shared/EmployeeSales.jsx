// SalesRecords.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';
import Loading from '../../loading'; // Ensure correct path for the Loading component

const SalesRecords = ({ employeeId }) => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employee sales records
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(`/api/employee/${employeeId}/sales`);
        setSales(response.data.sales); // Adjust according to your API response structure
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee sales:', error);
        setLoading(false);
      }
    };

    fetchSales();
  }, [employeeId]);

  return (
    <Box marginTop={5}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box marginBottom={5}>
            <Typography variant="h6" gutterBottom>
              Employee Sales Records
            </Typography>
          </Box>

          <TableContainer component={Paper}>
            <Table aria-label="employee sales table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Sale Amount</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Customer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale._id}>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>${sale.amount}</TableCell>
                    <TableCell>{sale.productName}</TableCell>
                    <TableCell>{sale.customerName}</TableCell>
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
