"use client";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Typography,
  Button,
  TableContainer,
} from "@mui/material";
import { usePDF, Resolution } from "react-to-pdf";
import { Margin } from "@mui/icons-material";

const EmployeeDetailsPage = ({ params }) => {
  const [employee, setEmployee] = useState(null);
  const { id } = params; // Get the employee ID from the query parameters
  const { toPDF, targetRef } = usePDF({
    filename: `Employee_Details_${id}.pdf`,
    resolution: Resolution.HIGH,
  });

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      if (id) {
        // Simulated data until API integration
        const sampleEmployee = {
          id: 1,
          name: "John Doe",
          position: "Manager",
          hireDate: "2022-01-15",
          salary: 50000,
          bonuses: 2000,
          deductions: 1000,
          benefits: "Health Insurance",
        };

        if (sampleEmployee.id === parseInt(id)) {
          setEmployee(sampleEmployee);
        } else {
          console.error("Employee not found");
        }
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  return (
    <PageContainer
      title="Employee Details"
      description={`Details of Employee ${id}`}
    >
      <DashboardCard>
        <Button
          variant="contained"
          onClick={() => toPDF()}
          sx={{ marginBottom: 4 }}
        >
          Download {employee?.name} Details PDF
        </Button>
        <div ref={targetRef}>
          {employee ? (
            <TableContainer component={Paper}>
              <Table aria-label="employee details table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>ID:</strong>
                    </TableCell>
                    <TableCell>{employee.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Name:</strong>
                    </TableCell>
                    <TableCell>{employee.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Position:</strong>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Hire Date:</strong>
                    </TableCell>
                    <TableCell>{employee.hireDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Salary:</strong>
                    </TableCell>
                    <TableCell>${employee.salary}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Bonuses:</strong>
                    </TableCell>
                    <TableCell>${employee.bonuses}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Deductions:</strong>
                    </TableCell>
                    <TableCell>${employee.deductions}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Benefits:</strong>
                    </TableCell>
                    <TableCell>{employee.benefits}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1" align="center">
              Employee details not found
            </Typography>
          )}
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default EmployeeDetailsPage;
