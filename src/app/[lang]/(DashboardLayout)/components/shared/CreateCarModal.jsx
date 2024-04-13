import React, { useState } from "react";
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

const steps = ["Car Details", "Ownership", "Review"];

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
function getStepContent(step, carData, handleInputChange) {
  switch (step) {
    case 0: // Car Details
      return (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Car Name"
              name="name"
              value={carData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={carData.color}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Model"
              name="model"
              value={carData.model}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Chassis Number"
              name="chassisNumber"
              value={carData.chassisNumber}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      );
    case 1: // Ownership
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Owner"
              name="owner"
              value={carData.owner}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Purchase Details"
              name="purchaseDetails"
              value={carData.purchaseDetails}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Maintenance"
              name="maintenance"
              value={carData.maintenance}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Location"
              name="currentLocation"
              value={carData.currentLocation}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      );
      case 2: // Finalize
      return (
          <div>
              <TableContainer component={Paper}>
                  <Table aria-label="car details">
                      <TableBody>
                          <TableRow>
                              <TableCell component="th" scope="row">Car Name</TableCell>
                              <TableCell>{carData.name}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell component="th" scope="row">Color</TableCell>
                              <TableCell>{carData.color}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell component="th" scope="row">Model</TableCell>
                              <TableCell>{carData.model}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell component="th" scope="row">Chassis Number</TableCell>
                              <TableCell>{carData.chassisNumber}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell component="th" scope="row">Owner</TableCell>
                              <TableCell>{carData.owner}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell component="th" scope="row">Purchase Details</TableCell>
                              <TableCell>{carData.purchaseDetails}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell component="th" scope="row">Maintenance</TableCell>
                              <TableCell>{carData.maintenance}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell component="th" scope="row">Current Location</TableCell>
                              <TableCell>{carData.currentLocation}</TableCell>
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

const CreateCarModal = ({ open, handleClose, fetchCars }) => {
  const initialCarData = {
    name: "",
    color: "",
    model: "",
    chassisNumber: "",
    owner: "",
    purchaseDetails: "",
    maintenance: "",
    currentLocation: "",
  };

  const [activeStep, setActiveStep] = useState(0);
  const [carData, setCarData] = useState(initialCarData);

  const handleReset = () => {
    setActiveStep(0);
    setCarData(initialCarData);
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
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Make a POST request to the API endpoint to create a new car
      const response = await axios.post("/api/car", carData);
      if (response.data.message) {
        // Reset form and close modal if car creation is successful
        handleReset();
        handleClose();
        fetchCars()
      } else {
        console.error("Error creating car:", response.data.error);
      }
    } catch (error) {
      console.error("Error creating car:", error);
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
          {getStepContent(activeStep, carData, handleInputChange)}
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

export default CreateCarModal;
