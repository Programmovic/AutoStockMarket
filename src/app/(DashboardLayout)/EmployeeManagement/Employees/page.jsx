"use client";
import React from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
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

const EmployeesPage = () => {
  const router = useRouter();

  // Sample data for employees
  const employees = [
    { id: 1, name: "John Doe", department: "Sales" },
    { id: 2, name: "Jane Smith", department: "HR" },
    { id: 3, name: "Michael Johnson", department: "Finance" },
    // Add more sample employees as needed
  ];

  // Function to handle row click and navigate to employee details page
  const handleRowClick = (employeeId) => {
    router.push(`/EmployeeManagement/Employees/${employeeId}`);
  };

  return (
    <PageContainer title="Employees" description="List of all employees">
      <DashboardCard title="Employees List">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="employees list table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                {/* Add more columns as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow hover={true} key={employee.id} onClick={() => handleRowClick(employee.id)} style={{ cursor: "pointer" }}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  {/* Add more cells for additional columns */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default EmployeesPage;
