import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Button, VStack, HStack, Box, Text, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

const SensorPlot = () => {
  const [csvData, setCsvData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSensor, setSelectedSensor] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetch('/CSVs/Test Sensor Data.csv')
      .then(res => res.text())
      .then(text => {
        const rows = text.trim().split('\n');
        const data = rows.map(row => row.split(',').slice(1).map(Number));
        setCsvData(data);
      });
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % (csvData.length || 1));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [csvData]);

  const getTimeLabels = (len) => {
    const now = new Date();
    return Array.from({ length: len }, (_, i) => {
      const d = new Date(now.getTime() - (len - i - 1) * 1000);
      return d.toLocaleTimeString();
    });
  };

  const getChartData = () => {
    const labels = getTimeLabels(100);
    const sensorIndex = selectedSensor;
    const dataSlice = [];
    for (let i = 0; i < 100; i++) {
      const idx = (currentIndex + i) % csvData.length;
      dataSlice.push(csvData[idx]?.[sensorIndex] ?? null);
    }

    return {
      labels,
      datasets: [{
        label: `Sensor ${sensorIndex + 1}`,
        data: dataSlice,
        borderColor: `hsl(${sensorIndex * 20}, 100%, 50%)`,
        backgroundColor: 'transparent',
        pointRadius: 0
      }],
    };
  };

  const handlePrev = () => {
    setSelectedSensor((prev) => (prev === 0 ? 16 : prev - 1));
  };

  const handleNext = () => {
    setSelectedSensor((prev) => (prev === 16 ? 0 : prev + 1));
  };

  return (
    <VStack spacing={6} p={4} w="full">
      <Box w="full">
        <Line data={getChartData()} options={{ animation: false, responsive: true }} />
      </Box>
      <HStack>
        <IconButton icon={<ChevronLeftIcon />} onClick={handlePrev} aria-label="Prev" />
        <Text fontSize="lg" fontWeight="bold">Sensor: {selectedSensor + 1}</Text>
        <IconButton icon={<ChevronRightIcon />} onClick={handleNext} aria-label="Next" />
      </HStack>
    </VStack>
  );
};

export default SensorPlot;
