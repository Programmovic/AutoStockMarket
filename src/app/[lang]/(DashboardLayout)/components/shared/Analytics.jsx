import React, { useEffect, useState } from 'react';
import { Grid, Box, TextField, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import axios from 'axios';
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import TopEmployees from '../dashboard/ProductPerformance';
import AnalyticsDashboard from '@/app/(DashboardLayout)/components/dashboard/AnalyticsDashboard';
import { IconCurrencyDollar, IconCar, IconMan } from "@tabler/icons-react";
import moment from 'moment';

const Analytics = ({ params, today = false }) => {
  const [analytics, setAnalytics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(today ? moment(new Date()).format('YYYY-MM-DD') : null);
  const [endDate, setEndDate] = useState(null);
  const [filter, setFilter] = useState('all'); // State for selected filter
  const [filteredData, setFilteredData] = useState({}); // State for filtered data

  const fetchData = async () => {
    try {
      const url = `/api/analytics`;
      const queryParams = {};

      if (startDate) {
        queryParams.startDate = moment(startDate).format('YYYY-MM-DD');
      }
      if (endDate) {
        queryParams.endDate = moment(endDate).format('YYYY-MM-DD');
      }

      // Adding filter query parameters
      if (filter !== 'all') {
        queryParams.category = filter;
      }

      const response = await axios.get(url, { params: queryParams });
      console.log(response.data);
      setAnalytics(response.data);
      setFilteredData(response.data); // Initialize filtered data
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, filter]);

  return (
    <Box>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={() => console.log('Add New Car')}>
            Add New Car
          </Button>
          <Button variant="contained" color="secondary" onClick={() => console.log('Create Row Data View')}>
            Create Row Data View
          </Button>
        </Grid>
        {!today && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="From Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="To Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Filter</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Filter"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
              <MenuItem value="sales">Sales</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={8}>
          <AnalyticsDashboard
            title={"Total Cars"}
            data={filteredData?.totalCars}
            chartData={filteredData?.carValueChartData}
            chartType="line"
            icon={<IconCar width={24} />}
            iconLink={"/en/CarsInventory/Cars"}
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard
            title={"Total Sold Cars"}
            data={filteredData?.totalSoldCars}
            chartData={{ labels: ['Total Cars', "Total Sold Cars"], series: [filteredData?.totalCars, filteredData?.totalSoldCars] }}
            chartType="pie"
            icon={<IconCar width={24} />}
            iconLink={"/en/CarsInventory/SoldCars"}
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <AnalyticsDashboard
            title={"Total Transactions"}
            data={filteredData?.totalTransactions}
            chartData={filteredData?.transactionAmountsChartData}
            chartType="line"
            icon={<IconCurrencyDollar width={24} />}
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard
            title={"Total Received"}
            data={filteredData?.totalReceived}
            chartData={{ labels: ['Total Recieved', "Total Expenses"], series: [filteredData?.totalReceived, filteredData?.totalExpenses] }}
            chartType="pie"
            icon={<IconCurrencyDollar width={24} />}
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard
            title={"Total Expenses"}
            data={filteredData?.totalExpenses}
            chartData={{ labels: ['Total Recieved', "Total Expenses"], series: [filteredData?.totalReceived, filteredData?.totalExpenses] }}
            chartType="pie"
            icon={<IconCurrencyDollar width={24} />}
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard
            title={"Total Customers"}
            data={filteredData?.totalCustomers}
            chartData={filteredData?.customerCountsChartData}
            chartType="line"
            icon={<IconMan width={24} />}
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <AnalyticsDashboard
            title={"Total Maintenance Costs"}
            data={filteredData?.totalMaintenanceCosts}
            chartData={filteredData?.maintenanceAmountsChartData}
            chartType="line"
            icon={<IconCurrencyDollar width={24} />}
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard
            title={"Total Customers Debts"}
            data={filteredData?.totalCustomerDebt}
            chartData={filteredData?.customerDebtAmountsChartData}
            chartType="column"
            icon={<IconCurrencyDollar width={24} />}
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard
            title={"Total Cars Prices"}
            data={filteredData?.totalSellingPrices}
            chartData={{ labels: ['Car Values', "Sold Cars Prices"], series: [filteredData?.carValuesAmount, filteredData?.totalSellingPrices] }}
            chartType="pie"
            icon={<IconCurrencyDollar width={24} />}
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard
            title={"Total Selling Prices"}
            data={filteredData?.carDetails?.sellingPrice}
            chartData={filteredData?.sellingPriceBreakdownChartData}
            chartType="pie"
            icon={<IconCurrencyDollar width={24} />}
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard
            title={"Total Profit"}
            data={filteredData?.earnings}
            chartData={filteredData?.profitAmountsChartData}
            chartType="column"
            icon={<IconCurrencyDollar width={24} />}
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard
            title={"Total Partners"}
            data={filteredData?.totalPartners}
            chartData={filteredData?.partnerCountsChartData}
            chartType="line"
            icon={<IconCurrencyDollar width={24} />}
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard
            title={"Total Partners Percentages"}
            data={`${filteredData?.totalPartnerPercentage}%`}
            chartData={filteredData?.partnerPercentageBreakdownChartData}
            chartType="pie"
            icon={<IconCurrencyDollar width={24} />}
            loading={isLoading}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={12}>
          <YearlyBreakup />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {!today && (
          <>
            <Grid item xs={12}>
              <SalesOverview monthlyTransactions={filteredData?.monthlyTransactions || []} />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <RecentTransactions transactions={filteredData?.recentTransactions} />
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <TopEmployees />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Analytics;
