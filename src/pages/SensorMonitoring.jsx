// import React, { useEffect, useRef, useState } from "react";
// import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
// import { Line } from "react-chartjs-2";
// import ModelViewerComponent from "../components/ModelViewerComponent";
// import WeatherCard from "../components/WeatherCard";
// import WindSpeedChart from "../components/WindSpeedChart";
// import WindDirection from '../components/WindDirection';
// import AlarmCard from '../components/AlarmCard';
// import SensorsCard from '../components/SensorsCard';
// import { useAuth } from "../components/AuthContext";
// import {
//   FaPause,
//   FaPlay,
//   FaRedo,
//   FaHistory,
//   FaMinus,
//   FaPlus,
// } from "react-icons/fa";
// import { MdArrowBackIos } from "react-icons/md";
// import { MdArrowForwardIos } from "react-icons/md";
// import RTD from "../components/RealTimeData";
// import SensorChart from "../components/SensorChart";
// // Register Chart.js components
// import {
//   Chart as ChartJS,
//   LinearScale,
//   CategoryScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";

// ChartJS.register(
//   LinearScale,
//   CategoryScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );
// const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
// const alarms = [
//   { name: 'Accelerometer 6', status: 'Sensor fault', percentage: 76 },
//   { name: 'Accelerometer 9', status: 'Sensor change', percentage: 68 },
//   { name: 'Piezo 12', status: 'Sensor change', percentage: 68 },
//   { name: 'Strain Gauge 14', status: 'Sensor change', percentage: 68 },
//   { name: 'Piezo 17', status: 'Sensor change', percentage: 68 },
//   { name: 'Piezo 19', status: 'Sensor Unactive', percentage: 18 },
// ];
// const sensors = [
//   {
//     sensorId: 'ACC1',
//     sensorType: 'Accelerometer',
//     location: 'Pylon A',
//     samplingFrequency: '100Hz',
//     dimension: '3D',
//     status: 'Active',
//   },
//   {
//     sensorId: 'ACC2',
//     sensorType: 'Accelerometer',
//     location: 'Pylon B',
//     samplingFrequency: '100Hz',
//     dimension: '3D',
//     status: 'Active',
//   },
//   {
//     sensorId: 'SG1',
//     sensorType: 'Strain Gauge',
//     location: 'Deck',
//     samplingFrequency: '1Hz',
//     dimension: '1D',
//     status: 'Active',
//   },
//   {
//     sensorId: 'DS1',
//     sensorType: 'Displacement',
//     location: 'Cable A1',
//     samplingFrequency: '1Hz',
//     dimension: '2D',
//     status: 'Active',
//   },
//   {
//     sensorId: 'TEMP1',
//     sensorType: 'Temperature',
//     location: 'Pylon A',
//     samplingFrequency: '1Hz',
//     dimension: '1D',
//     status: 'Active',
//   },
//   {
//     sensorId: 'HUM1',
//     sensorType: 'Humidity',
//     location: 'Deck',
//     samplingFrequency: '1Hz',
//     dimension: '1D',
//     status: 'Active',
//   },
//   {
//     sensorId: 'WIND1',
//     sensorType: 'Wind Speed',
//     location: 'Pylon A',
//     samplingFrequency: '1Hz',
//     dimension: '1D',
//     status: 'Active',
//   },
// ];
// const SensorMonitoring = () => {
//   const { user, isLoggedIn } = useAuth();
//   const projects = user.project || [];
//   const currentProject = user.currentProject;
//   const foundProject = projects.find((p) => p.id === currentProject)
//   const project = foundProject;
//   const alarms = project.alarms || [];
//   const sensors = project.sensor_info || [];
//   const City = project.city || "Delhi";
//   const structure_model = project.structure_model || null;
//   return (

//     <Flex height="90vh" width="90%" flexDirection="row" justifyContent="space-evenly" mx="auto"  >
//       <Flex
//         flexDirection="column"
//         justifyContent="space-evenly"
//         // border="1px solid black"
//       >
//         <Box p={4} display="flex" justifyContent="center" height="46vh">
//           <AlarmCard alarms={alarms} />
//         </Box>
//         <Box p={3} display="flex" justifyContent="center" height='45vh' width='20vw'>
//           <SensorsCard sensors={sensors} />
//         </Box>
//       </Flex>
//       <Flex
//         width="40%"
//         flexDirection="column"
//         // border="1px solid green"
//         justifyContent='space-evenly'
//       >
//         <Box
//           color="black"
//           width="100%"
//           height="40vh"
//           borderRadius="1em"
//         >
//           <ModelViewerComponent structure_model={structure_model} />
//         </Box>
//         <Box
//           width="100%"
//           height="40vh"
//           bg="#f5f5f5"
//           borderRadius="1em"
//           mx='auto'
//         >
//           <SensorChart width="100%" height={300} />
//         </Box>
//       </Flex>
//       <Flex
//         flexDirection="column"
//         justifyContent='space-evenly'
//         alignItems="center"
//         width="25%"
//       >
//         <Box width="100%" height="32%" userSelect="none">
//           <WeatherCard city={City} apiKey={API_KEY} />
//         </Box>
//         <Box width="100%" height="32%" userSelect="none">
//           <WindSpeedChart city={City} apiKey={API_KEY} />
//         </Box>
//         <Box width="100%" height="32%">
//           <WindDirection city={City} apiKey={API_KEY} />
//         </Box>
//       </Flex>
//     </Flex>
//   );
// };

// export default SensorMonitoring;

// import React from "react";
// import { Box, Flex, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
// import ModelViewerComponent from "../components/ModelViewerComponent";
// import WeatherCard from "../components/WeatherCard";
// import WindSpeedChart from "../components/WindSpeedChart";
// import WindDirection from "../components/WindDirection";
// import AlarmCard from "../components/AlarmCard";
// import SensorsCard from "../components/SensorsCard";
// import SensorChart from "../components/SensorChart";
// import { useAuth } from "../components/AuthContext";

// const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// const SensorMonitoring = () => {
//   const { user } = useAuth();
//   const projects = user.project || [];
//   const currentProject = user.currentProject;
//   const foundProject = projects.find((p) => p.id === currentProject);
//   const project = foundProject || {};
  
//   const alarms = project.alarms || [];
//   const sensors = project.sensor_info || [];
//   const City = project.city || "Delhi";
//   const structure_model = project.structure_model || null;

//   const colSpanValue = useBreakpointValue({ base: 12, md: 6, lg: 4 });

//   return (
//     <Grid
//       templateColumns="repeat(12, 1fr)"
//       gap={4}
//       width="100%"
//       px={{ base: 2, md: 4 }}
//       py={4}
//       bg="black"
//       borderRadius="lg"
//     >
//       {/* Left Column */}
//       <GridItem colSpan={colSpanValue}>
//         <Flex direction="column" gap={4}>
//           <Box
//             bg="white"
//             borderRadius="lg"
//             boxShadow="lg"
//             p={4}
//             border="2px solid yellow"
//           >
//             <AlarmCard alarms={alarms} />
//           </Box>
//           <Box
//             bg="white"
//             borderRadius="lg"
//             boxShadow="lg"
//             p={4}
//             border="2px solid yellow"
//           >
//             <SensorsCard sensors={sensors} />
//           </Box>
//         </Flex>
//       </GridItem>

//       {/* Middle Column */}
//       <GridItem colSpan={colSpanValue}>
//         <Flex direction="column" gap={4}>
//           <Box
//             bg="white"
//             borderRadius="lg"
//             boxShadow="lg"
//             p={2}
//             border="2px solid yellow"
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             minH="250px"
//           >
//             <ModelViewerComponent structure_model={structure_model} />
//           </Box>
//           <Box
//             bg="white"
//             borderRadius="lg"
//             boxShadow="lg"
//             p={2}
//             border="2px solid yellow"
//           >
//             <SensorChart width="100%" height={250} />
//           </Box>
//         </Flex>
//       </GridItem>

//       {/* Right Column */}
//       <GridItem colSpan={colSpanValue}>
//         <Flex direction="column" gap={4}>
//           <Box
//             bg="white"
//             borderRadius="lg"
//             boxShadow="lg"
//             p={3}
//             border="2px solid yellow"
//           >
//             <WeatherCard city={City} apiKey={API_KEY} />
//           </Box>
//           <Box
//             bg="white"
//             borderRadius="lg"
//             boxShadow="lg"
//             p={3}
//             border="2px solid yellow"
//           >
//             <WindSpeedChart city={City} apiKey={API_KEY} />
//           </Box>
//           <Box
//             bg="white"
//             borderRadius="lg"
//             boxShadow="lg"
//             p={3}
//             border="2px solid yellow"
//           >
//             <WindDirection city={City} apiKey={API_KEY} />
//           </Box>
//         </Flex>
//       </GridItem>
//     </Grid>
//   );
// };

// export default SensorMonitoring;


// import React from "react";
// import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
// import ModelViewerComponent from "../components/ModelViewerComponent";
// import WeatherCard from "../components/WeatherCard";
// import WindSpeedChart from "../components/WindSpeedChart";
// import WindDirection from "../components/WindDirection";
// import AlarmCard from "../components/AlarmCard";
// import SensorsCard from "../components/SensorsCard";
// import SensorChart from "../components/SensorChart";
// import { useAuth } from "../components/AuthContext";

// const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// const SensorMonitoring = () => {
//   const { user } = useAuth();
//   const projects = user.project || [];
//   const currentProject = user.currentProject;
//   const foundProject = projects.find((p) => p.id === currentProject);
//   const project = foundProject || {};

//   const alarms = project.alarms || [];
//   const sensors = project.sensor_info || [];
//   const City = project.city || "Delhi";
//   const structure_model = project.structure_model || null;

//   return (
//     <Grid
//       templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
//       gap={6}
//       px={{ base: 2, md: 4 }}
//       py={4}
//       bg="black"
//       borderRadius="lg"
//       w="full"
//     >
//       {/* Column 1 */}
//       <Flex direction="column" gap={4} flexGrow={1}>
//         <Box bg="white" borderRadius="lg" boxShadow="xl" p={4} border="2px solid yellow">
//           <AlarmCard alarms={alarms} />
//         </Box>
//         <Box bg="white" borderRadius="lg" boxShadow="xl" p={4} border="2px solid yellow">
//           <SensorsCard sensors={sensors} />
//         </Box>
//       </Flex>

//       {/* Column 2 */}
//       <Flex direction="column" gap={4} flexGrow={1}>
//         <Box
//           bg="white"
//           borderRadius="lg"
//           boxShadow="xl"
//           p={3}
//           border="2px solid yellow"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           minH="250px"
//         >
//           <ModelViewerComponent structure_model={structure_model} />
//         </Box>
//         <Box bg="white" borderRadius="lg" boxShadow="xl" p={3} border="2px solid yellow">
//           <SensorChart width="100%" height={250} />
//         </Box>
//       </Flex>

//       {/* Column 3 */}
//       <Flex direction="column" gap={4} flexGrow={1}>
//         <Box bg="white" borderRadius="lg" boxShadow="xl" p={3} border="2px solid yellow">
//           <WeatherCard city={City} apiKey={API_KEY} />
//         </Box>
//         <Box bg="white" borderRadius="lg" boxShadow="xl" p={3} border="2px solid yellow">
//           <WindSpeedChart city={City} apiKey={API_KEY} />
//         </Box>
//         <Box bg="white" borderRadius="lg" boxShadow="xl" p={3} border="2px solid yellow">
//           <WindDirection city={City} apiKey={API_KEY} />
//         </Box>
//       </Flex>
//     </Grid>
//   );
// };

// export default SensorMonitoring;


// import React from "react";
// import { Box, Flex, Grid, Button, Heading, Text } from "@chakra-ui/react";
// import ModelViewerComponent from "../components/ModelViewerComponent";
// import WeatherCard from "../components/WeatherCard";
// import WindSpeedChart from "../components/WindSpeedChart";
// import WindDirection from "../components/WindDirection";
// import AlarmCard from "../components/AlarmCard";
// import SensorsCard from "../components/SensorsCard";
// import SensorChart from "../components/SensorChart";
// import { useAuth } from "../components/AuthContext";

// const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// const SensorMonitoring = () => {
//   const { user } = useAuth();
//   const projects = user.project || [];
//   const currentProject = user.currentProject;
//   const foundProject = projects.find((p) => p.id === currentProject);
//   const project = foundProject || {};

//   const alarms = project.alarms || [];
//   const sensors = project.sensor_info || [];
//   const City = project.city || "Delhi";
//   const structure_model = project.structure_model || null;

//   return (
//     <Box>
//       <Grid
//         templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
//         gap={6}
//         px={{ base: 2, md: 4 }}
//         py={4}
//         bg="black"
//         borderRadius="lg"
//         w="full"
//       >
//         {/* Column 1 */}
//         <Flex direction="column" gap={4}>
//           <Box bg="white" borderRadius="lg" boxShadow="xl" p={4} border="2px solid yellow">
//             <AlarmCard alarms={alarms} />
//           </Box>
//           <Box bg="white" borderRadius="lg" boxShadow="xl" p={4} border="2px solid yellow">
//             <SensorsCard sensors={sensors} />
//           </Box>
//         </Flex>

//         {/* Column 2 */}
//         <Flex direction="column" gap={4}>
//           <Box
//             bg="white"
//             borderRadius="lg"
//             boxShadow="xl"
//             p={3}
//             border="2px solid yellow"
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             minH="250px"
//           >
//             <ModelViewerComponent structure_model={structure_model} />
//           </Box>
//           <Box bg="white" borderRadius="lg" boxShadow="xl" p={3} border="2px solid yellow">
//             <SensorChart width="100%" height={250} />
//           </Box>
//         </Flex>

//         {/* Column 3 */}
//         <Flex direction="column" gap={4}>
//           <Box bg="white" borderRadius="lg" boxShadow="xl" p={3} border="2px solid yellow">
//             <WeatherCard city={City} apiKey={API_KEY} />
//           </Box>
//           <Box bg="white" borderRadius="lg" boxShadow="xl" p={3} border="2px solid yellow">
//             <WindSpeedChart city={City} apiKey={API_KEY} />
//           </Box>
//           <Box bg="white" borderRadius="lg" boxShadow="xl" p={3} border="2px solid yellow">
//             <WindDirection city={City} apiKey={API_KEY} />
//           </Box>
//         </Flex>
//       </Grid>

//       {/* Fancy Report Section */}
//       <Box
//         w={{ base: "95%", md: "90%" }}
//         mx="auto"
//         mt={8}
//         p={6}
//         borderRadius="xl"
//         boxShadow="2xl"
//         bg="black"
//         border="2px solid yellow"
//         textAlign="center"
//       >
//         <Heading size="lg" mb={4} color="yellow.400">
//           📄 Project Report
//         </Heading>
//         <Text mb={4} color="white" fontSize="lg">
//           Download a detailed analysis of alarms, sensors, environmental data, and model
//           structure for <b>{project.name || "your project"}</b>.
//         </Text>
//         <Button
//           bg="yellow.400"
//           color="black"
//           size="lg"
//           px={8}
//           borderRadius="full"
//           fontWeight="bold"
//           _hover={{ bg: "yellow.300" }}
//           onClick={() => alert("Generating report...")}
//         >
//           Generate Report
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default SensorMonitoring;


import React, { useRef, useEffect } from "react";
import { Box, Flex, Grid, Button, Heading, Text } from "@chakra-ui/react";
import ModelViewerComponent from "../components/ModelViewerComponent";
import WeatherCard from "../components/WeatherCard";
import WindSpeedChart from "../components/WindSpeedChart";
import WindDirection from "../components/WindDirection";
import AlarmCard from "../components/AlarmCard";
import SensorsCard from "../components/SensorsCard";
import SensorChart from "../components/SensorChart";
import { useAuth } from "../components/AuthContext";
import { useLocation } from "react-router-dom";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const SensorMonitoring = () => {
  const { user } = useAuth();
  const location = useLocation();
  const reportRef = useRef(null);

  const projects = user.project || [];
  const currentProject = user.currentProject;
  const foundProject = projects.find((p) => p.id === currentProject);
  const project = foundProject || {};

  const alarms = project.alarms || [];
  const sensors = project.sensor_info || [];
  const City = project.city || "Delhi";
  const structure_model = project.structure_model || null;

  // Smooth scroll to report section if #report in URL
  useEffect(() => {
    if (location.hash === "#report" && reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <Box>
      {/* Dashboard Grid */}
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={6}
        px={{ base: 2, md: 4 }}
        py={4}
        bg="black"
        borderRadius="lg"
        w="full"
      >
        {/* Column 1 */}
        <Flex direction="column" gap={4}>
          <Box
            bg="white"
            borderRadius="lg"
            boxShadow="xl"
            p={4}
            border="2px solid yellow"
          >
            <AlarmCard alarms={alarms} />
          </Box>
          <Box
            bg="white"
            borderRadius="lg"
            boxShadow="xl"
            p={4}
            border="2px solid yellow"
          >
            <SensorsCard sensors={sensors} />
          </Box>
        </Flex>

        {/* Column 2 */}
        <Flex direction="column" gap={4}>
          <Box
            bg="white"
            borderRadius="lg"
            boxShadow="xl"
            p={3}
            border="2px solid yellow"
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH="250px"
          >
            <ModelViewerComponent structure_model={structure_model} />
          </Box>
          <Box
            bg="white"
            borderRadius="lg"
            boxShadow="xl"
            p={3}
            border="2px solid yellow"
          >
            <SensorChart width="100%" height={250} />
          </Box>
        </Flex>

        {/* Column 3 */}
        <Flex direction="column" gap={4}>
          <Box
            bg="white"
            borderRadius="lg"
            boxShadow="xl"
            p={3}
            border="2px solid yellow"
          >
            <WeatherCard city={City} apiKey={API_KEY} />
          </Box>
          <Box
            bg="white"
            borderRadius="lg"
            boxShadow="xl"
            p={3}
            border="2px solid yellow"
          >
            <WindSpeedChart city={City} apiKey={API_KEY} />
          </Box>
          <Box
            bg="white"
            borderRadius="lg"
            boxShadow="xl"
            p={3}
            border="2px solid yellow"
          >
            <WindDirection city={City} apiKey={API_KEY} />
          </Box>
        </Flex>
      </Grid>

      {/* Fancy Report Section */}
      <Box
        ref={reportRef}
        w={{ base: "95%", md: "90%" }}
        mx="auto"
        mt={8}
        p={6}
        borderRadius="xl"
        boxShadow="2xl"
        bg="black"
        border="2px solid yellow"
        textAlign="center"
      >
        <Heading size="lg" mb={4} color="yellow.400">
          📄 Project Report
        </Heading>
        <Text mb={4} color="white" fontSize="lg">
          Download a detailed analysis of alarms, sensors, environmental data and model
          structure for your project.
        </Text>
        <Button
          bg="yellow.400"
          color="black"
          size="lg"
          px={8}
          borderRadius="full"
          fontWeight="bold"
          _hover={{ bg: "yellow.300" }}
          onClick={() => alert("Generating report...")}
        >
          Generate Report
        </Button>
      </Box>
    </Box>
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