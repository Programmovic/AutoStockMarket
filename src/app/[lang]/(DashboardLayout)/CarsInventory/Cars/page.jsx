"use client";
// Import necessary libraries and components
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import CreateCarModal from "@/app/(DashboardLayout)/components/shared/CreateCarModal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

// Define the CarsPage component
const CarsPage = () => {
  const router = useRouter();
  const [cars, setCars] = useState([]); // State to hold the car data
  const [modalOpen, setModalOpen] = useState(false); // State for the modal

  // useEffect hook to fetch cars data when the component mounts
  useEffect(() => {
    fetchCars(); // Fetch cars data
  }, []);

  // Function to fetch cars data from the backend API
  const fetchCars = async () => {
    try {
      // Make a GET request to fetch cars data
      const response = await axios.get("/api/car");
      setCars(response.data); // Update state with fetched cars data
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  // Function to handle row click (navigate to car details page)
  const handleRowClick = (id) => {
    router.push(`/en/CarsInventory/Cars/${id}`);
  };

  return (
    <PageContainer title="Cars" description="Cars Inventory">
      <Button
        style={{ marginBottom: 20 }}
        variant="contained"
        onClick={() => setModalOpen(true)}
      >
        Add New Car
      </Button>
      <DashboardCard title="Cars">
        <TableContainer
          component={Paper}
          sx={{ maxWidth: "100%", overflowX: "auto" }}
        >
          <Table aria-label="cars table">
            <TableHead>
              <TableRow>
                
                <TableCell>Name</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Chassis Number</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Purchase Details</TableCell>
                <TableCell>Maintenance</TableCell>
                <TableCell>Current Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <TableRow
                  key={car._id} // Use _id as the key for each row
                  onClick={() => handleRowClick(car._id)}
                  style={{ cursor: "pointer" }}
                  hover={true}
                >
                  
                  <TableCell>{car.name}</TableCell>
                  <TableCell>{car.color}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.chassisNumber}</TableCell>
                  <TableCell>{car.owner}</TableCell>
                  <TableCell>{car.purchaseDetails}</TableCell>
                  <TableCell>{car.maintenance}</TableCell>
                  <TableCell>{car.currentLocation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
      <CreateCarModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        fetchCars={fetchCars}
      />
    </PageContainer>
  );
};

// Export the CarsPage component
export default CarsPage;
