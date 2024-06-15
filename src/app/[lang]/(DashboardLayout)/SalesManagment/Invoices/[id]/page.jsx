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
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import { usePDF, Resolution } from "react-to-pdf";
import Image from "next/image";
import Loading from "../../../loading";

const InvoicePage = ({ params }) => {
  const [invoice, setInvoice] = useState(null);
  const [editableTransactionAmount, setEditableTransactionAmount] = useState("");
  const [editableTotalAmount, setEditableTotalAmount] = useState("");

  const router = useRouter();
  const { id } = params;
  const { toPDF, targetRef } = usePDF({
    filename: `Invoice_${id}.pdf`,
    resolution: Resolution.HIGH,
    page: {
      margin: 10,
      format: "letter",
      orientation: "portrait",
    },
  });

  const fetchInvoice = async () => {
    if (id) {
      try {
        const response = await fetch(`/api/invoices/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch invoice");
        }
        const data = await response.json();
        setInvoice(data.invoice);
        setEditableTransactionAmount(data.invoice.transaction.amount.toFixed(2));
        setEditableTotalAmount(data.invoice.totalAmount.toFixed(2));
      } catch (error) {
        console.error("Error fetching invoice:", error);
        setInvoice(null);
      }
    }
  };

  useEffect(() => {
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
        <TextField
          value={editableTransactionAmount}
          onChange={(e) => setEditableTransactionAmount(e.target.value)}
          type="number"
          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
          variant="outlined"
          sx={{
            maxWidth: '200px',
            marginRight: 2,
          }}
        />

        <Box ref={targetRef}>
          {invoice ? (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <div>
                  <Typography variant="h5" gutterBottom>
                    Invoice #{invoice._id}
                  </Typography>
                  <Typography variant="body1">
                    Detailed information about the transaction.
                  </Typography>
                </div>
                <Image
                  src="/images/logos/asm_logo.png"
                  alt="Company Logo"
                  width={300}
                  height={150}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <TableContainer component={Paper} sx={{ px: 5 }}>
                  <Table aria-label="invoice details table">
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <strong>Tel:</strong>
                        </TableCell>
                        <TableCell>

                        </TableCell>
                        <TableCell>
                          <strong>Email:</strong>
                        </TableCell>
                        <TableCell>

                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>P.O Box:</strong>
                        </TableCell>
                        <TableCell>

                        </TableCell>
                        <TableCell>
                          <strong>Mobile:</strong>
                        </TableCell>
                        <TableCell>

                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <TableContainer component={Paper} sx={{ p: 5 }}>
                <Table aria-label="invoice details table">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <strong>Transaction Amount:</strong>
                      </TableCell>
                      <TableCell>
                        {editableTransactionAmount}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Transaction ID:</strong>
                      </TableCell>
                      <TableCell>{invoice?.transaction?._id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Transaction Type:</strong>
                      </TableCell>
                      <TableCell>{invoice?.transaction?.type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Transaction Date:</strong>
                      </TableCell>
                      <TableCell>
                        {new Date(invoice?.transaction.date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Remaining Amount:</strong>
                      </TableCell>
                      <TableCell>{invoice?.transaction?.remainingAmount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Bank:</strong>
                      </TableCell>
                      <TableCell>{invoice?.transaction?.bank}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Payment Method:</strong>
                      </TableCell>
                      <TableCell>{invoice?.transaction?.paymentMethod}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Paid Cash/Cheque Number:</strong>
                      </TableCell>
                      <TableCell>{invoice?.transaction?.paidCashOrChequeNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Currency:</strong>
                      </TableCell>
                      <TableCell>{invoice?.transaction?.currency}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Amount in Words:</strong>
                      </TableCell>
                      <TableCell>{invoice?.transaction?.amountInWords}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Transaction Description:</strong>
                      </TableCell>
                      <TableCell>{invoice?.transaction.description}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Customer Name:</strong>
                      </TableCell>
                      <TableCell>{invoice?.customer.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Customer Contact Details:</strong>
                      </TableCell>
                      <TableCell>{invoice?.customer.contactDetails}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Invoice Date:</strong>
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.invoiceDate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Total Amount:</strong>
                      </TableCell>
                      <TableCell>${editableTotalAmount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Divider variant="middle" sx={{ my: 2 }} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="body1"
                          sx={{ mr: 4, fontWeight: "bold" }}
                        >
                          <span style={{ fontSize: "1rem" }}>🖊️</span>{" "}
                          Signature:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          sx={{ mr: 4, fontWeight: "bold" }}
                        >
                          <span style={{ fontSize: "1rem" }}>🖊️</span>{" "}
                          Signature:
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Loading />
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default InvoicePage;
