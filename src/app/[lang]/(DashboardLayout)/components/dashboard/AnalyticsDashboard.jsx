import Chart from "react-apexcharts";
import { useTheme, useMediaQuery } from "@mui/material/styles";
import { Stack, Typography, Avatar, Fab, Link, IconButton } from "@mui/material";
import { IconArrowDownRight, IconCurrencyDollar, IconEye } from "@tabler/icons-react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useState } from "react";

const AnalyticsDashboard = ({ data, title, icon, iconLink }) => {
  // chart color
  const theme = useTheme();
  const secondarylight = "#f5fcff";
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const generateRandomColor = () => {
    const colors = ["red", "orange", "green", "blue", "purple", "pink"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const optionscolumnchart = {
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

  const seriescolumnchart = [
    {
      name: "",
      color: generateRandomColor(), // Random color for the chart series
      data: [25, 66, 20, 40, 12, 58, 20],
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
    <DashboardCard
      title={title}
      action={
        <Link href={iconLink} underline="none">
          <Fab
            color="secondary"
            size={isSmUp ? "medium" : "small"}
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
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="area"
          height="60px"
        />
      }
    >
      <Typography variant={isSmUp ? "h3" : "h4"} fontWeight="700" mt="-20px">
        {data}
      </Typography>
    </DashboardCard>
  );
};

export default AnalyticsDashboard;
