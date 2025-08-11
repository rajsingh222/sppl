import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { FaPause, FaPlay, FaMinus, FaPlus } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { setFiveMinuteData } from '../api/SensorDataModule';
ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const API_RTD = 'https://sensor-api-7uaz.onrender.com';
const RTD = () => {
  const [chartData, setChartData] = useState([]);
  const [updateInterval, setUpdateInterval] = useState(1000);
  const [speed, setSpeed] = useState(1000);
  const [isPaused, setIsPaused] = useState(false);
  const [lastValue, setLastValue] = useState(null);
  const [sensor, setSensor] = useState(1);
  const [numSensors, setNumSensors] = useState(1);
  // const [fiveMinuteData, setFiveMinuteData] = useState([]); // Store 5-minute data here
  const intervalRef = useRef(null);
  const fiveMinIntervalRef = useRef(null);
  const continousDataRef = useRef([]);

  // CSV file handling functions
  const exportToCSV = (data, filename) => {
    if (!data.length) return;

    // Create CSV header based on number of sensors
    const sensorColumns = Array.from({ length: numSensors }, (_, i) => `Sensor_${i + 1}`);
    const csvHeader = ["Timestamp", ...sensorColumns].join(",");

    // Create rows
    const csvRows = data.map(item => {
      const timestamp = new Date(item.time).toISOString();
      const values = Array.isArray(item.values)
        ? item.values.join(",")
        : Array(numSensors).fill("").join(",");
      return `${timestamp},${values}`;
    });

    // Combine header and rows
    const csvContent = [csvHeader, ...csvRows].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateFiveMinuteData = () => {
    const now = Date.now();
    const fiveMinutesAgo = now - 200; // Correct 5-minute window in ms

    fetch(`${API_RTD}/api/data?start=${fiveMinutesAgo}&end=${now}`, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
      })
      .then((data) => {
        setFiveMinuteData(data); // Store the data in state
        console.log(`Updated five-minute data array with ${data.length} entries`);
      })
      .catch((error) => console.error("Error fetching 5-minute data: bigiii error", error));
  };


  const saveQueuedDataToCSV = () => {
    if (continousDataRef.current.length > 0) {
      exportToCSV(
        continousDataRef.current,
        `sensor_data_continuous_${new Date().toISOString().replace(/:/g, "-")}.csv`
      );
    }
  };
  const fetchData = () => {
    const now = Date.now();
    const fiveSecondsAgo = now - 200; // Still 1 second; adjust if needed

    fetch(`${API_RTD}/api/data?start=${fiveSecondsAgo}&end=${now}`, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
      })
      .then((data) => {
        data.sort((a, b) => a.time - b.time);
        if (data.length > 0 && data[0].values) {
          setNumSensors(data[0].values.length);
        }

        // Update the continuous data queue
        continousDataRef.current = [...continousDataRef.current, ...data];

        // Keep only the latest 100,000 entries
        if (continousDataRef.current.length > 100000) {
          continousDataRef.current = continousDataRef.current.slice(-100000);
        }

        const formattedData = data.map((d) => ({
          x: d.time,
          y: d.values[sensor - 1],
        }));
        setChartData(formattedData);

        if (formattedData.length > 0) {
          setLastValue(formattedData[formattedData.length - 1]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };


  useEffect(() => {
    if (!isPaused) {
      fetchData();
      intervalRef.current = setInterval(fetchData, updateInterval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, updateInterval, sensor]);

  // Setup interval for updating 5-minute data array (instead of downloading CSV)
  useEffect(() => {
    // Initial data load
    updateFiveMinuteData();

    // Set up interval to update the five-minute data every 5 minutes
    fiveMinIntervalRef.current = setInterval(updateFiveMinuteData, 5000);

    return () => {
      if (fiveMinIntervalRef.current) clearInterval(fiveMinIntervalRef.current);
    };
  }, []);

  const togglePausePlay = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  const handleDecreaseSpeed = () => {
    if (speed < 1000) {
      const newSpeed = speed + 100;
      setSpeed(newSpeed);
      setUpdateInterval(newSpeed);
      if (!isPaused) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(fetchData, newSpeed);
      }
    }
  };

  const handleIncreaseSpeed = () => {
    if (speed > 200) {
      const newSpeed = speed - 100;
      setSpeed(newSpeed);
      setUpdateInterval(newSpeed);
      if (!isPaused) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(fetchData, newSpeed);
      }
    }
  };

  const data = {
    datasets: [
      {
        label: `Sensor ${sensor} output`,
        data: chartData,
        borderColor: "#2A4365",
        borderWidth: 1,
        fill: false,
        pointRadius: 0, // Add this line to remove circles
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second",
          tooltipFormat: "HH:mm:ss",
          displayFormats: {
            second: "HH:mm:ss",
          },
        },
        title: {
          display: true,
          text: "Time (HH:MM:SS)",
        },
        min: chartData.length > 0 ? chartData[0].x : undefined,
        max: chartData.length > 0 ? chartData[chartData.length - 1].x : undefined,
        ticks: {
          font: { size: 10 },
        },
      },
      y: {
        min: -0.2,
        max: 0.15,
        title: {
          display: true,
          text: `Sensor ${sensor} output`,
        },
        ticks: {
          font: { size: 10 },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: { font: { size: 10 } },
      },
      tooltip: {
        titleFont: { size: 10 },
        bodyFont: { size: 10 },
      },
    },
  };


  return (
    <Box width="full" height="full" p={2} bg="#f3f3f3" border="1px solid wheat" borderRadius="0.5rem">
      <Box width="100%" height="84%">
        <Line data={data} options={options} />
      </Box>
      <Flex mt={2} justifyContent="space-between" alignItems="center" wrap="wrap" width="100%" height="16%">
        <Flex>
          <Button onClick={togglePausePlay} size="sm" mx={1}>
            {isPaused ? <FaPlay /> : <FaPause />}
          </Button>
          <Button onClick={handleDecreaseSpeed} size="sm" mx={1}>
            <FaMinus />
          </Button>
          <Button onClick={handleIncreaseSpeed} size="sm" mx={1}>
            <FaPlus />
          </Button>
        </Flex>
        <Flex alignItems="center" mt={{ base: 1, md: 0 }}>
          <Button
            onClick={() => setSensor(sensor - 1 < 1 ? 1 : sensor - 1)}
            size="sm"
            mx={1}
          >
            <MdArrowBackIos />
          </Button>
          <Text fontSize="sm" fontWeight="medium" mx={2}>
            Sensor: {sensor}
          </Text>
          <Button
            onClick={() => setSensor(sensor + 1 > numSensors ? numSensors : sensor + 1)}
            size="sm"
            mx={1}
          >
            <MdArrowForwardIos />
          </Button>
        </Flex>
        <Flex ml={2}>
          <Button onClick={saveQueuedDataToCSV} size="sm" colorScheme="blue">
            Export Data
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RTD;
