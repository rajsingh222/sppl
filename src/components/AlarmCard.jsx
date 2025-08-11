import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  Icon,
  List,
  ListItem,
  Spacer,
} from '@chakra-ui/react';
import { ChevronRightIcon, BellIcon } from '@chakra-ui/icons'; // Import BellIcon
import { FaCompass } from 'react-icons/fa';

const AlarmCard = ({ alarms, badge }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={2}
      width="100%"
      height="100%"
      boxShadow="md"
      bg="#F3F3F3"
    >
      {/* Header */}
      <Flex align="center" mb={2}>
        <Icon as={BellIcon} boxSize={5} mr={2} /> {/* Add Notification Bell Icon */}
        <Heading size="md">Alarms</Heading>
        <Badge ml={2} colorScheme="red" fontSize="0.7em">
          {badge}
        </Badge>
        <Spacer />
        <Icon as={ChevronRightIcon} boxSize={5} />
      </Flex>

      {/* List of Alarms */}
      <List spacing={3}>
        {(!alarms || alarms.length === 0) && (
          <Text fontSize="sm" color="gray.500" textAlign="center">
            No alarms available
          </Text>
        )}
        
        {alarms.map((alarm, index) => (
          <ListItem key={index}>
            <Flex align="center">
              <Icon as={FaCompass} boxSize={5} mr={2} color="green.500" /> {/* Change Compass Icon Color */}
              <Text flex="1" fontSize="0.7em">{alarm.name}</Text>
              <Badge
                colorScheme={alarm.status === 'Sensor fault' ? 'orange' : 'teal'}
                fontSize="0.5em"
              >
                {alarm.status}
              </Badge>
              <Spacer />
              <Text>{alarm.percentage}%</Text>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AlarmCard;