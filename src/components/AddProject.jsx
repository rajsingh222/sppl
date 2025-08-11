import React, { useState, useEffect } from 'react';
import {
  Box, Button, Collapse, FormControl, FormLabel, Input, VStack, useToast, Heading, Select, HStack, Text,
  Spinner
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from "../components/AuthContext";
import countries from '../api/Resources.js';
// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update the map view when marker position changes
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Mapping for handling map clicks
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => onMapClick(e),
  });
  return null;
};

// Preset mapping for cities to coordinates (adjust as needed)
const cityCoordinates = {
  "New York": { lat: 40.7128, lng: -74.0060 },
  "Los Angeles": { lat: 34.0522, lng: -118.2437 },
  "Chicago": { lat: 41.8781, lng: -87.6298 },
  "Houston": { lat: 29.7604, lng: -95.3698 },
  "Phoenix": { lat: 33.4484, lng: -112.0740 }
};

const AddProjectDropdown = () => {
  const { user } = useAuth(); // Fixed: Changed userAuth() to useAuth()
  const email = user?.email;
  const [formData, setFormData] = useState({
    project_title: '',
    area: '',
    city: '',
    state: '',
    country: '',
    structure_type: '',
    structure_name: '',
    otherType: '',
    latitude: '',
    longitude: '',
    structure_dimension: '', // Fixed: Changed dimension to structure_dimension to match form
    construction_material: '', // Added to match form
    construction_date: '', // Added to match form
  });

  const [projectImages, setStructureImages] = useState([]);
  const [projectVideos, setStructureVideo] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState({ lat: 28.6139, lng: 77.209 });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Added state for submission status
  const toast = useToast();

  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Update marker based on city selection from preset mapping.
  useEffect(() => {
    if (formData.city && cityCoordinates[formData.city]) {
      const { lat, lng } = cityCoordinates[formData.city];
      setMarkerPosition({ lat, lng });
      setFormData(prev => ({
        ...prev,
        latitude: lat.toString(),
        longitude: lng.toString()
      }));
    }
  }, [formData.city]);

  // Handle map click to update marker and coordinates.
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition({ lat, lng });
    setFormData(prev => ({
      ...prev,
      latitude: lat.toString(),
      longitude: lng.toString()
    }));
    toast({
      title: 'Location Selected',
      description: `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`,
      status: 'info',
      duration: 3000,
      isClosable: true
    });
  };

  // Function to handle location search using Nominatim API.
  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);
        setMarkerPosition({ lat: latitude, lng: longitude });
        setFormData(prev => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lon.toString()
        }));
        toast({
          title: 'Location Found',
          description: `Found ${display_name}`,
          status: 'success',
          duration: 3000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Not Found',
          description: 'No location found for your search query.',
          status: 'error',
          duration: 3000,
          isClosable: true
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading/submitting state

    const finalType = formData.structure_type === 'Other' ? formData.otherType : formData.structure_type;
    const form = new FormData();

    // Append all form fields to FormData
    form.append('email', email);
    form.append('project_title', formData.project_title);
    form.append('area', formData.area);
    form.append('city', formData.city);
    form.append('state', formData.state);
    form.append('country', formData.country);
    form.append('structure_type', finalType);
    form.append('structure_name', formData.structure_name);
    form.append('latitude', formData.latitude);
    form.append('longitude', formData.longitude);
    form.append('structure_dimension', formData.structure_dimension); // Added
    form.append('construction_material', formData.construction_material); // Added
    form.append('construction_date', formData.construction_date); // Added

    // Append files to FormData
    for (let i = 0; i < projectImages.length; i++) {
      form.append('project_images[]', projectImages[i]);
    }

    for (let i = 0; i < projectVideos.length; i++) {
      form.append('project_videos[]', projectVideos[i]);
    }

    console.log('Form Data:', formData);

    try {
      const res = await fetch('https://spplindia.org/api/addProjects.php', {
        method: 'POST',
        body: form
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: 'Success',
          description: data.message,
          status: 'success',
          duration: 4000,
          isClosable: true

        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setFormData({
          project_title: '',
          area: '',
          city: '',
          state: '',
          country: '',
          structure_type: '',
          structure_name: '',
          otherType: '',
          latitude: '',
          longitude: '',
          structure_dimension: '',
          construction_material: '',
          construction_date: '',
        });
        setStructureImages([]);
        setStructureVideo([]);
        setShowForm(false);
        window.location.reload();
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Upload failed.',
          status: 'error',
          duration: 4000,
          isClosable: true
        });
      }
    } catch (err) {
      toast({
        title: 'Network error',
        description: err.message,
        status: 'error',
        duration: 4000,
        isClosable: true
      });
    } finally {
      setIsSubmitting(false); // End loading/submitting state regardless of outcome
    }
  };

  return (
    <Box maxW="lg" p={2} borderRadius={"2xl"} overflowY="auto" height="60vh">
      <Button
        onClick={toggleForm}
        colorScheme="teal"
        textAlign="center"
        alignItems="center"
        fontSize="sm"
        rightIcon={showForm ? <ChevronUpIcon /> : <ChevronDownIcon />}
        w="auto"
        display="flex"
        mx="auto"
        mb={4}
      >
        {showForm ? 'Hide Form' : 'Add Project'}
      </Button>

      <Collapse in={showForm}>
        <Box p={4} borderWidth={1} borderRadius="2xl" boxShadow="lg" bg="white" height="100%">
          <Heading mb={6} fontSize="xl" textAlign="center">Add New Project</Heading>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Project Title</FormLabel>
                <Input
                  name="project_title"
                  value={formData.project_title}
                  onChange={handleChange}
                  placeholder="Enter text address"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Area</FormLabel>
                <Input
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Enter area"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city (e.g., New York)"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>State</FormLabel>
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Country</FormLabel>
                <Select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Select country"
                >
                  {countries.map((country, idx) => (
                    <option key={idx} value={country}>{country}</option>
                  ))}
                </Select>
              </FormControl>

              {/* Search input for location lookup */}
              <HStack w="full">
                <Input
                  placeholder="Search location (e.g., Delhi, Hauz Khas)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button colorScheme="teal" fontSize="10px" onClick={handleSearch}>Search Location</Button>
              </HStack>

              <Button
                colorScheme="teal"
                onClick={() => setShowMap(!showMap)}
                w="full"
              >
                {showMap ? 'Hide Map' : 'Select Coordinates via Map'}
              </Button>

              {showMap && (
                <Box w="full" h="400px" borderRadius="md" overflow="hidden">
                  <MapContainer
                    center={[markerPosition.lat, markerPosition.lng]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <ChangeView center={[markerPosition.lat, markerPosition.lng]} zoom={13} />
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapClickHandler onMapClick={handleMapClick} />
                    <Marker position={[markerPosition.lat, markerPosition.lng]} />
                  </MapContainer>
                </Box>
              )}

              <FormControl>
                <FormLabel>Latitude</FormLabel>
                <Input
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="Click on map or enter manually"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Longitude</FormLabel>
                <Input
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="Click on map or enter manually"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Structure Type</FormLabel>
                <Select
                  name="structure_type"
                  value={formData.structure_type}
                  onChange={handleChange}
                  placeholder="Select Structure Type"
                >
                  <option>Bridge/Flyover</option>
                  <option>Railways and Roadways</option>
                  <option>Building</option>
                  <option>Hydraulic Structure</option>
                  <option>Communication and Power</option>
                  <option>Critical Structure</option>
                  <option>Prestressed Structure</option>
                  <option>Refinery</option>
                  <option>Under Ground Structure</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>

              {formData.structure_type === 'Other' && (
                <FormControl isRequired>
                  <FormLabel>Specify Project Type</FormLabel>
                  <Input
                    name="otherType"
                    value={formData.otherType}
                    onChange={handleChange}
                  />
                </FormControl>
              )}

              <FormControl isRequired>
                <FormLabel>Structure Name</FormLabel>
                <Input
                  name="structure_name"
                  value={formData.structure_name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Structure Dimension</FormLabel>
                <Input
                  name="structure_dimension"
                  value={formData.structure_dimension}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Construction Material</FormLabel>
                <Input
                  name="construction_material"
                  value={formData.construction_material}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Structure Construction Date</FormLabel>
                <Input
                  name="construction_date"
                  value={formData.construction_date}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Structure Images</FormLabel>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setStructureImages([...e.target.files])}
                  p={1}
                />
              </FormControl>

              {/* Video Upload Field */}
              <FormControl>
                <FormLabel>Structure Video ( .mp4)</FormLabel>
                <Input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={(e) => setStructureVideo([...e.target.files])}
                  p={1}
                />
                {projectVideos.length > 0 && (
                  <Text fontSize="xs" mt={1} color="gray.600">
                    {projectVideos.length} video{projectVideos.length !== 1 ? 's' : ''} selected
                  </Text>
                )}
              </FormControl>

              <Button
                colorScheme="blue"
                type="submit"
                w="full"
                mt={4}
                isLoading={isSubmitting}
                loadingText="Submitting"
                spinner={<Spinner size="sm" color="white" />}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Project'}
              </Button>
            </VStack>
          </form>
        </Box>
      </Collapse>
    </Box>
  );
};

export default AddProjectDropdown;