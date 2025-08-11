import React from "react";
import { ChakraProvider, Box, Grid, GridItem } from "@chakra-ui/react";
import RTD from "../components/RealTimeData";
import CSVRealtimeChart from "../components/CsvDataPlot";
import AddProjectDropdown from "../components/AddProject";
// import RealTimeDataChart from "./RealTimeDataChart";
// import SensorFFTComponent from "./FFT";

function Test() {
  return (
    <Box w='400px' h='600px'>
        <AddProjectDropdown/>
    </Box>
  );
}










export default Test;