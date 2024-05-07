import { Grid, Box } from '../../../../../lib/mui';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import TopEmployees from '../dashboard/ProductPerformance';
import AnalyticsDashboard from '@/app/(DashboardLayout)/components/dashboard/AnalyticsDashboard';
import { IconCurrencyDollar, IconCar, IconMan } from "@tabler/icons-react";

const Analytics = ({ params, today = false }) => {
  const [analytics, setAnalytics] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/analytics?today=${today}`);

      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <AnalyticsDashboard title={"Total Cars"} data={analytics?.totalCars} icon={<IconCar width={24} />} iconLink={"/en/CarsInventory/Cars"}/>
        </Grid>
        <Grid item xs={4}>
          <AnalyticsDashboard title={"Total Sold Cars"} data={analytics?.totalSoldCars} icon={<IconCar width={24} />} iconLink={"/en/CarsInventory/SoldCars"}/>
        </Grid>
        {/* Analytics for total transactions */}
        <Grid item xs={4}>
          <AnalyticsDashboard title={"Total Transactions"} data={analytics?.totalTransactions} icon={<IconCurrencyDollar width={24} />} />
        </Grid>
        <Grid item xs={4}>
          <AnalyticsDashboard title={"Total Received"} data={analytics?.totalReceived} icon={<IconCurrencyDollar width={24} />} />
        </Grid>
        <Grid item xs={4}>
          <AnalyticsDashboard title={"Total Expenses"} data={analytics?.totalExpenses} icon={<IconCurrencyDollar width={24} />} />
        </Grid>
        {/* Analytics for total customers */}
        <Grid item xs={4}>
          <AnalyticsDashboard title={"Total Customers"} data={analytics?.totalCustomers} icon={<IconMan width={24} />} />
        </Grid>
        {/* Analytics for total maintenance costs */}
        <Grid item xs={4}>
          <AnalyticsDashboard title={"Total Maintenance Costs"} data={analytics?.totalMaintenanceCosts} icon={<IconCurrencyDollar width={24} />} />
        </Grid>
        <Grid item xs={4}>
          <AnalyticsDashboard title={"Total Customers Debts"} data={analytics?.totalCustomerDebt} icon={<IconCurrencyDollar width={24} />} />
        </Grid>
        <Grid item xs={4}>
          <AnalyticsDashboard title={"Total Cars Prices"} data={analytics?.carDetails?.totalValue} icon={<IconCurrencyDollar width={24} />} />
        </Grid>
        <Grid item xs={4}>
          <AnalyticsDashboard title={"Total Selling Prices"} data={analytics?.carDetails?.totalSellingPrice} icon={<IconCurrencyDollar width={24} />} />
        </Grid>
        <Grid item xs={4}>
          <AnalyticsDashboard title={"Total Profit"} data={analytics?.carDetails?.totalProfit} icon={<IconCurrencyDollar width={24} />} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {!today && (
          <>
            <Grid item xs={12}>
              <SalesOverview />
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
