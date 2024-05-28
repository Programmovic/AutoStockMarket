import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar, Fab, Link, IconButton, Box } from "@mui/material";
import { IconArrowDownRight, IconCurrencyDollar, IconEye } from "@tabler/icons-react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Loading from "@/app/loading";
import { useState } from "react";
const AnalyticsDashboard = ({ data, chartData, title, icon, iconLink, loading = true }) => {
  // chart color
  const theme = useTheme();
  const secondarylight = "#f5fcff";

  const generateRandomColor = () => {
    const colors = ["red", "orange", "green", "blue", "purple", "pink"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const optionsColumnChart = {
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: "solid",
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };

  const seriesColumnChart = [
    {
      name: "",
      color: generateRandomColor(), // Random color for the chart series
      data: chartData,
    },
  ];
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
  return (
    !loading ? (
      <DashboardCard
        title={title}
        action={
          <Link href={iconLink} underline="none">
            <Fab
              color="secondary"
              size="medium"
              sx={{
                color: "#ffffff",
              }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              {isHovered ? <IconEye /> : icon}
            </Fab>
          </Link>
        }
        footer={
          <Chart
            options={optionsColumnChart}
            series={seriesColumnChart}
            type="area"
            height="60px"
          />
        }
      >
        <Typography variant="h3" fontWeight="700" mt="-20px">
          {data}
        </Typography>
      </DashboardCard>
    ) : (
      <DashboardCard>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center">
          <Loading width={250} height={125} />
        </Box>
      </DashboardCard>
    )
  );

};

export default AnalyticsDashboard;
