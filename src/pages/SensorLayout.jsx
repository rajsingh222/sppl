// import React, { useRef } from "react";
// import { Box, Heading, Button, Text } from "@chakra-ui/react";
// import ThreeDStructure from "../components/ThreeDStructure";

// const SensorLayout = ({ structure_model }) => {
//     console.log("Structure Model:", structure_model);
    
//       if (!structure_model) {
//         return (
//           <Box
//             borderWidth="1px"
//             borderRadius="lg"
//             overflow="hidden"
//             p={5}
//             width="100%"
//             height="100%" // Adjust height as needed
//             boxShadow="md"  
//             bg="#f3f3f3"
//           >
//             <Box textAlign="center" color="gray.500">
//               No 3D model available
//             </Box>
//           </Box>
//         );
//       }
    
//       // Extract file extension from URL or filename
//       const file_type = structure_model.split('?')[0].split('.').pop().toLowerCase().replace(/['"]/g, '').trim();
//       console.log("File Type:", file_type);
      
//       // Handle image files by displaying them
//       if(file_type === 'jpg' || file_type === 'jpeg' || file_type === 'png') {
//         console.log("Image file detected");
//         return (
//           <Box
//             borderWidth="1px"
//             borderRadius="lg"
//             overflow="hidden"
//             p={5}
//             width="100%"
//             height="100%"
//             boxShadow="md"
//             bg="#f3f3f3"
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//           >
//             <Text fontSize="sm" color="gray.500" textAlign="center">
//                   3d model will be available soon
//             </Text>
//           </Box>
//         );
//       }
//     return (<>
//         <Text fontSize="xl" textAlign="center" mb={4}fontWeight="bold">
//             Sensor Layout Skeletal Structure
//         </Text>
//         <Box
//             width="75%"
//             height="70vh"
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             borderRadius="8px"
//             border='1px solid blue'
//             overflow='hidden'
//             mx='auto'
//             position='relative'
//         >
//             <ThreeDStructure />
//         </Box>
//     </>

//     );
// };

// export default SensorLayout;

import React from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import ThreeDStructure from "../components/ThreeDStructure";

const SensorLayout = ({ structure_model }) => {
  console.log("Structure Model:", structure_model);

  if (!structure_model) {
    return (
      <Flex
        align="center"
        justify="center"
        minH="60vh"
        bg="white"
        borderRadius="xl"
        border="2px solid yellow"
        boxShadow="xl"
        w={{ base: "95%", md: "90%" }}
        mx="auto"
        p={6}
      >
        <Text fontSize="lg" color="gray.600" textAlign="center" fontWeight="medium">
          No 3D model available
        </Text>
      </Flex>
    );
  }

  // Get file extension
  const file_type = structure_model
    .split("?")[0]
    .split(".")
    .pop()
    .toLowerCase()
    .replace(/['"]/g, "")
    .trim();

  // If it's an image file — show placeholder message
  if (["jpg", "jpeg", "png"].includes(file_type)) {
    return (
      <Flex
        align="center"
        justify="center"
        minH="60vh"
        bg="white"
        borderRadius="xl"
        border="2px solid yellow"
        boxShadow="xl"
        w={{ base: "95%", md: "90%" }}
        mx="auto"
        p={6}
      >
        <Text fontSize="lg" color="gray.600" textAlign="center" fontWeight="medium">
          3D model will be available soon
        </Text>
      </Flex>
    );
  }

  // If it's a 3D model — show viewer
  return (
    <Box w="full" px={{ base: 2, md: 6 }} py={4}>
      <Heading
        fontSize={{ base: "lg", md: "xl" }}
        textAlign="center"
        mb={4}
        color="yellow.400"
      >
        Sensor Layout Skeletal Structure
      </Heading>

      {/* <Flex
        justify="center"
        align="center"
        bg="white"
        borderRadius="xl"
        border="2px solid yellow"
        boxShadow="xl"
        w="full"
        maxW="1200px"
        mx="auto"
        p={4}
        minH={{ base: "50vh", md: "70vh" }}
      >
        <ThreeDStructure />
      </Flex> */}

      
    </Box>
  );
};

export default SensorLayout;

