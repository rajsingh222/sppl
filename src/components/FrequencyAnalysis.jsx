import React from "react";
import { ChakraProvider, Box, Grid, GridItem } from "@chakra-ui/react";
import RTD from "./RealTimeData";
import RealTimeDataChart from "./RealTimeDataChart";
import CSVRealtimeChart from "./CsvDataPlot";
import SensorFFTComponent from "./FFT";
import SensorChart from "./SensorChart";
function FrequencyAnalysis() {
  return (
    <Box mb={4} textAlign="center" width='100%' height='80vh' overflowY='auto' >
      {/* <Box height='50vh' display='flex' width='100%'>
        <CSVRealtimeChart />
        <RealTimeDataChart />
      </Box>
      <Box height='80vh' display='flex' mt='2'>
        <SensorFFTComponent />
      </Box> */}
      <SensorChart width="100%" height={300} />
    </Box>
  );
}

export default FrequencyAnalysis;