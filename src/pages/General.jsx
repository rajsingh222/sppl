'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  FcElectricity,      // For Electric Power & Communication
  FcRadarPlot,        // For Non Contact Sensors
} from 'react-icons/fc'
import { FaCarTunnel } from "react-icons/fa6";
import { GiRailway } from "react-icons/gi";
import { FaBridge } from "react-icons/fa6";
import { FaRegBuilding } from "react-icons/fa";
import { GiOffshorePlatform } from "react-icons/gi";
import { GiDistressSignal } from "react-icons/gi";
import { GiArchBridge } from "react-icons/gi";

const Card = ({ heading, description, icon, href }) => {
  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w="full"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      bg="#f3f3f3"  // Background color changed to yellow
      boxShadow="md"
    >
      <Stack align="start" spacing={2}>
        <Flex
          w={16}
          h={16}
          align="center"
          justify="center"
          color="#f3f3f3"
          rounded="full"
          bg={useColorModeValue('gray.100', 'gray.700')}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize="sm">
            {description}
          </Text>
        </Box>
        {/* <Button as="a" href={href} variant="link" colorScheme="blue" size="sm">
          Learn more
        </Button> */}
      </Stack>
    </Box>
  )
}

export default function GridListWith() {
  return (
    <Box position="relative" width="100%" height="90vh" overflow="hidden">
      {/* Background Video */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex="0"
        overflow="hidden"
      >
        <Box
          as="video"
          autoPlay
          loop
          muted
          position="absolute"
          width="100%"
          height="100%"
          objectFit="cover"
          opacity="0.45"
          src="/ProjectVideo/construction.mp4"  // Replace with your video path
          fallback={<Box bg="red.800" width="100%" height="100%" />}
        />
        {/* Overlay for better text visibility */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="blackAlpha.300"
        />
      </Box>

      {/* Content */}
      <Box
        position="relative"
        zIndex="1"
        p={4}
        height="90vh"
        overflowY="auto"
        mx="auto"
        width="100%"
      >
        <Stack spacing={4} as={Container} maxW="3xl" textAlign="center">
          <Heading 
            fontSize={{ base: '2xl', sm: '4xl' }} 
            fontWeight="bold"
            bgGradient="linear(to-r, blue.400, teal.500)"
            bgClip="text"
            color='blue.700'
          >
            Welcome to Sanrachna Prahari
          </Heading>
          <Text 
            color={useColorModeValue('gray.700', 'gray.200')} 
            fontSize={{ base: 'sm', sm: 'lg' }}
            fontWeight="medium"
          >
            Our Structural Health Monitoring (SHM) services use advanced sensor technology and data analytics to keep your infrastructure safe and reliable. Sanrachna Prahari Provides..
          </Text>
        </Stack>

        <Container maxW="5xl" mt={12}>
          <Flex flexWrap="wrap" gridGap={6} justify="center">
            <Card
              heading="Bridge Monitoring"
              icon={<Icon as={FaBridge} w={10} h={10} color='orange' />}
              description="Structural Health Monitoring (SHM) is critical for ensuring bridge safety and extending their lifespan. It employs advanced sensors and inspections to detect issues such as cracks, corrosion, fatigue, and deformation early—minimizing maintenance costs and reducing the risk of failure."
              href="#"
            />
            <Card
              heading="Building Monitoring"
              icon={<Icon as={FaRegBuilding} w={10} h={10} color='gray.400' />}
              description="Our advanced Structural Health Monitoring (SHM) system keeps your buildings safe by continuously detecting potential issues like cracks, foundation shifts, corrosion, and abnormal vibrations. Early detection enables proactive maintenance, ensuring safety and reducing costly repairs."
              href="#"
            />
            <Card
              heading="Tunnel Monitoring"
              icon={<Icon as={FaCarTunnel} w={10} h={10} color='blue.800'/>}
              description="Our advanced SHM system continuously monitors tunnel integrity—detecting cracks, water ingress, corrosion, deformation, and seismic effects. This early warning enables proactive maintenance and ensures safe, reliable tunnel operations."
              href="#"
            />
            <Card
              heading="Rail & Road"
              icon={<Icon as={GiRailway} w={10} h={10} color='blue.600'/>}
              description="Advanced Structural Health Monitoring enhances the safety and efficiency of rail and road networks by continuously detecting issues like surface cracks, uneven settlement, fatigue, corrosion, and misalignment. This proactive monitoring enables timely repairs, extends asset lifespan, and minimizes disruptions."
              href="#"
            />
            <Card
              heading="Critical & Strategic Infrastructure"
              icon={<Icon as={GiArchBridge} w={10} h={10} color='pink.700'/>}
              description="Structural Health Monitoring in critical and strategic infrastructure ensures continuous oversight, enabling early fault detection and proactive maintenance to secure the safety and resilience of essential assets."
              href="#"
            />
            <Card
              heading="Electric Power & Communication"
              icon={<Icon as={FcElectricity} w={10} h={10} />}
              description="In electric power and communication systems, SHM ensures structural integrity and uninterrupted service through continuous monitoring, early fault detection, and predictive maintenance strategies."
              href="#"
            />
            <Card
              heading="Prestressed Structures"
              icon={<Icon as={GiDistressSignal} w={10} h={10} color='yellow.500'/>}
              description="Advanced sensor technologies detect corrosion, loss of prestressing force, cracking, grouting defects, and tendon fractures in prestressed structures. Early detection through real-time monitoring enables targeted maintenance, enhancing safety and extending the service life of bridges, buildings, and other infrastructures."
              href="#"
            />
            <Card
              heading="Offshore & Hydraulic Structures"
              icon={<Icon as={GiOffshorePlatform} w={10} h={10} color='blue.900'/>}
              description="Structural Health Monitoring (SHM) enhances the reliability of offshore and hydraulic structures by continuously detecting issues such as corrosion, fatigue, cracking, and environmental degradation. Real-time monitoring of dynamic loads, water ingress, and material deterioration enables timely interventions."
              href="#"
            />
            <Card
              heading="Non Contact Sensors"
              icon={<Icon as={FcRadarPlot} w={10} h={10} />}
              description="Non-contact sensors in SHM capture precise, real-time data using methods like laser vibrometry, digital image correlation, and thermal imaging—all without physical contact. This approach enhances safety, accessibility, and data richness for effectively monitoring critical infrastructures such as bridges, buildings, and tunnels."
              href="#"
            />
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}