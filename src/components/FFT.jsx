import React, { useState, useEffect } from "react";
import { 
  Box, 
  Button, 
  Heading, 
  Flex, 
  Text, 
  Select,
  Spinner
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import Papa from "papaparse";

// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Function to compute FFT using pure JavaScript
function computeFFT(timeDomainData) {
  if (!timeDomainData || timeDomainData.length === 0) {
    return { magnitudes: [], frequencies: [] };
  }

  try {
    const times = timeDomainData.map(point => point.time);
    let totalInterval = 0;
    for (let i = 1; i < times.length; i++) {
      totalInterval += times[i] - times[i-1]; // Time is in seconds
    }
    const averageInterval = totalInterval / (times.length - 1);
    const samplingRate = 1 / averageInterval; // Hz
    
    const N = timeDomainData.length;
    const magnitudes = [];
    const frequencies = [];
    const maxFreq = Math.floor(N / 2);
    
    for (let k = 0; k < maxFreq; k++) {
      let re = 0;
      let im = 0;
      
      for (let n = 0; n < N; n++) {
        const phi = (2 * Math.PI * k * n) / N;
        re += timeDomainData[n].value * Math.cos(phi);
        im -= timeDomainData[n].value * Math.sin(phi);
      }
      
      re = re / N;
      im = im / N;
      const magnitude = Math.sqrt(re * re + im * im);
      magnitudes.push(magnitude);
      const frequency = k * samplingRate / N;
      frequencies.push(frequency.toFixed(2));
    }
    
    return { magnitudes, frequencies };
  } catch (error) {
    console.error("Error computing FFT:", error);
    return { magnitudes: [], frequencies: [] };
  }
}

const SensorFFTComponent = () => {
  const [fftData, setFftData] = useState({ magnitudes: [], frequencies: [] });
  const [selectedSensor, setSelectedSensor] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sensorCount, setSensorCount] = useState(1);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch and parse CSV data on component mount
  useEffect(() => {
    const fetchCsvData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/CSVs/Test Sensor Data.csv");
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV: ${response.statusText}`);
        }

        const csvText = await response.text();
        Papa.parse(csvText, {
          header: false, // No headers in CSV, we'll assign them
          skipEmptyLines: true,
          complete: (result) => {
            try {
              const data = result.data;
              if (data.length === 0) {
                setError("CSV file is empty");
                setIsLoading(false);
                return;
              }

              // Generate headers: time, sensor1, sensor2, ...
              const headers = ["time"];
              for (let i = 1; i < data[0].length; i++) {
                headers.push(`sensor${i}`);
              }

              // Map data to objects with headers
              const parsedData = data.map(row => {
                const rowData = {};
                headers.forEach((header, index) => {
                  rowData[header] = row[index];
                });
                return rowData;
              });

              // Validate data
              if (!parsedData.every(row => !isNaN(row.time) && headers.slice(1).every(h => !isNaN(row[h])))) {
                setError("Invalid data: All values must be numeric");
                setIsLoading(false);
                return;
              }

              setSensorCount(headers.length - 1); // Exclude time column
              setCsvData(parsedData);
              updateFFT(parsedData);
            } catch (error) {
              setError("Error parsing CSV data");
              console.error("CSV parsing error:", error);
              setIsLoading(false);
            }
          },
          error: (error) => {
            setError("Error reading CSV file");
            console.error("File reading error:", error);
            setIsLoading(false);
          }
        });
      } catch (error) {
        setError("Error fetching CSV file");
        console.error("Fetch error:", error);
        setIsLoading(false);
      }
    };

    fetchCsvData();
  }, []);

  // Compute FFT from CSV data
  const updateFFT = (data = csvData) => {
    setIsLoading(true);

    if (data.length === 0) {
      setFftData({ magnitudes: [], frequencies: [] });
      setIsLoading(false);
      return;
    }

    try {
      // Format data for FFT computation
      const timeDomainData = data.map(point => ({
        time: Number(point.time), // Time in seconds
        value: Number(point[`sensor${selectedSensor + 1}`]) || 0,
      }));

      const result = computeFFT(timeDomainData);
      setFftData(result);
      setLastUpdateTime(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error in FFT computation:", error);
      setError("Error computing FFT from data");
      setFftData({ magnitudes: [], frequencies: [] });
    }

    setIsLoading(false);
  };

  // Update FFT when sensor selection changes
  useEffect(() => {
    if (csvData.length > 0) {
      updateFFT();
    }
  }, [selectedSensor]);

  // Chart configuration
  const chartData = {
    labels: fftData.frequencies,
    datasets: [
      {
        label: `FFT for Sensor ${selectedSensor + 1}`,
        data: fftData.magnitudes,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        pointRadius: 0
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Frequency (Hz)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Magnitude',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Frequency Spectrum (FFT)',
      },
    },
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white">
      <Heading size="md" mb={4}>Sensor Data FFT Analysis</Heading>
      
      <Flex mb={4} alignItems="center">
        <Text mr={2}>Select Sensor:</Text>
        <Select 
          value={selectedSensor}
          onChange={(e) => setSelectedSensor(Number(e.target.value))}
          width="120px"
          mr={4}
          isDisabled={csvData.length === 0}
        >
          {Array.from({ length: sensorCount }, (_, i) => (
            <option key={i} value={i}>Sensor {i + 1}</option>
          ))}
        </Select>
        
        <Button 
          colorScheme="blue" 
          onClick={() => updateFFT()} 
          isLoading={isLoading}
          loadingText="Calculating"
          isDisabled={csvData.length === 0}
          ml="auto"
        >
          Refresh
        </Button>
      </Flex>
      
      {error && (
        <Text color="red.500" mb={2}>
          {error}
        </Text>
      )}
      
      {lastUpdateTime && (
        <Text fontSize="sm" color="gray.500" mb={2}>
          Last updated: {lastUpdateTime}
        </Text>
      )}
      
      <Box height="400px" position="relative">
        {isLoading ? (
          <Flex height="100%" alignItems="center" justifyContent="center">
            <Spinner size="xl" />
          </Flex>
        ) : csvData.length === 0 ? (
          <Flex height="100%" alignItems="center" justifyContent="center">
            <Text>Unable to load CSV data</Text>
          </Flex>
        ) : fftData.magnitudes.length === 0 ? (
          <Flex height="100%" alignItems="center" justifyContent="center">
            <Text>No valid data available for FFT calculation</Text>
          </Flex>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </Box>
      
      <Text mt={2} fontSize="sm" color="gray.600">
        Note: Displays the frequency spectrum of sensor data from Test Sensor Data.csv. 
        Higher magnitudes indicate stronger frequency components.
      </Text>
    </Box>
  );
};

export default SensorFFTComponent;