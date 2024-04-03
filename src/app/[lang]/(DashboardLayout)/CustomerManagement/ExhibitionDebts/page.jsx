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

const DebtsExhibitionPage = () => {
  const [debtsData, setDebtsData] = useState([]);

  useEffect(() => {
    // Fetch debts data for the exhibition
    const fetchDebtsData = async () => {
      try {
        // Replace this with the actual API endpoint to fetch debts data
        const response = await fetch("API_ENDPOINT_TO_FETCH_DEBTS_DATA");
        if (response.ok) {
          const data = await response.json();
          setDebtsData(data);
        } else {
          console.error("Failed to fetch debts data");
        }
      } catch (error) {
        console.error("Error fetching debts data:", error);
      }
    };

    fetchDebtsData();
  }, []);

  return (
    <PageContainer title="Debts Exhibition" description="Overview of debts for the exhibition">
      <DashboardCard title="Debt Records">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="debts table">
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {debtsData.map((debt, index) => (
                <TableRow key={index}>
                  <TableCell>{debt.customerName}</TableCell>
                  <TableCell>{debt.amount}</TableCell>
                  <TableCell>{debt.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default DebtsExhibitionPage;
