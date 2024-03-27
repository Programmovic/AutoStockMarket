"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { Table, TableBody, TableCell, TableRow, Paper, Typography, Box, TableContainer } from "@mui/material";

const InvoicePage = ({params}) => {
  const [invoice, setInvoice] = useState(null);
  const router = useRouter();
  const pathname = usePathname()
  
  const { id } = params // Get the invoice ID from the query parameters
  console.log(id)
  useEffect(() => {
    const fetchInvoice = async () => {
      if (id) {
        // try {
        //   // Fetch invoice data based on the ID from the API
        //   const response = await fetch(`/api/invoices/${id}`); // Replace with your actual API endpoint
        //   if (response.ok) {
        //     const data = await response.json();
        //     setInvoice(data);
        //   } else {
        //     console.error("Failed to fetch invoice data");
        //   }
        // } catch (error) {
        //   console.error("Error fetching invoice data:", error);
        // }
        const data =
          {
            id: 1,
            transactionId: "TXN123456",
            customerId: "CUST789",
            invoiceDate: "2024-03-28",
            totalAmount: 1000,
          }
        setInvoice(data);
      }
    };

    fetchInvoice();
  }, [id]);

  return (
    <PageContainer title="Invoice Details" description="Details of the selected invoice">
      <DashboardCard>
        {invoice ? (
          <Box>
            <Typography variant="h4" gutterBottom>
              Invoice #{invoice.id}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Detailed information about the transaction.
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="invoice details table">
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Transaction ID</strong></TableCell>
                    <TableCell>{invoice.transactionId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Customer ID</strong></TableCell>
                    <TableCell>{invoice.customerId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Invoice Date</strong></TableCell>
                    <TableCell>{invoice.invoiceDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Total Amount</strong></TableCell>
                    <TableCell>${invoice.totalAmount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Typography variant="body1">Loading invoice data...</Typography>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default InvoicePage;
