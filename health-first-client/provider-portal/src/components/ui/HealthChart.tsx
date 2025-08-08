import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

interface HealthChartProps {
  title: string;
  type: "line" | "bar" | "pie";
  data: any;
  height?: number;
  width?: number;
}

const HealthChart: React.FC<HealthChartProps> = ({
  title,
  type,
  data,
  height = 300,
  width = 400,
}) => {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart
            width={width}
            height={height}
            series={data.series}
            xAxis={data.xAxis}
            yAxis={data.yAxis}
          />
        );
      case "bar":
        return (
          <BarChart
            width={width}
            height={height}
            series={data.series}
            xAxis={data.xAxis}
            yAxis={data.yAxis}
          />
        );
      case "pie":
        return <PieChart width={width} height={height} series={data.series} />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {renderChart()}
        </Box>
      </CardContent>
    </Card>
  );
};

export default HealthChart;
