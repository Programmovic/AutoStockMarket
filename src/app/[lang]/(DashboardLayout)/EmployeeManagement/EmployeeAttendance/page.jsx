'use client'
import React from "react";
import { useEffect, useState } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Loading from "@/app/loading";


const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceAnalyticsData, setAttendanceAnalyticsData] = useState([]);
  const [attendanceSummaryData, setAttendanceSummaryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const fetchAttendanceData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/attendance");
      if (response.status === 200) {
        setAttendanceData(response.data.attendanceRecords);
        setAttendanceAnalyticsData(response.data.analytics);
        setAttendanceSummaryData(response.data.attendanceSummary);
      } else {
        console.error("Failed to fetch attendance data");
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAttendance = async (record) => {
    setIsSubmitting(true);
    try {
      const response = await axios.put("/api/attendance", record);
      if (response.status === 200) {
        fetchAttendanceData();
        console.log("Attendance submitted:", response.data);
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  // Function to handle updating attendance data
  const handleUpdateAttendance = (index, key, value) => {
    const updatedAttendanceData = [...attendanceData];
    updatedAttendanceData[index][key] = value;
    setAttendanceData(updatedAttendanceData);
  };

  // Function to handle assigning current time to timeIn/timeOut
  const handleAssignCurrentTime = (index, key) => {
    const updatedAttendanceData = [...attendanceData];
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    updatedAttendanceData[index][key] = currentTime;
    setAttendanceData(updatedAttendanceData);
  };


  return (
    <PageContainer title="Attendance and Absence of Employees" description="Overview of employee attendance and absence">
      <DashboardCard title="Attendance Today">
        <TableContainer component={Paper}>
          {isLoading ? (
            <Loading />
          ) : (

            <Table sx={{ minWidth: 650 }} aria-label="attendance table">
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Attendance Status</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Time In</TableCell>
                  <TableCell>Time Out</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceData?.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.employee.name}</TableCell>
                    <TableCell>
                      <Select
                        value={record.attendanceStatus}
                        onChange={(e) => handleUpdateAttendance(index, 'attendanceStatus', e.target.value)}
                      >
                        <MenuItem value="Present">Present</MenuItem>
                        <MenuItem value="Absent">Absent</MenuItem>
                        <MenuItem value="Late">Late</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={record.shift}
                        onChange={(e) => handleUpdateAttendance(index, 'shift', e.target.value)}
                      >
                        <MenuItem value="Morning">Morning</MenuItem>
                        <MenuItem value="Afternoon">Afternoon</MenuItem>
                        <MenuItem value="Night">Night</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        variant="outlined"
                        endIcon={<AccessTimeIcon />}
                        onClick={() => handleAssignCurrentTime(index, 'timeIn')}
                      >
                        {record.timeIn || "Set"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        variant="outlined"
                        endIcon={<AccessTimeIcon />}
                        onClick={() => handleAssignCurrentTime(index, 'timeOut')}
                      >
                        {record.timeOut || "Set"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => handleSubmitAttendance(record)}
                      >
                        Assign
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>)}
        </TableContainer>
      </DashboardCard>
      <DashboardCard title="Attendance Summary">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="attendance summary table">
            <TableHead>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Value per Day</TableCell>
                <TableCell>Number of Working Days</TableCell>
                <TableCell>Number of Absent Days</TableCell>
                <TableCell>Value of Absences</TableCell>
                <TableCell>Violations</TableCell>
                <TableCell>Advances</TableCell>
                <TableCell>Net Salary</TableCell>
                <TableCell>Commission</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceAnalyticsData?.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>{record.salary}</TableCell>
                  <TableCell>{record.valuePerDay}</TableCell>
                  <TableCell>{record.workingDays}</TableCell>
                  <TableCell>{record.absentDays}</TableCell>
                  <TableCell>{record.valueOfAbsences}</TableCell>
                  <TableCell>{record.violations}</TableCell>
                  <TableCell>{record.advances}</TableCell>
                  <TableCell>{record.netSalary}</TableCell>
                  <TableCell>{record.commission}</TableCell>
                  <TableCell>{record.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
      
      <DashboardCard title="Attendance Details">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="attendance details table">
            <TableHead>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell>Absence Period</TableCell>
                <TableCell>Total Absences</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceSummaryData?.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>{record.absencePeriod}</TableCell>
                  <TableCell>{record.totalAbsences}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default AttendancePage;
