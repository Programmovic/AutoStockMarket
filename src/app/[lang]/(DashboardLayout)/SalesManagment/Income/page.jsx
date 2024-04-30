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
  Box,
  Grid
} from "@mui/material";
import Loading from "../../loading"; // Import the loading component
import AnalysisCard from "../../components/shared/DashboardAnalysisCard";

const IncomePage = () => {
  const [incomeDetails, setIncomeDetails] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIncomeDetails = async () => {
      setLoading(true); // Set loading state to true when fetching starts
      try {
        const response = await fetch("/api/income");
        if (response.ok) {
          const data = await response.json();
          setIncomeDetails(data.incomeDetails);
          setError("");
        } else {
          console.error("Failed to fetch income data");
          setError("Failed to fetch income data. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching income data:", error);
        setError("Failed to fetch income data. Please try again later.");
      } finally {
        setLoading(false); // Set loading state to false when fetching ends
      }
    };

    fetchIncomeDetails();
  }, []);

  return (
    <PageContainer title="Income" description="Total Income and Car Details">
      <DashboardCard title="Income">
        {loading ? (
          <Loading />
        ) : error ? (
          <div>{error}</div>
        ) : incomeDetails ? (
          <>
            <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalysisCard
              title="Total Income"
              number={incomeDetails.totalIncome}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalysisCard
              title="Number of Cars"
              number={incomeDetails.totalCars}
            />
          </Grid>
        </Grid>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="income details table">
                <TableHead>
                  <TableRow>
                    <TableCell>Car ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Net Profit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomeDetails.soldCarsDetails.map((carDetail) => (
                    <TableRow key={carDetail._id}>
                      <TableCell>{carDetail.car._id}</TableCell>
                      <TableCell>{carDetail.car.name}</TableCell>
                      <TableCell>{carDetail.car.color}</TableCell>
                      <TableCell>{carDetail.car.model}</TableCell>
                      <TableCell>{carDetail.netProfit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : null}
      </DashboardCard>
    </PageContainer>
  );
};

export default IncomePage;
