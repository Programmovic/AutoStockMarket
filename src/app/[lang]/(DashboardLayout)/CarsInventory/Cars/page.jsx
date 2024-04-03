"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/router
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

const CarsPage = (params) => {
  const router = useRouter(); // Initialize useRouter
  const [cars, setCars] = useState([
    // Sample data
    {
      id: 1,
      carName: "Toyota Camry",
      color: "Blue",
      model: "2022",
      chassisNumber: "ABC123456",
      owner: "John Doe",
      by: "Company XYZ",
      source: "Dealer",
      purchaseDate: "2023-01-15",
      capital: 25000,
      maintenance: 500,
      total: 25500,
      day: 15,
      month: "January",
      todaysDate: "2024-03-29",
      vehicleLocation: "Garage",
    },
    // Add more sample data as needed
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    // This useEffect fetches data, but for the sample purpose, we don't need it now.
    // You can replace it with actual data fetching logic if needed.
  }, []);

  const handleRowClick = (id) => {
    router.push(`/CarsInventory/Cars/${id}`); // Use Router.push to navigate
  };
console.log(params)
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
                {/* Table headers adjusted for your columns */}
                <TableCell>ID</TableCell>
                <TableCell>Car Name</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Chassis Number</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>By</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Purchase Date</TableCell>
                <TableCell>Capital</TableCell>
                <TableCell>Maintenance</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Today&apos;s Date</TableCell>
                <TableCell>Vehicle Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <TableRow
                  key={car.id}
                  onClick={() => handleRowClick(car.id)} // Handle row click
                  style={{ cursor: "pointer" }} // Add pointer cursor for better UX
                  hover={true}
                >
                  {/* Table cells adjusted for your data structure */}
                  <TableCell>{car.id}</TableCell>
                  <TableCell>{car.carName}</TableCell>
                  <TableCell>{car.color}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.chassisNumber}</TableCell>
                  <TableCell>{car.owner}</TableCell>
                  <TableCell>{car.by}</TableCell>
                  <TableCell>{car.source}</TableCell>
                  <TableCell>{car.purchaseDate}</TableCell>
                  <TableCell>{car.capital}</TableCell>
                  <TableCell>{car.maintenance}</TableCell>
                  <TableCell>{car.total}</TableCell>
                  <TableCell>{car.day}</TableCell>
                  <TableCell>{car.month}</TableCell>
                  <TableCell>{car.todaysDate}</TableCell>
                  <TableCell>{car.vehicleLocation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
      <CreateCarModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </PageContainer>
  );
};

export default CarsPage;
