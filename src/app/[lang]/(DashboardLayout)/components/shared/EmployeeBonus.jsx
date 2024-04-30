// BonusRecords.js
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

const BonusRecords = ({ employeeId, deductions = false }) => {
  const [bonuses, setBonuses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employee bonus records
  useEffect(() => {
    const fetchBonuses = async () => {
      try {
        const response = await axios.get(
          `/api/employee/${employeeId}/${deductions ? "deduction" : "bonus"}`
        );
        setBonuses(
          deductions ? response.data.deductions : response.data.bonuses
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee bonuses:", error);
      }
    };

    fetchBonuses();
  }, [employeeId]);

  return (
    <Box marginTop={5}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box marginBottom={5}>
            <Typography variant="h6" gutterBottom>
              Employee {deductions ? "Deduction" : "Bonus"} Records
            </Typography>
          </Box>

          <TableContainer component={Paper}>
            <Table aria-label="employee bonus table">
              <TableHead>
                <TableRow>
                  <TableCell>Date Received</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bonuses.map((bonus) => (
                  <TableRow key={bonus._id}>
                    <TableCell>{bonus.dateReceived}</TableCell>
                    <TableCell>{bonus.amount}</TableCell>
                    <TableCell>{bonus.reason}</TableCell>
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

export default BonusRecords;
