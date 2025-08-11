// ModelViewerComponent.jsx
import React, { useState, useRef } from 'react';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { FaCube } from 'react-icons/fa';
import { Heading } from 'lucide-react';

const ModelViewerComponent = ({ structure_model }) => {
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
          No 3D model available yet
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
  const modelViewerRef = useRef(null);
  const [radius] = useState(3); // Initial radius (3m)

  // Set a custom isometric view by updating theta and phi
  const setIsometricView = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.setAttribute('camera-orbit', `45deg 35deg ${radius}m`);
    }
  };

  return (
    <Box>
      {/* Use Chakra's Box with the "as" prop to render a custom element */}
      <Box
        as="model-viewer"
        ref={modelViewerRef}
        src={structure_model}
        alt="3D CAD Model"
        auto-rotate
        camera-controls
        boxRadius='1em'
        width="100%"
        height="35vh"
        aspectRatio={"1"}
        bg="#f0f0f0"
        camera-orbit={`45deg 45deg ${radius}m`}
        min-camera-orbit="45deg 45deg 0.1m"
      />
      <Box bg="#f3f3f3" mx='auto'>
        <IconButton
          onClick={setIsometricView}
          icon={<FaCube size="24px" color="#333" />}
          variant="ghost"
          aria-label="Set Isometric View"
        />
      </Box>
    </Box>
  );
};

export default ModelViewerComponent;
