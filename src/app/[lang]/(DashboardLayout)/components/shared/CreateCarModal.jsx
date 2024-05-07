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
  TableHead,
  TableRow,
  Paper,
  MenuItem, // Import MenuItem for select list
  InputAdornment
} from "@mui/material";
import axios from "axios";
import * as XLSX from "xlsx"; // Import xlsx library

const steps = ["Car Details", "Ownership", "Partnership", "Review"];

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

function getStepContent(step, carData, partners, handleInputChange, handlePartnerInputChange, removePartner) {
  console.log(carData)
  switch (step) {
    case 0: // Car Details
      return (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Car Name"
              name="name"
              value={carData?.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={carData?.color}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Model"
              name="model"
              value={carData?.model}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Chassis Number"
              name="chassisNumber"
              value={carData?.chassisNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              name="value"
              value={carData?.value}
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
              value={carData?.owner}
              onChange={handleInputChange}
              defaultValue={"ASM"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Purchase Details"
              name="purchaseDetails"
              value={carData?.purchaseDetails}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Entry Date"
              type="date"
              name="entryDate"
              value={carData?.entryDate}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Maintenance"
              name="maintenance"
              value={carData?.maintenance}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Location"
              name="currentLocation"
              value={carData?.currentLocation}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      );
    case 2: // Partnership
      return (
        <Grid container spacing={2}>
          {partners.map((partner, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="subtitle1">
                {index === 0 ? "First" : index === 1 ? "Second" : index === 2 ? "Third" : `${index + 1}th`} Partner
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Partner Name"
                    name={`partners.name`}
                    value={partner.name}
                    onChange={(e) => handlePartnerInputChange(e, index)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    label="Partner Type"
                    name={`partner.type`}
                    value={partner.type}
                    onChange={(e) => handlePartnerInputChange(e, index)}
                  >
                    {["Supplier", "Partner", "Other"].map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Partner Email"
                    name={`partner.email`}
                    value={partner.email}
                    onChange={(e) => handlePartnerInputChange(e, index)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Partner Phone"
                    name={`partner.phone`}
                    value={partner.phone}
                    onChange={(e) => handlePartnerInputChange(e, index)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Partnership Percentage"
                    name={`partner.percentage`}
                    value={partner.percentage}
                    onChange={(e) => handlePartnerInputChange(e, index)}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
              {index > 0 && ( // Render remove button for all partners except the first one
                <Button sx={{ marginY: 3 }} variant="outlined" color="error" onClick={() => removePartner(index)}>
                  Remove Partner
                </Button>
              )}
            </Grid>
          ))}

        </Grid>
      );

    case 3: // Finalize
      return (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="car details">
              <TableBody>
                {/* Render car data */}
                <TableRow>
                  <TableCell component="th" scope="row">
                    Car Name
                  </TableCell>
                  <TableCell>{carData?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Color
                  </TableCell>
                  <TableCell>{carData?.color}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Model
                  </TableCell>
                  <TableCell>{carData?.model}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Chassis Number
                  </TableCell>
                  <TableCell>{carData?.chassisNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Owner
                  </TableCell>
                  <TableCell>{carData?.owner}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Purchase Details
                  </TableCell>
                  <TableCell>{carData?.purchaseDetails}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Entry Date
                  </TableCell>
                  <TableCell>{carData?.entryDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Maintenance
                  </TableCell>
                  <TableCell>{carData?.maintenance}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Current Location
                  </TableCell>
                  <TableCell>{carData?.currentLocation}</TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Partner</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Percentage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {partners.map((partner, index) => (
                  <TableRow key={index}>
                    <TableCell>Partner {index + 1}</TableCell>
                    <TableCell>{partner.name}</TableCell>
                    <TableCell>{partner.type}</TableCell>
                    <TableCell>{partner.email}</TableCell>
                    <TableCell>{partner.phone}</TableCell>
                    <TableCell>{partner.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </>

      );

    default:
      return "Unknown step";
  }
}

const CreateCarModal = ({
  open,
  handleClose,
  fetchCars,
  initialCarData,
  isEditing,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  console.log(initialCarData)
  const [carData, setCarData] = useState(initialCarData);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const [partners, setPartners] = useState([{ name: "", type: "Partner", email: "", phone: "", percentage: 0 }]);

  // Function to add a new partner
  const addPartner = () => {
    setPartners([...partners, { name: "", type: "Partner", email: "", phone: "", percentage: 0 }]);
  };

  // Function to remove a partner
  const removePartner = (index) => {
    const updatedPartners = [...partners];
    updatedPartners.splice(index, 1);
    setPartners(updatedPartners);
  };

  // Function to handle input change for partners
  const handlePartnerInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPartners = [...partners];
    updatedPartners[index] = { ...updatedPartners[index], [name.split(".")[1]]: value };

    // Calculate the total percentage
    const totalPercentage = updatedPartners.reduce((total, partner) => total + parseInt(partner.percentage || 0), 0);

    // If the total percentage exceeds 100, prevent updating the state
    if (totalPercentage <= 100) {
      setPartners(updatedPartners);
      setErrorMessage(""); // Clear error message if total percentage is valid
    } else {
      // Optionally, you can display an error message or handle the exceeding case here
      setErrorMessage("Total percentage exceeds 100!");
      // You can choose to set an error state here if needed
    }
  };



  useEffect(() => {
    setCarData(initialCarData);
    setActiveStep(0);
  }, [open, initialCarData]);

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
  const sendCarToApi = async (data) => {
    // Make a POST request to create a new car
    const response = await axios.post("/api/car", data);
    if (response.data.message) {
      // Reset form and close modal if car creation is successful
      handleReset();
      handleClose();
      fetchCars();
    } else {
      console.error("Error creating car:", response.data.error);
    }
  };
  const handleSubmit = async () => {
    try {
      const mergedData = { ...carData, partners };
      console.log(mergedData);
      if (isEditing) {
        // Make a PUT request to update the car data
        const response = await axios.put(`/api/car/${carData?._id}`, mergedData);
        if (response.data.message) {
          // Reset form and close modal if car update is successful
          handleReset();
          handleClose();
          fetchCars();
        } else {
          console.error("Error updating car:", response.data.error);
        }
      } else {
        await sendCarToApi(mergedData)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [loading, setLoading] = useState(false);
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true); // Set loading state to true
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        // Process excelData as needed (e.g., send it to the server)
        console.log("Excel data:", excelData);

        // Iterate through each row (skipping the header row)
        for (let i = 1; i < excelData.length; i++) {
          const rowData = excelData[i];
          const excelCarData = {
            name: rowData[0],
            color: rowData[1],
            model: rowData[2],
            chassisNumber: rowData[3],
            owner: rowData[4],
            purchaseDetails: rowData[5],
            entryDate: new Date(rowData[6]), // Assuming the entryDate is in the correct format
            maintenance: rowData[7],
            currentLocation: rowData[8],
          };

          await sendCarToApi(excelCarData)
        }

        setLoading(false); // Set loading state to false after processing
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error reading Excel file:", error);
      setLoading(false); // Set loading state to false in case of error
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

          <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
            {getStepContent(activeStep, carData, partners, handleInputChange, handlePartnerInputChange, removePartner)}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <input
              accept=".xlsx,.xls"
              style={{ display: "none" }}
              id="contained-button-file"
              multiple={false}
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span">
                {loading ? "Loading" : "Upload Excel"}
              </Button>
            </label>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>



            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep === 2 && (
              <Button variant="outlined" onClick={addPartner}>Add Partner</Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : errorMessage ? errorMessage : "Next"}
            </Button>


          </Box>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateCarModal;
