import { Grid, Box, TextField } from '../../../../../lib/mui';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import TopEmployees from '../dashboard/ProductPerformance';
import AnalyticsDashboard from '@/app/(DashboardLayout)/components/dashboard/AnalyticsDashboard';
import { IconCurrencyDollar, IconCar, IconMan } from "@tabler/icons-react";
import moment from 'moment';

const Analytics = ({ params, today = false }) => {
  const [analytics, setAnalytics] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(today ? moment(new Date()).format('YYYY-MM-DD') : null);
  const [endDate, setEndDate] = useState(null);

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
      const response = await axios.get(url, { params: queryParams });
      console.log(response.data);
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <Box>
      {!today && (
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
        </Grid>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard title={"Total Cars"} data={analytics?.totalCars} chartData={analytics?.carValues} icon={<IconCar width={24} />} iconLink={"/en/CarsInventory/Cars"} loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard title={"Total Sold Cars"} data={analytics?.totalSoldCars} chartData={analytics?.totalSellingPrices} icon={<IconCar width={24} />} iconLink={"/en/CarsInventory/SoldCars"} loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard title={"Total Transactions"} data={analytics?.totalTransactions} chartData={analytics?.transactionAmounts} icon={<IconCurrencyDollar width={24} />} loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard title={"Total Received"} data={analytics?.totalReceived} icon={<IconCurrencyDollar width={24} />} loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard title={"Total Expenses"} data={analytics?.totalExpenses} icon={<IconCurrencyDollar width={24} />} loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard title={"Total Customers"} data={analytics?.totalCustomers} icon={<IconMan width={24} />} loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard title={"Total Maintenance Costs"} data={analytics?.totalMaintenanceCosts} icon={<IconCurrencyDollar width={24} />} loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard title={"Total Customers Debts"} data={analytics?.totalCustomerDebt} icon={<IconCurrencyDollar width={24} />} loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard title={"Total Cars Prices"} data={analytics?.carDetails?.value} icon={<IconCurrencyDollar width={24} />} loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard title={"Total Selling Prices"} data={analytics?.carDetails?.sellingPrice} icon={<IconCurrencyDollar width={24} />} loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard title={"Total Profit"} data={analytics?.earnings} icon={<IconCurrencyDollar width={24} />} loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard title={"Total Partners"} data={analytics?.totalPartners} icon={<IconCurrencyDollar width={24} />} loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsDashboard title={"Total Partners Percentages"} data={`${analytics?.totalPartnerPercentage}%`} icon={<IconCurrencyDollar width={24} />} loading={isLoading} />
        </Grid>
      </Grid>
      <Grid container>
        {!today && (
          <>
            <Grid item xs={12}>
              <SalesOverview monthlyTransactions={analytics?.monthlyTransactions} />
            </Grid>
          </>
        )}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <RecentTransactions transactions={analytics?.recentTransactions} />
        </Grid>
        <Grid item xs={12} lg={8}>
          <TopEmployees />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Analytics;
