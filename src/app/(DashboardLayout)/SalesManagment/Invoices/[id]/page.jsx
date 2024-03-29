// InvoicePage.jsx
"use client";
import React, { useEffect, useState } from "react";
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

const InvoicePage = ({ params }) => {
  const [invoice, setInvoice] = useState(null);
  const router = useRouter();
  const { id } = params; // Get the invoice ID from the query parameters
  const { toPDF, targetRef } = usePDF({
    filename: `Invoice_${id}.pdf`,
    resolution: Resolution.HIGH,
    page: {
      margin: 10,
      format: "letter",
      orientation: "portrait",
    },
  });

  useEffect(() => {
    const fetchInvoice = async () => {
      if (id) {
        // Simulated data until API integration
        const data = {
          id: 1,
          transactionId: "TXN123456",
          customerId: "CUST789",
          invoiceDate: "2024-03-28",
          totalAmount: 1000,
        };
        setInvoice(data);
      }
    };

    fetchInvoice();
  }, [id]);

  return (
    <PageContainer
      title="Invoice Details"
      description="Details of the selected invoice"
    >
      <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={() => toPDF()}>
            Download Invoice
          </Button>
        </Box>
      <DashboardCard>
        
        <Box ref={targetRef}>
          {invoice ? (
            <Box>
              <Typography variant="h5" align="center" gutterBottom sx={{ mb: 2 }}>
                Invoice #{invoice.id}
              </Typography>
              <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                Detailed information about the transaction.
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="invoice details table">
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Transaction ID:</strong></TableCell>
                      <TableCell>{invoice.transactionId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Customer ID:</strong></TableCell>
                      <TableCell>{invoice.customerId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Invoice Date:</strong></TableCell>
                      <TableCell>{invoice.invoiceDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Total Amount:</strong></TableCell>
                      <TableCell>${invoice.totalAmount.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Typography variant="body1" align="center">Loading invoice data...</Typography>
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default InvoicePage;
