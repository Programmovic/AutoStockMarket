import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Grid,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Paper
} from "@mui/material";
import axios from "axios";

const steps = ["Customer Details", "Review"];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Adjusted width
  maxWidth: "1500px", // Max width
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px", // Rounded corners
};

function getStepContent(step, customerData, handleInputChange) {
  switch (step) {
    case 0: // Customer Details
      return (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Customer Name"
              name="name"
              value={customerData?.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Contact Details"
              name="contactDetails"
              value={customerData?.contactDetails}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      );
    case 1: // Review
      return (
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="customer details">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">Customer Name</TableCell>
                  <TableCell>{customerData?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Contact Details</TableCell>
                  <TableCell>{customerData?.contactDetails}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );

    default:
      return "Unknown step";
  }
}

const CreateCustomerModal = ({ open, handleClose, fetchCustomers, initialCustomerData, isEditing }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [customerData, setCustomerData] = useState(initialCustomerData);

  useEffect(() => {
    setCustomerData(initialCustomerData);
    setActiveStep(0);
  }, [open, initialCustomerData]);

  const handleReset = () => {
    setActiveStep(0);
    setCustomerData(initialCustomerData);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit(); // Call the handleSubmit function to submit the form data
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        // Make a PUT request to update the customer data
        const response = await axios.put(`/api/customers/${customerData?._id}`, customerData);
        if (response.data.message) {
          // Reset form and close modal if customer update is successful
          handleReset();
          handleClose();
          fetchCustomers();
        } else {
          console.error("Error updating customer:", response.data.error);
        }
      } else {
        // Make a POST request to create a new customer
        const response = await axios.post("/api/customers", customerData);
        if (response.data.message) {
          // Reset form and close modal if customer creation is successful
          handleReset();
          handleClose();
          fetchCustomers();
        } else {
          console.error("Error creating customer:", response.data.error);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
          {getStepContent(activeStep, customerData, handleInputChange)}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateCustomerModal;
