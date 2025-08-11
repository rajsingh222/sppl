import React from 'react';
import {
  Box,
  Heading,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Icon,
  Spacer
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { InfoIcon } from '@chakra-ui/icons';

const SensorsCard = ({ sensors }) => {
  if (!sensors || sensors.length === 0) {
    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={5}
        width="100%"
        boxShadow="md"
        bg="#f3f3f3"
      >
        <Flex align="center" mb={4}>
          <Heading size="small">Sensors Information</Heading>
          <Spacer />
          <Icon as={InfoIcon} boxSize={5} color="gray.500" />
        </Flex>
        {/* <Heading size="small" mb={4}>Sensors Information</Heading> */}
        <Text>No sensors data available</Text>
      </Box>
    );
  }
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      width="100%" // Adjust width as needed
      boxShadow="md"
      bg="#f3f3f3"
    >
      {/* Header */}
      <Flex align="center" mb={4}>
        <Heading size="small">Sensors Information</Heading>
        <Spacer />
        <Icon as={ChevronRightIcon} boxSize={5} />
      </Flex>

      {/* Table */}
      <Table
        variant="simple"
        size="sm"
        sx={{
          fontSize: "0.8rem", // Decrease font size
          width: "80%",        // Adjust table width
          minWidth: "450px",   // Prevent excessive shrinking
          "th, td": {
            padding: "8px",    // Reduce padding inside cells
          },
        }}
      >
        <Thead>
          <Tr>
            <Th>Sensor ID</Th>
            <Th>Sensor Type</Th>
            <Th>Location</Th>
            <Th>Sampling Frequency</Th>
            <Th>Dimension</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sensors.map((sensor, index) => (
            <Tr key={index}>
              <Td>{sensor.sensorId}</Td>
              <Td>{sensor.sensorType}</Td>
              <Td>{sensor.location}</Td>
              <Td>{sensor.samplingFrequency}</Td>
              <Td>{sensor.dimension}</Td>
              <Td>{sensor.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

    </Box>
  );
};

export default SensorsCard;