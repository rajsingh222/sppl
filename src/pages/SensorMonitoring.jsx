import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import ModelViewerComponent from "../components/ModelViewerComponent";
import WeatherCard from "../components/WeatherCard";
import WindSpeedChart from "../components/WindSpeedChart";
import WindDirection from '../components/WindDirection';
import AlarmCard from '../components/AlarmCard';
import SensorsCard from '../components/SensorsCard';
import { useAuth } from "../components/AuthContext";
import {
  FaPause,
  FaPlay,
  FaRedo,
  FaHistory,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import RTD from "../components/RealTimeData";
import SensorChart from "../components/SensorChart";
// Register Chart.js components
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const alarms = [
  { name: 'Accelerometer 6', status: 'Sensor fault', percentage: 76 },
  { name: 'Accelerometer 9', status: 'Sensor change', percentage: 68 },
  { name: 'Piezo 12', status: 'Sensor change', percentage: 68 },
  { name: 'Strain Gauge 14', status: 'Sensor change', percentage: 68 },
  { name: 'Piezo 17', status: 'Sensor change', percentage: 68 },
  { name: 'Piezo 19', status: 'Sensor Unactive', percentage: 18 },
];
const sensors = [
  {
    sensorId: 'ACC1',
    sensorType: 'Accelerometer',
    location: 'Pylon A',
    samplingFrequency: '100Hz',
    dimension: '3D',
    status: 'Active',
  },
  {
    sensorId: 'ACC2',
    sensorType: 'Accelerometer',
    location: 'Pylon B',
    samplingFrequency: '100Hz',
    dimension: '3D',
    status: 'Active',
  },
  {
    sensorId: 'SG1',
    sensorType: 'Strain Gauge',
    location: 'Deck',
    samplingFrequency: '1Hz',
    dimension: '1D',
    status: 'Active',
  },
  {
    sensorId: 'DS1',
    sensorType: 'Displacement',
    location: 'Cable A1',
    samplingFrequency: '1Hz',
    dimension: '2D',
    status: 'Active',
  },
  {
    sensorId: 'TEMP1',
    sensorType: 'Temperature',
    location: 'Pylon A',
    samplingFrequency: '1Hz',
    dimension: '1D',
    status: 'Active',
  },
  {
    sensorId: 'HUM1',
    sensorType: 'Humidity',
    location: 'Deck',
    samplingFrequency: '1Hz',
    dimension: '1D',
    status: 'Active',
  },
  {
    sensorId: 'WIND1',
    sensorType: 'Wind Speed',
    location: 'Pylon A',
    samplingFrequency: '1Hz',
    dimension: '1D',
    status: 'Active',
  },
];
const SensorMonitoring = () => {
  const { user, isLoggedIn } = useAuth();
  const projects = user.project || [];
  const currentProject = user.currentProject;
  const foundProject = projects.find((p) => p.id === currentProject)
  const project = foundProject;
  const alarms = project.alarms || [];
  const sensors = project.sensor_info || [];
  const City = project.city || "Delhi";
  const structure_model = project.structure_model || null;
  return (

    <Flex height="90vh" width="90%" flexDirection="row" justifyContent="space-evenly" mx="auto"  >
      <Flex
        flexDirection="column"
        justifyContent="space-evenly"
        // border="1px solid black"
      >
        <Box p={4} display="flex" justifyContent="center" height="46vh">
          <AlarmCard alarms={alarms} />
        </Box>
        <Box p={3} display="flex" justifyContent="center" height='45vh' width='20vw'>
          <SensorsCard sensors={sensors} />
        </Box>
      </Flex>
      <Flex
        width="40%"
        flexDirection="column"
        // border="1px solid green"
        justifyContent='space-evenly'
      >
        <Box
          color="black"
          width="100%"
          height="40vh"
          borderRadius="1em"
        >
          <ModelViewerComponent structure_model={structure_model} />
        </Box>
        <Box
          width="100%"
          height="40vh"
          bg="#f5f5f5"
          borderRadius="1em"
          mx='auto'
        >
          <SensorChart width="100%" height={300} />
        </Box>
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent='space-evenly'
        alignItems="center"
        width="25%"
      >
        <Box width="100%" height="32%" userSelect="none">
          <WeatherCard city={City} apiKey={API_KEY} />
        </Box>
        <Box width="100%" height="32%" userSelect="none">
          <WindSpeedChart city={City} apiKey={API_KEY} />
        </Box>
        <Box width="100%" height="32%">
          <WindDirection city={City} apiKey={API_KEY} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default SensorMonitoring;
{/* <Flex
          flexDirection="row"
        >
          <Box
            width="100%"
            bg="#f5f5f5"
            borderRadius="1em"
            display="flex"
            flexDirection="column"
            mx='auto'
          >
            <Box width="100%">
              <Line data={data} options={options} />
            </Box>
            <Box mt={1} display="flex" alignItems="center">
              <Button onClick={togglePausePlay} {...btnStyle}>
                {isPaused ? <FaPlay /> : <FaPause />}
              </Button>
              <Button onClick={resetPlot} {...btnStyle}>
                <FaRedo />
              </Button>
              <Button onClick={handleDecreaseSpeed} {...btnStyle}>
                <FaMinus />
              </Button>
              <Button onClick={handleIncreaseSpeed} {...btnStyle}>
                <FaPlus />
              </Button>
              <Button onClick={getLastValue} {...btnStyle}>
                <FaHistory />
              </Button>
              <Button
                onClick={() => {
                  setSensor(sensor - 1 < 1 ? 1 : sensor - 1);
                }}
                {...btnStyle}
              >
                <MdArrowBackIos />
              </Button>
              <Text px={2} fontWeight="medium">Sensor: {sensor}</Text>
              <Button
                onClick={() => {
                  setSensor(sensor + 1 > numSensors ? numSensors : sensor + 1);
                }}
                {...btnStyle}
              >
                <MdArrowForwardIos />
              </Button>
            </Box>
            {lastValue && (
              <Box mt={2}>
                Last Value: {lastValue.y} at time: {lastValue.x}
              </Box>
            )}
          </Box>

        </Flex> */}