import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Line } from "recharts";
import { Spinner, Box, Text } from "@chakra-ui/react";
import * as d3 from "d3"; // For mathematical calculations

// Custom tooltip that displays only numbers
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#fff", border: "1px solid #ccc", padding: "5px" }}>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: 0 }}>
            {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const WindSpeedChart = () => {
  const [windData, setWindData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const CITY = "Delhi"; // Change as needed

  useEffect(() => {
    const fetchWindData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=imperial`
        );
        const data = await response.json();

        const windSpeeds = data.list.map((entry) => entry.wind.speed);

        // Compute histogram bins (2 mph bins)
        const binGenerator = d3.bin().thresholds(d3.range(0, 30, 2));
        const bins = binGenerator(windSpeeds);

        const histogramData = bins.map((bin) => ({
          binCenter: (bin.x0 + bin.x1) / 2,
          count: bin.length,
        }));

        // Estimate Rayleigh parameter (sigma) using MLE
        const sigma = Math.sqrt(d3.mean(windSpeeds.map((v) => v ** 2)) / 2);

        // Generate Rayleigh curve points (scaled for visualization)
        const rayleighCurve = histogramData.map(({ binCenter }) => ({
          binCenter,
          rayleigh: ((binCenter) / (sigma ** 2)) * Math.exp(-((binCenter ** 2) / (2 * (sigma ** 2)))) * 50,
        }));

        setWindData({ histogramData, rayleighCurve });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wind data:", error);
        setLoading(false);
      }
    };
    fetchWindData();
  }, []);

  return (
    <Box
      boxShadow="lg"
      borderRadius="lg"
      bg="#F5F5F5"
      transform="scale(0.95)"
      display="flex"
      flexDirection="column"
      alignItems="center" // Centers the text & chart vertically
    >
      <Text
        fontSize="md"
        fontWeight="bold"
        mt={4}
        fontFamily="winky sans"
        textAlign="center"
      >
        Wind Speed Analysis
      </Text>

      {loading ? (
        <Spinner size="md" mt={4} />
      ) : (
        <Box
          bg="#F5F5F5"
          p={2}
          display="flex"
          justifyContent="center" // Centers horizontally
          width="100%" // Ensures full width
        >
          <BarChart width={250} height={160} data={windData.histogramData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="binCenter"
              label={{ value: "Wind Speed (mph)", position: "insideBottom", dy: 5, fontSize: 12 }}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              label={{ value: "Frequency", angle: -90, position: "insideLeft", dx: -0, fontSize: 12 }}
              tick={{ fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#317AC7" />
            <Line
              type="monotone"
              data={windData.rayleighCurve}
              dataKey="rayleigh"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
            />
          </BarChart>
        </Box>
      )}
    </Box>

  );
};

export default WindSpeedChart;
