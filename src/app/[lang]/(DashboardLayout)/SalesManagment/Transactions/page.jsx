'use client'
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
  TextField,
  Box,
  Pagination,
} from "@mui/material";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    carId: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const queryParams = new URLSearchParams(filters);
        queryParams.set("page", currentPage);
        queryParams.set("perPage", perPage);
        const response = await fetch(`/api/transactions?${queryParams.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setTransactions(data.transactions);
          setError("");
        } else {
          console.error("Failed to fetch transaction data");
          setError("Failed to fetch transaction data. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
        setError("Failed to fetch transaction data. Please try again later.");
      }
    };

    fetchTransactions();
  }, [filters, currentPage, perPage]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <PageContainer title="Transactions" description="Transactions History">
      <DashboardCard title="Transactions">
        <Box mb={2} display="flex" alignItems="center" justifyContent={"space-between"}>
          <TextField
            name="type"
            label="Type"
            variant="outlined"
            size="small"
            value={filters.type}
            onChange={handleFilterChange}
            style={{ marginRight: 10 }}
          />
          <TextField
            name="startDate"
            label="Start Date"
            type="date"
            variant="outlined"
            size="small"
            value={filters.startDate}
            onChange={handleFilterChange}
            style={{ marginRight: 10 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="endDate"
            label="End Date"
            type="date"
            variant="outlined"
            size="small"
            value={filters.endDate}
            onChange={handleFilterChange}
            style={{ marginRight: 10 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="minAmount"
            label="Min Amount"
            type="number"
            variant="outlined"
            size="small"
            value={filters.minAmount}
            onChange={handleFilterChange}
            style={{ marginRight: 10 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="maxAmount"
            label="Max Amount"
            type="number"
            variant="outlined"
            size="small"
            value={filters.maxAmount}
            onChange={handleFilterChange}
            style={{ marginRight: 10 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="carId"
            label="Car ID"
            variant="outlined"
            size="small"
            value={filters.carId}
            onChange={handleFilterChange}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="transactions table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Car ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{transaction._id}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.car ? transaction.car._id : "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(transactions.length / perPage)}
          page={currentPage}
          onChange={(event, page) => handlePaginationChange(page)}
          style={{ marginTop: 10 }}
        />
      </DashboardCard>
    </PageContainer>
  );
};

export default TransactionsPage;
