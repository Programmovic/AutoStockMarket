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
  Paper,
  Autocomplete,
  MenuItem, // Import MenuItem for select list
  InputAdornment
} from "@mui/material";
import axios from "axios";
import Image from "next/image";

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

function getStepContent(step, customerData, handleInputChange, nationalities) {
  const getCountryCode = (nationality) => {
    // Assuming nationality data has a structure like { name: 'Country Name', code: 'Country Code' }
    const selectedCountry = nationalities.find((country) => country.name.common === nationality);
    return selectedCountry ? selectedCountry?.idd?.root : ''; // Return the country code or an empty string if not found
  };
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
              label="Email"
              name="email"
              value={customerData?.contactDetails?.email}
              onChange={handleInputChange}
            />
          </Grid>


          <Grid item xs={6}>
            <Autocomplete
              options={nationalities}
              getOptionLabel={(country) => country.name.common}
              fullWidth
              renderOption={(props, country) => (
                <MenuItem {...props}>
                  <img src={country.flags.png} alt={country.name.common} style={{ width: '20px', marginRight: '10px' }} /> {/* Flag image */}
                  {country.name.common}
                </MenuItem>
              )}
              renderInput={(params) => <TextField {...params} label="Nationality" variant="outlined" />}
              value={nationalities.find((country) => country.name.common === customerData?.contactDetails?.nationality) || null}
              onChange={(event, newValue) => {
                handleInputChange({ target: { name: 'nationality', value: newValue ? newValue.name.common : '' } });
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={customerData?.contactDetails?.phone}
              onChange={handleInputChange}
              disabled={!customerData?.contactDetails?.nationality}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="National ID"
              name="nationalID"
              value={customerData?.nationalID}
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
                  <TableCell component="th" scope="row">Email</TableCell>
                  <TableCell>{customerData?.contactDetails?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Phone</TableCell>
                  <TableCell>{customerData?.contactDetails?.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Nationality</TableCell>
                  <TableCell>{customerData?.contactDetails?.nationality}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">National ID</TableCell>
                  <TableCell>{customerData?.nationalID}</TableCell>
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
  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    setCustomerData(initialCustomerData);
    setActiveStep(0);
    fetchNationalities(); // Fetch nationalities when component mounts
  }, [open, initialCustomerData]);

  const fetchNationalities = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setNationalities(response.data);
    } catch (error) {
      console.error("Error fetching nationalities:", error);
    }
  };

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
    if (name === "email" || name === "phone" || name === "nationality") {
      setCustomerData({
        ...customerData,
        contactDetails: {
          ...customerData?.contactDetails,
          [name]: value
        }
      });
    } else {
      setCustomerData({ ...customerData, [name]: value });
    }
    console.log(customerData);
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
          {getStepContent(activeStep, customerData, handleInputChange, nationalities)}
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
