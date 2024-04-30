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
  MenuItem, // Import MenuItem for select list
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";

const steps = ["Employee Details", "Review"];

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

function getStepContent(step, employeeData, handleInputChange, admins) {
  console.log(admins)
  switch (step) {
    case 0: // Employee Details
      return (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Employee Name"
              name="name"
              value={employeeData?.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Position"
              name="position"
              value={employeeData?.position}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Salary"
              name="salary"
              type="number"
              value={employeeData?.salary}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Hire Date"
              name="hireDate"
              type="date"
              value={employeeData?.hireDate}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Benefits"
              name="benefits"
              value={employeeData?.benefits}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={employeeData?.contactInfo?.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={employeeData?.contactInfo?.phone}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={employeeData?.contactInfo?.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            {/* Select list for Admin */}
            <FormControl fullWidth>
              <InputLabel htmlFor="admin-select">Admin</InputLabel>
              <Select
                fullWidth
                labelId="admin-select"
                id="admin-select"
                name="admin"
                value={employeeData?.admin}
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {/* Map through admins and populate options */}
                {admins?.map((admin) => (
                  <MenuItem key={admin._id} value={admin._id}>
                    {admin.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      );
    case 1: // Review
      return (
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="employee details">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">Employee Name</TableCell>
                  <TableCell>{employeeData?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Position</TableCell>
                  <TableCell>{employeeData?.position}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Salary</TableCell>
                  <TableCell>{employeeData?.salary}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Salary</TableCell>
                  <TableCell>{employeeData?.hireDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Benefits</TableCell>
                  <TableCell>{employeeData?.benefits}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Email</TableCell>
                  <TableCell>{employeeData?.contactInfo?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Phone</TableCell>
                  <TableCell>{employeeData?.contactInfo?.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Address</TableCell>
                  <TableCell>{employeeData?.contactInfo?.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Admin</TableCell>
                  <TableCell>{employeeData?.admin}</TableCell>
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

const CreateEmployeeModal = ({ open, handleClose, fetchEmployees, initialEmployeeData, isEditing }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const [admins, setAdmins] = useState([]); // State to store fetched admins

  useEffect(() => {
    setEmployeeData(initialEmployeeData);
    setActiveStep(0);
    fetchAdmins(); // Fetch admins when component mounts
  }, [open, initialEmployeeData]);

  // Function to fetch admins
  const fetchAdmins = async () => {
    try {
      const response = await axios.get("/api/admin");
      setAdmins(response.data.admins);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setEmployeeData(initialEmployeeData);
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
    if (name === 'email' || name === 'phone' || name === 'address') {
      // If the input field belongs to contactInfo, update nested state
      setEmployeeData({
        ...employeeData,
        contactInfo: {
          ...employeeData?.contactInfo,
          [name]: value,
        },
      });
    } else {
      // Otherwise, update top-level state
      setEmployeeData({ ...employeeData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        // Make a PUT request to update the employee data
        const response = await axios.put(`/api/employees/${employeeData?._id}`, employeeData);
        if (response.data.message) {
          // Reset form and close modal if employee update is successful
          handleReset();
          handleClose();
          fetchEmployees();
        } else {
          console.error("Error updating employee:", response.data.error);
        }
      } else {
        // Make a POST request to create a new employee
        const response = await axios.post("/api/employee", employeeData);
        if (response.data.message) {
          // Reset form and close modal if employee creation is successful
          handleReset();
          handleClose();
          fetchEmployees();
        } else {
          console.error("Error creating employee:", response.data.error);
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
          {getStepContent(activeStep, employeeData, handleInputChange, admins)}
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

export default CreateEmployeeModal;
