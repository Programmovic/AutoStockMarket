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

const IncomePage = () => {
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    // Fetch income data here
    const fetchIncomeData = async () => {
      try {
        // Replace this with actual API endpoint to fetch income data
        const response = await fetch("API_ENDPOINT_TO_FETCH_INCOME_DATA");
        if (response.ok) {
          const data = await response.json();
          setIncomeData(data);
        } else {
          console.error("Failed to fetch income data");
        }
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };

    fetchIncomeData();
  }, []);

  return (
    <PageContainer title="Income" description="Income Details">
      <DashboardCard title="Income">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="income table">
            <TableHead>
              <TableRow>
                <TableCell>Car Name</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Chassis Number</TableCell>
                <TableCell>Net Profit</TableCell>
                <TableCell>Exhibition Profit</TableCell>
                <TableCell>Financier</TableCell>
                <TableCell>Partner Profit</TableCell>
                <TableCell>Date</TableCell>
                {/* Add more table headings for additional income details */}
              </TableRow>
            </TableHead>
            <TableBody>
              {incomeData.map((income) => (
                <TableRow key={income.id}>
                  <TableCell>{income.carName}</TableCell>
                  <TableCell>{income.model}</TableCell>
                  <TableCell>{income.chassisNumber}</TableCell>
                  <TableCell>{income.netProfit}</TableCell>
                  <TableCell>{income.exhibitionProfit}</TableCell>
                  <TableCell>{income.financier}</TableCell>
                  <TableCell>{income.partnerProfit}</TableCell>
                  <TableCell>{income.date}</TableCell>
                  {/* Render additional cell data for other income details */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default IncomePage;
