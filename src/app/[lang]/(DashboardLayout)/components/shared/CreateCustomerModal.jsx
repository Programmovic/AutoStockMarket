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
  MenuItem,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import * as XLSX from "xlsx";

const steps = ["Customer Details", "Review"];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "1500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
};

function getStepContent(step, customerData, handleInputChange, nationalities) {
  switch (step) {
    case 0:
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
                  <img
                    src={country.flags.png}
                    alt={country.name.common}
                    style={{ width: "20px", marginRight: "10px" }}
                  />
                  {country.name.common}
                </MenuItem>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Nationality" variant="outlined" />
              )}
              value={
                nationalities.find(
                  (country) =>
                    country.name.common ===
                    customerData?.contactDetails?.nationality
                ) || null
              }
              onChange={(event, newValue) => {
                handleInputChange({
                  target: {
                    name: "nationality",
                    value: newValue ? newValue.name.common : "",
                  },
                });
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
    case 1:
      return (
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="customer details">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Customer Name
                  </TableCell>
                  <TableCell>{customerData?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Email
                  </TableCell>
                  <TableCell>{customerData?.contactDetails?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Phone
                  </TableCell>
                  <TableCell>{customerData?.contactDetails?.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Nationality
                  </TableCell>
                  <TableCell>
                    {customerData?.contactDetails?.nationality}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    National ID
                  </TableCell>
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

const CreateCustomerModal = ({
  open,
  handleClose,
  fetchCustomers,
  initialCustomerData,
  isEditing,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [customerData, setCustomerData] = useState(initialCustomerData);
  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    setCustomerData(initialCustomerData);
    setActiveStep(0);
    fetchNationalities();
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
      handleSubmit();
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
          [name]: value,
        },
      });
    } else {
      setCustomerData({ ...customerData, [name]: value });
    }
    console.log(customerData);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      // Assuming the first row is the header
      const firstCustomer = jsonData[0];
      setCustomerData({
        name: firstCustomer["Customer Name"],
        contactDetails: {
          email: firstCustomer.Email,
          phone: firstCustomer.Phone,
          nationality: firstCustomer.Nationality,
        },
        nationalID: firstCustomer["National ID"],
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const handleTemplateDownload = () => {
    const template = [
      ["Customer Name", "Email", "Phone", "Nationality", "National ID"],
      ["", "", "", "", ""],
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(template);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    XLSX.writeFile(workbook, "customer_template.xlsx");
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        const response = await axios.put(
          `/api/customers/${customerData?._id}`,
          customerData
        );
        if (response.data.message) {
          handleReset();
          handleClose();
          fetchCustomers();
        } else {
          console.error("Error updating customer:", response.data.error);
        }
      } else {
        const response = await axios.post("/api/customers", customerData);
        if (response.data.message) {
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
            <Box>
              <Button variant="contained" component="label">
                Upload Excel
                <input
                  type="file"
                  hidden
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                />
              </Button>
              <Button
                variant="outlined"
                sx={{ ml: 1 }}
                onClick={handleTemplateDownload}
              >
                Download Template
              </Button>
            </Box>
            <Button sx={{ ml: 1 }} color="inherit" disabled={activeStep === 0} onClick={handleBack}>
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
