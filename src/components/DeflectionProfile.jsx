import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  FormControl,
  FormLabel,
  SimpleGrid,
  Container,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BeamDeflectionCalculator = () => {
  const [length, setLength] = useState(10);
  const [points, setPoints] = useState(5);
  const [load, setLoad] = useState(100);
  const [E, setE] = useState(2e11);
  const [I, setI] = useState(1e-6);
  const [deflectionData, setDeflectionData] = useState([]);

  const calculateDeflection = () => {
    const dx = length / (points - 1);
    const newData = [];

    for (let i = 0; i < points; i++) {
      const x = i * dx;
      const delta = (load * Math.pow(x, 2)) / (6 * E * I) * (3 * length - x);
      newData.push({ x: parseFloat(x.toFixed(2)), deflection: parseFloat(delta.toFixed(6)) });
    }

    setDeflectionData(newData);
  };

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.800')} height='80vh' overflowY='auto'>
      <Container maxW="4xl">
        <Heading textAlign="center" mb={6} fontSize="3xl">
          Half Beam Deflection Profile Calculator
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mb={6}>
          <FormControl>
            <FormLabel>Beam Length (m) (from [0, 0, 0] to [0, 10, 0])</FormLabel>
            <Input type="number" value={length} onChange={(e) => setLength(+e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Data Points</FormLabel>
            <Input type="number" value={points} onChange={(e) => setPoints(+e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Load (N)</FormLabel>
            <Input type="number" value={load} onChange={(e) => setLoad(+e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Elastic Modulus E (Pa)</FormLabel>
            <Input type="number" value={E} onChange={(e) => setE(+e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Moment of Inertia I (m⁴)</FormLabel>
            <Input type="number" value={I} onChange={(e) => setI(+e.target.value)} />
          </FormControl>
        </SimpleGrid>

        <Button
          onClick={calculateDeflection}
          colorScheme="teal"
          size="lg"
          width="full"
          mb={6}
        >
          Calculate
        </Button>

        {deflectionData.length > 0 && (
          <Box>
            <Text fontSize="xl" fontWeight="semibold" mb={3}>
              Deflection Profile
            </Text>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={deflectionData}>
                <Line type="monotone" dataKey="deflection" stroke="#3182CE" strokeWidth={2} />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="x"
                  label={{ value: 'x (m)', position: 'insideBottomRight', offset: -5 }}
                />
                <YAxis
                  label={{
                    value: 'δ (m)',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BeamDeflectionCalculator;
