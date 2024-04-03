"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
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

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const router = useRouter(); // Use useRouter hook

  useEffect(() => {
    const fetchInvoices = async () => {
      // Placeholder for your actual invoice fetching logic
      const data = [
        {
          id: 1,
          transactionId: "TXN123456",
          customerId: "CUST789",
          invoiceDate: "2024-03-28",
          totalAmount: 1000,
        },
        // Add more invoice mock data here if needed
      ];
      setInvoices(data);
    };

    fetchInvoices();
  }, []);

  const handleRowClick = (invoiceId) => {
    // Navigate to the invoice detail page
    router.push(`/SalesManagment/Invoices/${invoiceId}`);
  };

  return (
    <PageContainer title="Invoices" description="List of all invoices">
      <DashboardCard title="Invoice List">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="invoice table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Customer ID</TableCell>
                <TableCell>Invoice Date</TableCell>
                <TableCell>Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow 
                  key={invoice.id} 
                  hover={true} 
                  onClick={() => handleRowClick(invoice.id)} 
                  style={{ cursor: 'pointer' }} // Change cursor to indicate clickability
                >
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.transactionId}</TableCell>
                  <TableCell>{invoice.customerId}</TableCell>
                  <TableCell>{invoice.invoiceDate}</TableCell>
                  <TableCell>{invoice.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default InvoicesPage;
