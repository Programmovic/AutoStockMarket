// EmployeeAttendance.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Typography,
  Box,
  TableHead,
  TableContainer,
} from "@mui/material";
import Loading from "../../loading";

const EmployeeAttendance = ({ employeeId }) => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employee attendance records
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `/api/employee/${employeeId}/attendance`
        );
        setAttendances(response.data.attendances);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee attendance:", error);
      }
    };

    fetchAttendance();
  }, [employeeId]);

  return (
    <Box marginTop={5}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box marginBottom={5}>
            <Typography variant="h6" gutterBottom>
              Employee Attendance
            </Typography>
          </Box>

          <TableContainer component={Paper}>
            <Table aria-label="employee attendance table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Attendance Status</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendances.map((attendance) => (
                  <TableRow key={attendance._id}>
                    <TableCell>{attendance.date}</TableCell>
                    <TableCell>{attendance.attendanceStatus}</TableCell>
                    <TableCell>{attendance.shift}</TableCell>
                    <TableCell>{attendance.location}</TableCell>
                    <TableCell>{attendance.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default EmployeeAttendance;
