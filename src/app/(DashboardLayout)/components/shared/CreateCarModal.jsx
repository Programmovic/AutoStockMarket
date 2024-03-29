import React, { useState } from 'react';
import { Button, Modal, Box, Typography, Stepper, Step, StepLabel, TextField, Grid } from '@mui/material';

const steps = ['Car Details', 'Ownership', 'Maintenance', 'Finalize'];

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '16px', // Rounded corners
};

// Function to render content for each step based on the step index
function getStepContent(step, carData, handleInputChange) {
    switch (step) {
        case 0: // Car Details
            return (
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Car Name" name="carName" value={carData.carName} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Color" name="color" value={carData.color} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Model" name="model" value={carData.model} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Chassis Number" name="chassisNumber" value={carData.chassisNumber} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Purchase Date" name="purchaseDate" type="date" InputLabelProps={{ shrink: true }} value={carData.purchaseDate} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Vehicle Location" name="vehicleLocation" value={carData.vehicleLocation} onChange={handleInputChange} />
                    </Grid>
                </Grid>
            );
        case 1: // Ownership
            return (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Owner" name="owner" value={carData.owner} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="By" name="by" value={carData.by} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Source" name="source" value={carData.source} onChange={handleInputChange} />
                    </Grid>
                </Grid>
            );
        case 2: // Maintenance
            return (
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField fullWidth label="Capital" name="capital" type="number" value={carData.capital} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth label="Maintenance" name="maintenance" type="number" value={carData.maintenance} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth label="Total" name="total" type="number" value={carData.total} onChange={handleInputChange} />
                    </Grid>
                </Grid>
            );
        // Finalize step or additional information can be placed here
        default:
            return 'Unknown step';
    }
}

const CreateCarModal = ({ open, handleClose }) => {
    const initialCarData = {
        carName: '',
        color: '',
        model: '',
        chassisNumber: '',
        owner: '',
        by: '',
        source: '',
        purchaseDate: '',
        capital: '',
        maintenance: '',
        total: '',
        vehicleLocation: '',
        // Initialize other fields as needed
    };

    const [activeStep, setActiveStep] = useState(0);
    const [carData, setCarData] = useState(initialCarData);

    const handleReset = () => {
        setActiveStep(0);
        setCarData(initialCarData); // Reset car data to initial state
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            // Handle form submission or any final step here
            handleReset(); // Reset after submission or final step
            handleClose(); // Close the modal if needed
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
                {activeStep === steps.length ? (
                    <div style={{paddingTop: 20, paddingBottom: 20,}}>
                        <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleClose}>Close</Button>
                        </Box>
                    </div>
                ) : (
                    <div style={{paddingTop: 20, paddingBottom: 20,}}>
                        {getStepContent(activeStep, carData, handleInputChange)}
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </div>
                )}
            </Box>
        </Modal>
    );
};

export default CreateCarModal;
