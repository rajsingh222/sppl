import React, { useRef } from "react";
import { Box, Heading, Button, Text } from "@chakra-ui/react";
import ThreeDStructure from "../components/ThreeDStructure";

const SensorLayout = ({ structure_model }) => {
    console.log("Structure Model:", structure_model);
    
      if (!structure_model) {
        return (
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
            width="100%"
            height="100%" // Adjust height as needed
            boxShadow="md"  
            bg="#f3f3f3"
          >
            <Box textAlign="center" color="gray.500">
              No 3D model available
            </Box>
          </Box>
        );
      }
    
      // Extract file extension from URL or filename
      const file_type = structure_model.split('?')[0].split('.').pop().toLowerCase().replace(/['"]/g, '').trim();
      console.log("File Type:", file_type);
      
      // Handle image files by displaying them
      if(file_type === 'jpg' || file_type === 'jpeg' || file_type === 'png') {
        console.log("Image file detected");
        return (
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
            width="100%"
            height="100%"
            boxShadow="md"
            bg="#f3f3f3"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="sm" color="gray.500" textAlign="center">
                  3d model will be available soon
            </Text>
          </Box>
        );
      }
    return (<>
        <Text fontSize="xl" textAlign="center" mb={4}fontWeight="bold">
            Sensor Layout Skeletal Structure
        </Text>
        <Box
            width="75%"
            height="70vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="8px"
            border='1px solid blue'
            overflow='hidden'
            mx='auto'
            position='relative'
        >
            <ThreeDStructure />
        </Box>
    </>

    );
};

export default SensorLayout;
