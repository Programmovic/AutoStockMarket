"use client";
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
} from "@mui/material";

const AttendancePage = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [detailsData, setDetailsData] = useState([]);

  useEffect(() => {
    // Fetch summary and details data for attendance
    const fetchAttendanceData = async () => {
      try {
        // Replace these with the actual API endpoints to fetch summary and details data
        const summaryResponse = await fetch("API_ENDPOINT_TO_FETCH_ATTENDANCE_SUMMARY");
        const detailsResponse = await fetch("API_ENDPOINT_TO_FETCH_ATTENDANCE_DETAILS");
        
        if (summaryResponse.ok && detailsResponse.ok) {
          const summaryData = await summaryResponse.json();
          const detailsData = await detailsResponse.json();
          setSummaryData(summaryData);
          setDetailsData(detailsData);
        } else {
          console.error("Failed to fetch attendance data");
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, []);

  return (
    <PageContainer title="Attendance and Absence of Employees" description="Overview of employee attendance and absence">
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
              {summaryData.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>{record.salary}</TableCell>
                  <TableCell>{record.valuePerDay}</TableCell>
                  <TableCell>{record.numWorkingDays}</TableCell>
                  <TableCell>{record.numAbsentDays}</TableCell>
                  <TableCell>{record.absenceValue}</TableCell>
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
                <TableCell>Attendance Period</TableCell>
                <TableCell>Total Absences</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detailsData.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>{record.attendancePeriod}</TableCell>
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
