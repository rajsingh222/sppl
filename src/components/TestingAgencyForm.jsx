import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
} from '@chakra-ui/react';

const TestingAgencyForm = () => {
  const [structureName, setStructureName] = useState('');
  const [structuralDrawing, setStructuralDrawing] = useState('');
  const [competentAuthority, setCompetentAuthority] = useState('');
  const [testReports, setTestReports] = useState([]);

  const handleFileChange = (e) => {
    // Capture multiple PDF files
    setTestReports(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here
    const formData = {
      structureName,
      structuralDrawing,
      competentAuthority,
      testReports,
    };
    console.log('Submitted Form Data:', formData);
    // Add further submission logic as needed
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Structure Name</FormLabel>
            <Input
              placeholder="Enter structure name"
              value={structureName}
              onChange={(e) => setStructureName(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Structural Drawing (AutoCAD, ETAB picture only)</FormLabel>
            <Input
              placeholder="Enter drawing details or file name"
              value={structuralDrawing}
              onChange={(e) => setStructuralDrawing(e.target.value)}
            />
            {/* Optionally, you could switch to a file input if you want to upload the drawing */}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Name of Competent Authority</FormLabel>
            <Input
              placeholder="Enter competent authority name"
              value={competentAuthority}
              onChange={(e) => setCompetentAuthority(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Test Reports</FormLabel>
            <Input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFileChange}
            />
            {testReports.length > 0 && (
              <Box mt={2}>
                <Text fontSize="sm" mb={1}>Selected file(s):</Text>
                <ul>
                  {testReports.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </Box>
            )}
          </FormControl>

          <Button type="submit" colorScheme="teal">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default TestingAgencyForm;
