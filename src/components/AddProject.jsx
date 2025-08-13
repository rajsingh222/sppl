// import React, { useState, useEffect } from 'react';
// import {
//   Box, Button, Collapse, FormControl, FormLabel, Input, VStack, useToast, Heading, Select, HStack, Text,
//   Spinner
// } from '@chakra-ui/react';
// import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useAuth } from "../components/AuthContext";
// import countries from '../api/Resources.js';
// // Fix Leaflet marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// // Component to update the map view when marker position changes
// const ChangeView = ({ center, zoom }) => {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(center, zoom);
//   }, [center, zoom, map]);
//   return null;
// };

// // Mapping for handling map clicks
// const MapClickHandler = ({ onMapClick }) => {
//   useMapEvents({
//     click: (e) => onMapClick(e),
//   });
//   return null;
// };

// // Preset mapping for cities to coordinates (adjust as needed)
// const cityCoordinates = {
//   "New York": { lat: 40.7128, lng: -74.0060 },
//   "Los Angeles": { lat: 34.0522, lng: -118.2437 },
//   "Chicago": { lat: 41.8781, lng: -87.6298 },
//   "Houston": { lat: 29.7604, lng: -95.3698 },
//   "Phoenix": { lat: 33.4484, lng: -112.0740 }
// };

// const AddProjectDropdown = () => {
//   const { user } = useAuth(); // Fixed: Changed userAuth() to useAuth()
//   const email = user?.email;
//   const [formData, setFormData] = useState({
//     project_title: '',
//     area: '',
//     city: '',
//     state: '',
//     country: '',
//     structure_type: '',
//     structure_name: '',
//     otherType: '',
//     latitude: '',
//     longitude: '',
//     structure_dimension: '', // Fixed: Changed dimension to structure_dimension to match form
//     construction_material: '', // Added to match form
//     construction_date: '', // Added to match form
//   });

//   const [projectImages, setStructureImages] = useState([]);
//   const [projectVideos, setStructureVideo] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showMap, setShowMap] = useState(false);
//   const [markerPosition, setMarkerPosition] = useState({ lat: 28.6139, lng: 77.209 });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false); // Added state for submission status
//   const toast = useToast();

//   const toggleForm = () => setShowForm(!showForm);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // Update marker based on city selection from preset mapping.
//   useEffect(() => {
//     if (formData.city && cityCoordinates[formData.city]) {
//       const { lat, lng } = cityCoordinates[formData.city];
//       setMarkerPosition({ lat, lng });
//       setFormData(prev => ({
//         ...prev,
//         latitude: lat.toString(),
//         longitude: lng.toString()
//       }));
//     }
//   }, [formData.city]);

//   // Handle map click to update marker and coordinates.
//   const handleMapClick = (e) => {
//     const { lat, lng } = e.latlng;
//     setMarkerPosition({ lat, lng });
//     setFormData(prev => ({
//       ...prev,
//       latitude: lat.toString(),
//       longitude: lng.toString()
//     }));
//     toast({
//       title: 'Location Selected',
//       description: `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`,
//       status: 'info',
//       duration: 3000,
//       isClosable: true
//     });
//   };

//   // Function to handle location search using Nominatim API.
//   const handleSearch = async () => {
//     if (!searchQuery) return;
//     try {
//       const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`;
//       const res = await fetch(url);
//       const data = await res.json();
//       if (data && data.length > 0) {
//         const { lat, lon, display_name } = data[0];
//         const latitude = parseFloat(lat);
//         const longitude = parseFloat(lon);
//         setMarkerPosition({ lat: latitude, lng: longitude });
//         setFormData(prev => ({
//           ...prev,
//           latitude: lat.toString(),
//           longitude: lon.toString()
//         }));
//         toast({
//           title: 'Location Found',
//           description: `Found ${display_name}`,
//           status: 'success',
//           duration: 3000,
//           isClosable: true
//         });
//       } else {
//         toast({
//           title: 'Not Found',
//           description: 'No location found for your search query.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true
//         });
//       }
//     } catch (err) {
//       toast({
//         title: 'Error',
//         description: err.message,
//         status: 'error',
//         duration: 3000,
//         isClosable: true
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true); // Start loading/submitting state

//     const finalType = formData.structure_type === 'Other' ? formData.otherType : formData.structure_type;
//     const form = new FormData();

//     // Append all form fields to FormData
//     form.append('email', email);
//     form.append('project_title', formData.project_title);
//     form.append('area', formData.area);
//     form.append('city', formData.city);
//     form.append('state', formData.state);
//     form.append('country', formData.country);
//     form.append('structure_type', finalType);
//     form.append('structure_name', formData.structure_name);
//     form.append('latitude', formData.latitude);
//     form.append('longitude', formData.longitude);
//     form.append('structure_dimension', formData.structure_dimension); // Added
//     form.append('construction_material', formData.construction_material); // Added
//     form.append('construction_date', formData.construction_date); // Added

//     // Append files to FormData
//     for (let i = 0; i < projectImages.length; i++) {
//       form.append('project_images[]', projectImages[i]);
//     }

//     for (let i = 0; i < projectVideos.length; i++) {
//       form.append('project_videos[]', projectVideos[i]);
//     }

//     console.log('Form Data:', formData);

//     try {
//       const res = await fetch('https://spplindia.org/api/addProjects.php', {
//         method: 'POST',
//         body: form
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast({
//           title: 'Success',
//           description: data.message,
//           status: 'success',
//           duration: 4000,
//           isClosable: true

//         });
//         setTimeout(() => {
//           window.location.reload();
//         }, 1000);
//         setFormData({
//           project_title: '',
//           area: '',
//           city: '',
//           state: '',
//           country: '',
//           structure_type: '',
//           structure_name: '',
//           otherType: '',
//           latitude: '',
//           longitude: '',
//           structure_dimension: '',
//           construction_material: '',
//           construction_date: '',
//         });
//         setStructureImages([]);
//         setStructureVideo([]);
//         setShowForm(false);
//         window.location.reload();
//       } else {
//         toast({
//           title: 'Error',
//           description: data.error || 'Upload failed.',
//           status: 'error',
//           duration: 4000,
//           isClosable: true
//         });
//       }
//     } catch (err) {
//       toast({
//         title: 'Network error',
//         description: err.message,
//         status: 'error',
//         duration: 4000,
//         isClosable: true
//       });
//     } finally {
//       setIsSubmitting(false); // End loading/submitting state regardless of outcome
//     }
//   };

//   return (
//     <Box maxW="lg" p={2} borderRadius={"2xl"} overflowY="auto" height="60vh">
//       <Button
//         onClick={toggleForm}
//         colorScheme="teal"
//         textAlign="center"
//         alignItems="center"
//         fontSize="sm"
//         rightIcon={showForm ? <ChevronUpIcon /> : <ChevronDownIcon />}
//         w="auto"
//         display="flex"
//         mx="auto"
//         mb={4}
//       >
//         {showForm ? 'Hide Form' : 'Add Project'}
//       </Button>

//       <Collapse in={showForm}>
//         <Box p={4} borderWidth={1} borderRadius="2xl" boxShadow="lg" bg="white" height="100%">
//           <Heading mb={6} fontSize="xl" textAlign="center">Add New Project</Heading>
//           <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <VStack spacing={4}>
//               <FormControl isRequired>
//                 <FormLabel>Project Title</FormLabel>
//                 <Input
//                   name="project_title"
//                   value={formData.project_title}
//                   onChange={handleChange}
//                   placeholder="Enter text address"
//                 />
//               </FormControl>

//               <FormControl isRequired>
//                 <FormLabel>Area</FormLabel>
//                 <Input
//                   name="area"
//                   value={formData.area}
//                   onChange={handleChange}
//                   placeholder="Enter area"
//                 />
//               </FormControl>

//               <FormControl isRequired>
//                 <FormLabel>City</FormLabel>
//                 <Input
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   placeholder="Enter city (e.g., New York)"
//                 />
//               </FormControl>

//               <FormControl isRequired>
//                 <FormLabel>State</FormLabel>
//                 <Input
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   placeholder="Enter state"
//                 />
//               </FormControl>

//               <FormControl isRequired>
//                 <FormLabel>Country</FormLabel>
//                 <Select
//                   name="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   placeholder="Select country"
//                 >
//                   {countries.map((country, idx) => (
//                     <option key={idx} value={country}>{country}</option>
//                   ))}
//                 </Select>
//               </FormControl>

//               {/* Search input for location lookup */}
//               <HStack w="full">
//                 <Input
//                   placeholder="Search location (e.g., Delhi, Hauz Khas)"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <Button colorScheme="teal" fontSize="10px" onClick={handleSearch}>Search Location</Button>
//               </HStack>

//               <Button
//                 colorScheme="teal"
//                 onClick={() => setShowMap(!showMap)}
//                 w="full"
//               >
//                 {showMap ? 'Hide Map' : 'Select Coordinates via Map'}
//               </Button>

//               {showMap && (
//                 <Box w="full" h="400px" borderRadius="md" overflow="hidden">
//                   <MapContainer
//                     center={[markerPosition.lat, markerPosition.lng]}
//                     zoom={13}
//                     style={{ height: '100%', width: '100%' }}
//                   >
//                     <ChangeView center={[markerPosition.lat, markerPosition.lng]} zoom={13} />
//                     <TileLayer
//                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     <MapClickHandler onMapClick={handleMapClick} />
//                     <Marker position={[markerPosition.lat, markerPosition.lng]} />
//                   </MapContainer>
//                 </Box>
//               )}

//               <FormControl>
//                 <FormLabel>Latitude</FormLabel>
//                 <Input
//                   name="latitude"
//                   value={formData.latitude}
//                   onChange={handleChange}
//                   placeholder="Click on map or enter manually"
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Longitude</FormLabel>
//                 <Input
//                   name="longitude"
//                   value={formData.longitude}
//                   onChange={handleChange}
//                   placeholder="Click on map or enter manually"
//                 />
//               </FormControl>

//               <FormControl isRequired>
//                 <FormLabel>Structure Type</FormLabel>
//                 <Select
//                   name="structure_type"
//                   value={formData.structure_type}
//                   onChange={handleChange}
//                   placeholder="Select Structure Type"
//                 >
//                   <option>Bridge/Flyover</option>
//                   <option>Railways and Roadways</option>
//                   <option>Building</option>
//                   <option>Hydraulic Structure</option>
//                   <option>Communication and Power</option>
//                   <option>Critical Structure</option>
//                   <option>Prestressed Structure</option>
//                   <option>Refinery</option>
//                   <option>Under Ground Structure</option>
//                   <option value="Other">Other</option>
//                 </Select>
//               </FormControl>

//               {formData.structure_type === 'Other' && (
//                 <FormControl isRequired>
//                   <FormLabel>Specify Project Type</FormLabel>
//                   <Input
//                     name="otherType"
//                     value={formData.otherType}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//               )}

//               <FormControl isRequired>
//                 <FormLabel>Structure Name</FormLabel>
//                 <Input
//                   name="structure_name"
//                   value={formData.structure_name}
//                   onChange={handleChange}
//                 />
//               </FormControl>

//               <FormControl isRequired>
//                 <FormLabel>Structure Dimension</FormLabel>
//                 <Input
//                   name="structure_dimension"
//                   value={formData.structure_dimension}
//                   onChange={handleChange}
//                 />
//               </FormControl>

//               <FormControl isRequired>
//                 <FormLabel>Construction Material</FormLabel>
//                 <Input
//                   name="construction_material"
//                   value={formData.construction_material}
//                   onChange={handleChange}
//                 />
//               </FormControl>

//               <FormControl isRequired>
//                 <FormLabel>Structure Construction Date</FormLabel>
//                 <Input
//                   name="construction_date"
//                   value={formData.construction_date}
//                   onChange={handleChange}
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Structure Images</FormLabel>
//                 <Input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={(e) => setStructureImages([...e.target.files])}
//                   p={1}
//                 />
//               </FormControl>

//               {/* Video Upload Field */}
//               <FormControl>
//                 <FormLabel>Structure Video ( .mp4)</FormLabel>
//                 <Input
//                   type="file"
//                   multiple
//                   accept="video/*"
//                   onChange={(e) => setStructureVideo([...e.target.files])}
//                   p={1}
//                 />
//                 {projectVideos.length > 0 && (
//                   <Text fontSize="xs" mt={1} color="gray.600">
//                     {projectVideos.length} video{projectVideos.length !== 1 ? 's' : ''} selected
//                   </Text>
//                 )}
//               </FormControl>

//               <Button
//                 colorScheme="blue"
//                 type="submit"
//                 w="full"
//                 mt={4}
//                 isLoading={isSubmitting}
//                 loadingText="Submitting"
//                 spinner={<Spinner size="sm" color="white" />}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? 'Submitting...' : 'Submit Project'}
//               </Button>
//             </VStack>
//           </form>
//         </Box>
//       </Collapse>
//     </Box>
//   );
// };

// export default AddProjectDropdown;
// src/pages/AddProjectPage.jsx


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   VStack,
//   FormControl,
//   FormLabel,
//   Input,
//   Select,
//   Button,
//   Heading,
//   HStack,
//   Text,
//   useToast,
//   Spinner,
// } from '@chakra-ui/react';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useAuth } from "../components/AuthContext";
// import countries from '../api/Resources.js';

// // Leaflet icon fix
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// // Map view updater
// const ChangeView = ({ center, zoom }) => {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(center, zoom);
//   }, [center, zoom, map]);
//   return null;
// };

// // Map click handler
// const MapClickHandler = ({ onMapClick }) => {
//   useMapEvents({ click: (e) => onMapClick(e) });
//   return null;
// };

// // Preset cities
// const cityCoordinates = {
//   "New York": { lat: 40.7128, lng: -74.006 },
//   "Los Angeles": { lat: 34.0522, lng: -118.2437 },
//   "Chicago": { lat: 41.8781, lng: -87.6298 },
//   "Houston": { lat: 29.7604, lng: -95.3698 },
//   "Phoenix": { lat: 33.4484, lng: -112.074 },
// };

// const AddProjectPage = () => {
//   const { user } = useAuth();
//   const email = user?.email;
//   const toast = useToast();

//   const [formData, setFormData] = useState({
//     project_title: '',
//     area: '',
//     city: '',
//     state: '',
//     country: '',
//     structure_type: '',
//     structure_name: '',
//     otherType: '',
//     latitude: '',
//     longitude: '',
//     structure_dimension: '',
//     construction_material: '',
//     construction_date: '',
//   });

//   const [projectImages, setProjectImages] = useState([]);
//   const [projectVideos, setProjectVideos] = useState([]);
//   const [markerPosition, setMarkerPosition] = useState({ lat: 28.6139, lng: 77.209 });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showMap, setShowMap] = useState(true); // Always show map by default

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   useEffect(() => {
//     if (formData.city && cityCoordinates[formData.city]) {
//       const { lat, lng } = cityCoordinates[formData.city];
//       setMarkerPosition({ lat, lng });
//       setFormData(prev => ({ ...prev, latitude: lat.toString(), longitude: lng.toString() }));
//     }
//   }, [formData.city]);

//   const handleMapClick = (e) => {
//     const { lat, lng } = e.latlng;
//     setMarkerPosition({ lat, lng });
//     setFormData(prev => ({ ...prev, latitude: lat.toString(), longitude: lng.toString() }));
//     toast({
//       title: 'Location Selected',
//       description: `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`,
//       status: 'info',
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   const handleSearch = async () => {
//     if (!searchQuery) return;
//     try {
//       const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
//       const data = await res.json();
//       if (data.length > 0) {
//         const { lat, lon, display_name } = data[0];
//         setMarkerPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
//         setFormData(prev => ({ ...prev, latitude: lat.toString(), longitude: lon.toString() }));
//         toast({ title: 'Location Found', description: display_name, status: 'success', duration: 3000, isClosable: true });
//       }
//     } catch (err) {
//       toast({ title: 'Error', description: err.message, status: 'error', duration: 3000, isClosable: true });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     const finalType = formData.structure_type === 'Other' ? formData.otherType : formData.structure_type;

//     const form = new FormData();
//     form.append('email', email);
//     Object.entries({ ...formData, structure_type: finalType }).forEach(([key, val]) => form.append(key, val));

//     projectImages.forEach(file => form.append('project_images[]', file));
//     projectVideos.forEach(file => form.append('project_videos[]', file));

//     try {
//       const res = await fetch('https://spplindia.org/api/addProjects.php', { method: 'POST', body: form });
//       const data = await res.json();
//       if (res.ok) {
//         toast({ title: 'Success', description: data.message, status: 'success', duration: 4000, isClosable: true });
//         setFormData({
//           project_title: '',
//           area: '',
//           city: '',
//           state: '',
//           country: '',
//           structure_type: '',
//           structure_name: '',
//           otherType: '',
//           latitude: '',
//           longitude: '',
//           structure_dimension: '',
//           construction_material: '',
//           construction_date: '',
//         });
//         setProjectImages([]);
//         setProjectVideos([]);
//       } else {
//         toast({ title: 'Error', description: data.error || 'Upload failed.', status: 'error', duration: 4000, isClosable: true });
//       }
//     } catch (err) {
//       toast({ title: 'Network error', description: err.message, status: 'error', duration: 4000, isClosable: true });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Theme colors
//   const colors = { main: '#FFC107', black: '#000', white: '#FFF' };

//   return (
//     <Box maxW="3xl" mx="auto" p={6} borderRadius="2xl" bg={colors.black} color={colors.white}>
//       <Heading mb={6} textAlign="center" color={colors.main}>Add New Project</Heading>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <VStack spacing={4}>
//           {/* Project Title */}
//           <FormControl isRequired>
//             <FormLabel>Project Title</FormLabel>
//             <Input name="project_title" value={formData.project_title} onChange={handleChange} bg={colors.white} color={colors.black} />
//           </FormControl>

//           {/* Area */}
//           <FormControl isRequired>
//             <FormLabel>Area</FormLabel>
//             <Input name="area" value={formData.area} onChange={handleChange} bg={colors.white} color={colors.black} />
//           </FormControl>

//           {/* City */}
//           <FormControl isRequired>
//             <FormLabel>City</FormLabel>
//             <Input name="city" value={formData.city} onChange={handleChange} bg={colors.white} color={colors.black} />
//           </FormControl>

//           {/* State */}
//           <FormControl isRequired>
//             <FormLabel>State</FormLabel>
//             <Input name="state" value={formData.state} onChange={handleChange} bg={colors.white} color={colors.black} />
//           </FormControl>

//           {/* Country */}
//           <FormControl isRequired>
//             <FormLabel>Country</FormLabel>
//             <Select name="country" value={formData.country} onChange={handleChange} bg={colors.white} color={colors.black}>
//               {countries.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
//             </Select>
//           </FormControl>

//           {/* Location search */}
//           <HStack w="full">
//             <Input placeholder="Search location" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} bg={colors.white} color={colors.black} />
//             <Button colorScheme="yellow" onClick={handleSearch}>Search</Button>
//           </HStack>

//           {/* Map */}
//           {showMap && (
//             <Box w="full" h="400px" borderRadius="md" overflow="hidden">
//               <MapContainer center={[markerPosition.lat, markerPosition.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
//                 <ChangeView center={[markerPosition.lat, markerPosition.lng]} zoom={13} />
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <MapClickHandler onMapClick={handleMapClick} />
//                 <Marker position={[markerPosition.lat, markerPosition.lng]} />
//               </MapContainer>
//             </Box>
//           )}

//           {/* Latitude/Longitude */}
//           <FormControl>
//             <FormLabel>Latitude</FormLabel>
//             <Input name="latitude" value={formData.latitude} onChange={handleChange} bg={colors.white} color={colors.black} />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Longitude</FormLabel>
//             <Input name="longitude" value={formData.longitude} onChange={handleChange} bg={colors.white} color={colors.black} />
//           </FormControl>

//           {/* Structure Type */}
//           <FormControl isRequired>
//             <FormLabel>Structure Type</FormLabel>
//             <Select name="structure_type" value={formData.structure_type} onChange={handleChange} bg={colors.white} color={colors.black}>
//               <option>Bridge/Flyover</option>
//               <option>Railways and Roadways</option>
//               <option>Building</option>
//               <option>Hydraulic Structure</option>
//               <option>Communication and Power</option>
//               <option>Critical Structure</option>
//               <option>Prestressed Structure</option>
//               <option>Refinery</option>
//               <option>Under Ground Structure</option>
//               <option value="Other">Other</option>
//             </Select>
//           </FormControl>

//           {formData.structure_type === 'Other' && (
//             <FormControl isRequired>
//               <FormLabel>Specify Project Type</FormLabel>
//               <Input name="otherType" value={formData.otherType} onChange={handleChange} bg={colors.white} color={colors.black} />
//             </FormControl>
//           )}

//           {/* Structure Name */}
//           <FormControl isRequired>
//             <FormLabel>Structure Name</FormLabel>
//             <Input name="structure_name" value={formData.structure_name} onChange={handleChange} bg={colors.white} color={colors.black} />
//           </FormControl>

//           {/* Structure Dimension */}
//           <FormControl isRequired>
//             <FormLabel>Structure Dimension</FormLabel>
//             <Input name="structure_dimension" value={formData.structure_dimension} onChange={handleChange} bg={colors.white} color={colors.black} />
//           </FormControl>

//           {/* Construction Material */}
//           <FormControl isRequired>
//             <FormLabel>Construction Material</FormLabel>
//             <Input name="construction_material" value={formData.construction_material} onChange={handleChange} bg={colors.white} color={colors.black} />
//           </FormControl>

//           {/* Construction Date */}
//           <FormControl isRequired>
//             <FormLabel>Construction Date</FormLabel>
//             <Input name="construction_date" value={formData.construction_date} onChange={handleChange} type="date" bg={colors.white} color={colors.black} />
//           </FormControl>

//           {/* File Upload */}
//           <FormControl>
//             <FormLabel>Structure Images</FormLabel>
//             <Input type="file" multiple accept="image/*" onChange={e => setProjectImages([...e.target.files])} />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Structure Videos</FormLabel>
//             <Input type="file" multiple accept="video/*" onChange={e => setProjectVideos([...e.target.files])} />
//             {projectVideos.length > 0 && <Text fontSize="xs">{projectVideos.length} video(s) selected</Text>}
//           </FormControl>

//           {/* Submit */}
//           <Button
//             colorScheme="yellow"
//             type="submit"
//             w="full"
//             mt={4}
//             isLoading={isSubmitting}
//             loadingText="Submitting"
//             spinner={<Spinner size="sm" />}
//           >
//             Submit Project
//           </Button>
//         </VStack>
//       </form>
//     </Box>
//   );
// };

// export default AddProjectPage;
// src/pages/AddProjectPage.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   VStack,
//   Heading,
//   Select,
//   HStack,
//   Text,
//   Spinner,
//   useToast
// } from '@chakra-ui/react';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useAuth } from "../components/AuthContext";
// import countries from '../api/Resources.js';

// // Fix Leaflet marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// // Update map view when marker changes
// const ChangeView = ({ center, zoom }) => {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(center, zoom);
//   }, [center, zoom, map]);
//   return null;
// };

// // Handle map click
// const MapClickHandler = ({ onMapClick }) => {
//   useMapEvents({
//     click: (e) => onMapClick(e),
//   });
//   return null;
// };

// // Preset coordinates for cities
// const cityCoordinates = {
//   "New York": { lat: 40.7128, lng: -74.0060 },
//   "Los Angeles": { lat: 34.0522, lng: -118.2437 },
//   "Chicago": { lat: 41.8781, lng: -87.6298 },
//   "Houston": { lat: 29.7604, lng: -95.3698 },
//   "Phoenix": { lat: 33.4484, lng: -112.0740 }
// };

// const AddProjectPage = () => {
//   const { user } = useAuth();
//   const email = user?.email;
//   const toast = useToast();

//   const [formData, setFormData] = useState({
//     project_title: '',
//     area: '',
//     city: '',
//     state: '',
//     country: '',
//     structure_type: '',
//     structure_name: '',
//     otherType: '',
//     latitude: '',
//     longitude: '',
//     structure_dimension: '',
//     construction_material: '',
//     construction_date: '',
//   });

//   const [projectImages, setStructureImages] = useState([]);
//   const [projectVideos, setStructureVideo] = useState([]);
//   const [showMap, setShowMap] = useState(false);
//   const [markerPosition, setMarkerPosition] = useState({ lat: 28.6139, lng: 77.209 });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // Update marker based on selected city
//   useEffect(() => {
//     if (formData.city && cityCoordinates[formData.city]) {
//       const { lat, lng } = cityCoordinates[formData.city];
//       setMarkerPosition({ lat, lng });
//       setFormData(prev => ({ ...prev, latitude: lat.toString(), longitude: lng.toString() }));
//     }
//   }, [formData.city]);

//   const handleMapClick = (e) => {
//     const { lat, lng } = e.latlng;
//     setMarkerPosition({ lat, lng });
//     setFormData(prev => ({ ...prev, latitude: lat.toString(), longitude: lng.toString() }));
//     toast({
//       title: 'Location Selected',
//       description: `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`,
//       status: 'info',
//       duration: 3000,
//       isClosable: true
//     });
//   };

//   const handleSearch = async () => {
//     if (!searchQuery) return;
//     try {
//       const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
//       const data = await res.json();
//       if (data.length > 0) {
//         const { lat, lon, display_name } = data[0];
//         setMarkerPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
//         setFormData(prev => ({ ...prev, latitude: lat.toString(), longitude: lon.toString() }));
//         toast({
//           title: 'Location Found',
//           description: display_name,
//           status: 'success',
//           duration: 3000,
//           isClosable: true
//         });
//       } else {
//         toast({ title: 'Not Found', description: 'No location found', status: 'error', duration: 3000, isClosable: true });
//       }
//     } catch (err) {
//       toast({ title: 'Error', description: err.message, status: 'error', duration: 3000, isClosable: true });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const finalType = formData.structure_type === 'Other' ? formData.otherType : formData.structure_type;
//     const form = new FormData();

//     // Append all fields
//     Object.entries({ ...formData, structure_type: finalType, email }).forEach(([key, value]) => form.append(key, value));
//     projectImages.forEach(file => form.append('project_images[]', file));
//     projectVideos.forEach(file => form.append('project_videos[]', file));

//     try {
//       const res = await fetch('https://spplindia.org/api/addProjects.php', { method: 'POST', body: form });
//       const data = await res.json();

//       if (res.ok) {
//         toast({ title: 'Success', description: data.message, status: 'success', duration: 4000, isClosable: true });
//         setFormData({ project_title: '', area: '', city: '', state: '', country: '', structure_type: '', structure_name: '', otherType: '', latitude: '', longitude: '', structure_dimension: '', construction_material: '', construction_date: '' });
//         setStructureImages([]);
//         setStructureVideo([]);
//       } else {
//         toast({ title: 'Error', description: data.error || 'Upload failed', status: 'error', duration: 4000, isClosable: true });
//       }
//     } catch (err) {
//       toast({ title: 'Network Error', description: err.message, status: 'error', duration: 4000, isClosable: true });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Box
//       w="100vw"
//       h="100vh"
//       p={6}
//       bg="black"
//       color="white"
//       overflowY="auto"
//     >
//       <Heading mb={6} textAlign="center" color="yellow.400">Add New Project</Heading>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <VStack spacing={4} align="stretch">
//           <FormControl isRequired>
//             <FormLabel>Project Title</FormLabel>
//             <Input name="project_title" value={formData.project_title} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Area</FormLabel>
//             <Input name="area" value={formData.area} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>City</FormLabel>
//             <Input name="city" value={formData.city} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>State</FormLabel>
//             <Input name="state" value={formData.state} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Country</FormLabel>
//             <Select name="country" value={formData.country} onChange={handleChange} bg="gray.900" color="white" placeholder="Select country">
//               {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
//             </Select>
//           </FormControl>

//           <HStack w="full">
//             <Input placeholder="Search location" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} bg="gray.900" color="white" />
//             <Button colorScheme="yellow" onClick={handleSearch}>Search</Button>
//           </HStack>

//           <Button colorScheme="yellow" onClick={() => setShowMap(!showMap)}>
//             {showMap ? 'Hide Map' : 'Select Location on Map'}
//           </Button>

//           {showMap && (
//             <Box w="full" h="400px" borderRadius="md" overflow="hidden">
//               <MapContainer center={[markerPosition.lat, markerPosition.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
//                 <ChangeView center={[markerPosition.lat, markerPosition.lng]} zoom={13} />
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <MapClickHandler onMapClick={handleMapClick} />
//                 <Marker position={[markerPosition.lat, markerPosition.lng]} />
//               </MapContainer>
//             </Box>
//           )}

//           <FormControl>
//             <FormLabel>Latitude</FormLabel>
//             <Input name="latitude" value={formData.latitude} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Longitude</FormLabel>
//             <Input name="longitude" value={formData.longitude} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Structure Type</FormLabel>
//             <Select name="structure_type" value={formData.structure_type} onChange={handleChange} bg="gray.900" color="white" placeholder="Select Type">
//               <option>Bridge/Flyover</option>
//               <option>Railways and Roadways</option>
//               <option>Building</option>
//               <option>Hydraulic Structure</option>
//               <option>Communication and Power</option>
//               <option>Critical Structure</option>
//               <option>Prestressed Structure</option>
//               <option>Refinery</option>
//               <option>Under Ground Structure</option>
//               <option value="Other">Other</option>
//             </Select>
//           </FormControl>

//           {formData.structure_type === 'Other' && (
//             <FormControl isRequired>
//               <FormLabel>Specify Type</FormLabel>
//               <Input name="otherType" value={formData.otherType} onChange={handleChange} bg="gray.900" color="white" />
//             </FormControl>
//           )}

//           <FormControl isRequired>
//             <FormLabel>Structure Name</FormLabel>
//             <Input name="structure_name" value={formData.structure_name} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Structure Dimension</FormLabel>
//             <Input name="structure_dimension" value={formData.structure_dimension} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Construction Material</FormLabel>
//             <Input name="construction_material" value={formData.construction_material} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Construction Date</FormLabel>
//             <Input name="construction_date" type="date" value={formData.construction_date} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Project Images</FormLabel>
//             <Input type="file" multiple accept="image/*" onChange={(e) => setStructureImages([...e.target.files])} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Project Videos</FormLabel>
//             <Input type="file" multiple accept="video/*" onChange={(e) => setStructureVideo([...e.target.files])} bg="gray.900" color="white" />
//             {projectVideos.length > 0 && <Text fontSize="xs">{projectVideos.length} video(s) selected</Text>}
//           </FormControl>

//           <Button colorScheme="yellow" type="submit" w="full" mt={4} isLoading={isSubmitting} spinner={<Spinner size="sm" />}>
//             Submit Project
//           </Button>
//         </VStack>
//       </form>
//     </Box>
//   );
// };

// export default AddProjectPage;

// src/pages/AddProjectPage.jsx


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   VStack,
//   Heading,
//   Select,
//   HStack,
//   Text,
//   Spinner,
//   useToast
// } from '@chakra-ui/react';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useAuth } from "../components/AuthContext";
// import countries from '../api/Resources.js';

// // Fix Leaflet marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// // Update map view when marker changes
// const ChangeView = ({ center, zoom }) => {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(center, zoom);
//   }, [center, zoom, map]);
//   return null;
// };

// // Handle map click
// const MapClickHandler = ({ onMapClick }) => {
//   useMapEvents({
//     click: (e) => onMapClick(e),
//   });
//   return null;
// };

// // Preset coordinates for cities
// const cityCoordinates = {
//   "New York": { lat: 40.7128, lng: -74.0060 },
//   "Los Angeles": { lat: 34.0522, lng: -118.2437 },
//   "Chicago": { lat: 41.8781, lng: -87.6298 },
//   "Houston": { lat: 29.7604, lng: -95.3698 },
//   "Phoenix": { lat: 33.4484, lng: -112.0740 }
// };

// const AddProjectPage = () => {
//   const { user } = useAuth();
//   const email = user?.email;
//   const toast = useToast();

//   const [formData, setFormData] = useState({
//     project_title: '',
//     area: '',
//     city: '',
//     state: '',
//     country: '',
//     structure_type: '',
//     structure_name: '',
//     otherType: '',
//     latitude: '',
//     longitude: '',
//     structure_dimension: '',
//     construction_material: '',
//     construction_date: '',
//   });

//   const [projectImages, setStructureImages] = useState([]);
//   const [projectVideos, setStructureVideo] = useState([]);
//   const [showMap, setShowMap] = useState(false);
//   const [markerPosition, setMarkerPosition] = useState({ lat: 28.6139, lng: 77.209 });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   useEffect(() => {
//     if (formData.city && cityCoordinates[formData.city]) {
//       const { lat, lng } = cityCoordinates[formData.city];
//       setMarkerPosition({ lat, lng });
//       setFormData(prev => ({ ...prev, latitude: lat.toString(), longitude: lng.toString() }));
//     }
//   }, [formData.city]);

//   const handleMapClick = (e) => {
//     const { lat, lng } = e.latlng;
//     setMarkerPosition({ lat, lng });
//     setFormData(prev => ({ ...prev, latitude: lat.toString(), longitude: lng.toString() }));
//     toast({
//       title: 'Location Selected',
//       description: `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`,
//       status: 'info',
//       duration: 3000,
//       isClosable: true
//     });
//   };

//   const handleSearch = async () => {
//     if (!searchQuery) return;
//     try {
//       const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
//       const data = await res.json();
//       if (data.length > 0) {
//         const { lat, lon, display_name } = data[0];
//         setMarkerPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
//         setFormData(prev => ({ ...prev, latitude: lat.toString(), longitude: lon.toString() }));
//         toast({
//           title: 'Location Found',
//           description: display_name,
//           status: 'success',
//           duration: 3000,
//           isClosable: true
//         });
//       } else {
//         toast({ title: 'Not Found', description: 'No location found', status: 'error', duration: 3000, isClosable: true });
//       }
//     } catch (err) {
//       toast({ title: 'Error', description: err.message, status: 'error', duration: 3000, isClosable: true });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const finalType = formData.structure_type === 'Other' ? formData.otherType : formData.structure_type;
//     const form = new FormData();

//     Object.entries({ ...formData, structure_type: finalType, email }).forEach(([key, value]) => form.append(key, value));
//     projectImages.forEach(file => form.append('project_images[]', file));
//     projectVideos.forEach(file => form.append('project_videos[]', file));

//     try {
//       const res = await fetch('https://spplindia.org/api/addProjects.php', { method: 'POST', body: form });
//       const data = await res.json();

//       if (res.ok) {
//         toast({ title: 'Success', description: data.message, status: 'success', duration: 4000, isClosable: true });
//         setFormData({ project_title: '', area: '', city: '', state: '', country: '', structure_type: '', structure_name: '', otherType: '', latitude: '', longitude: '', structure_dimension: '', construction_material: '', construction_date: '' });
//         setStructureImages([]);
//         setStructureVideo([]);
//       } else {
//         toast({ title: 'Error', description: data.error || 'Upload failed', status: 'error', duration: 4000, isClosable: true });
//       }
//     } catch (err) {
//       toast({ title: 'Network Error', description: err.message, status: 'error', duration: 4000, isClosable: true });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Box
//       flex="1"
//       p={6}
//       bg="black"
//       color="white"
//       overflowY="auto"
//       minH="0" // important for flex container
//     >
//       <Heading mb={6} textAlign="center" color="yellow.400">Add New Project</Heading>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <VStack spacing={4} align="stretch">
//           <FormControl isRequired>
//             <FormLabel>Project Title</FormLabel>
//             <Input name="project_title" value={formData.project_title} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Area</FormLabel>
//             <Input name="area" value={formData.area} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>City</FormLabel>
//             <Input name="city" value={formData.city} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>State</FormLabel>
//             <Input name="state" value={formData.state} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Country</FormLabel>
//             <Select name="country" value={formData.country} onChange={handleChange} bg="gray.900" color="white" placeholder="Select country">
//               {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
//             </Select>
//           </FormControl>

//           <HStack w="full">
//             <Input placeholder="Search location" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} bg="gray.900" color="white" />
//             <Button colorScheme="yellow" onClick={handleSearch}>Search</Button>
//           </HStack>

//           <Button colorScheme="yellow" onClick={() => setShowMap(!showMap)}>
//             {showMap ? 'Hide Map' : 'Select Location on Map'}
//           </Button>

//           {showMap && (
//             <Box w="full" h="300px" borderRadius="md" overflow="hidden">
//               <MapContainer center={[markerPosition.lat, markerPosition.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
//                 <ChangeView center={[markerPosition.lat, markerPosition.lng]} zoom={13} />
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <MapClickHandler onMapClick={handleMapClick} />
//                 <Marker position={[markerPosition.lat, markerPosition.lng]} />
//               </MapContainer>
//             </Box>
//           )}

//           {/* Other form controls... (Structure Type, Name, Dimension, etc.) */}
//           <FormControl isRequired>
//             <FormLabel>Structure Type</FormLabel>
//             <Select name="structure_type" value={formData.structure_type} onChange={handleChange} bg="gray.900" color="white" placeholder="Select Type">
//               <option>Bridge/Flyover</option>
//               <option>Railways and Roadways</option>
//               <option>Building</option>
//               <option>Hydraulic Structure</option>
//               <option>Communication and Power</option>
//               <option>Critical Structure</option>
//               <option>Prestressed Structure</option>
//               <option>Refinery</option>
//               <option>Under Ground Structure</option>
//               <option value="Other">Other</option>
//             </Select>
//           </FormControl>

//           {formData.structure_type === 'Other' && (
//             <FormControl isRequired>
//               <FormLabel>Specify Type</FormLabel>
//               <Input name="otherType" value={formData.otherType} onChange={handleChange} bg="gray.900" color="white" />
//             </FormControl>
//           )}

//           {/* Remaining fields like Name, Dimension, Material, Date, Images, Videos */}
//           <FormControl isRequired>
//             <FormLabel>Structure Name</FormLabel>
//             <Input name="structure_name" value={formData.structure_name} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Structure Dimension</FormLabel>
//             <Input name="structure_dimension" value={formData.structure_dimension} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Construction Material</FormLabel>
//             <Input name="construction_material" value={formData.construction_material} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Construction Date</FormLabel>
//             <Input name="construction_date" type="date" value={formData.construction_date} onChange={handleChange} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Project Images</FormLabel>
//             <Input type="file" multiple accept="image/*" onChange={(e) => setStructureImages([...e.target.files])} bg="gray.900" color="white" />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Project Videos</FormLabel>
//             <Input type="file" multiple accept="video/*" onChange={(e) => setStructureVideo([...e.target.files])} bg="gray.900" color="white" />
//             {projectVideos.length > 0 && <Text fontSize="xs">{projectVideos.length} video(s) selected</Text>}
//           </FormControl>

//           <Button colorScheme="yellow" type="submit" w="full" mt={4} isLoading={isSubmitting} spinner={<Spinner size="sm" />}>
//             Submit Project
//           </Button>
//         </VStack>
//       </form>
//     </Box>
//   );
// };

// export default AddProjectPage;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Heading,
  Select,
  HStack,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from "../components/AuthContext";
import countries from '../api/Resources.js';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Map view update
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Map click handler
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => onMapClick(e),
  });
  return null;
};

// Preset city coordinates
const cityCoordinates = {
  "New York": { lat: 40.7128, lng: -74.0060 },
  "Los Angeles": { lat: 34.0522, lng: -118.2437 },
  "Chicago": { lat: 41.8781, lng: -87.6298 },
  "Houston": { lat: 29.7604, lng: -95.3698 },
  "Phoenix": { lat: 33.4484, lng: -112.0740 },
};

// Color palette
const palette = {
  yellow: '#FFD700',
  black: '#000000',
  white: '#FFFFFF',
  dark: 'rgba(0,0,0,0.6)',
};

const AddProjectDropdown = () => {
  const { user } = useAuth();
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
    structure_dimension: '',
    construction_material: '',
    construction_date: '',
  });

  const [projectImages, setStructureImages] = useState([]);
  const [projectVideos, setStructureVideo] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState({ lat: 28.6139, lng: 77.209 });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (formData.city && cityCoordinates[formData.city]) {
      const { lat, lng } = cityCoordinates[formData.city];
      setMarkerPosition({ lat, lng });
      setFormData(prev => ({
        ...prev,
        latitude: lat.toString(),
        longitude: lng.toString(),
      }));
    }
  }, [formData.city]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition({ lat, lng });
    setFormData(prev => ({
      ...prev,
      latitude: lat.toString(),
      longitude: lng.toString(),
    }));
    toast({
      title: 'Location Selected',
      description: `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setMarkerPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
        setFormData(prev => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lon.toString(),
        }));
        toast({
          title: 'Location Found',
          description: `Found ${display_name}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Not Found',
          description: 'No location found for your search query.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({ title: 'Error', description: err.message, status: 'error', duration: 3000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalType = formData.structure_type === 'Other' ? formData.otherType : formData.structure_type;
    const form = new FormData();

    form.append('email', email);
    Object.keys(formData).forEach(key => {
      if (key !== 'otherType') form.append(key, formData[key]);
    });
    form.append('structure_type', finalType);

    projectImages.forEach(file => form.append('project_images[]', file));
    projectVideos.forEach(file => form.append('project_videos[]', file));

    try {
      const res = await fetch('https://spplindia.org/api/addProjects.php', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: 'Success', description: data.message, status: 'success', duration: 3000 });
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
        setShowMap(false);
      } else {
        toast({ title: 'Error', description: data.error || 'Upload failed.', status: 'error', duration: 3000 });
      }
    } catch (err) {
      toast({ title: 'Network error', description: err.message, status: 'error', duration: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex
      w="full"
      h="full"
      justify="center"
      align="center"
      bg={palette.dark}
      backdropFilter="blur(6px)"
      p={4}
      overflowY="auto"
    >
      <Box
        w="full"
        h="full"
        maxH="100vh"
        overflowY="auto"
        bg={palette.white}
        color={palette.black}
        borderRadius="2xl"
        p={6}
        boxShadow="xl"
      >
        <Heading textAlign="center" mb={6} color={palette.yellow} fontSize="2xl">
          Add New Project
        </Heading>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <VStack spacing={4} align="stretch">
            {/* Project Title */}
            <FormControl isRequired>
              <FormLabel>Project Title</FormLabel>
              <Input name="project_title" value={formData.project_title} onChange={handleChange} placeholder="Enter Project Title" />
            </FormControl>

            {/* Area */}
            <FormControl isRequired>
              <FormLabel>Area</FormLabel>
              <Input name="area" value={formData.area} onChange={handleChange} placeholder="Enter Area" />
            </FormControl>

            {/* City */}
            <FormControl isRequired>
              <FormLabel>City</FormLabel>
              <Input name="city" value={formData.city} onChange={handleChange} placeholder="Enter City" />
            </FormControl>

            {/* State */}
            <FormControl isRequired>
              <FormLabel>State</FormLabel>
              <Input name="state" value={formData.state} onChange={handleChange} placeholder="Enter State" />
            </FormControl>

            {/* Country */}
            <FormControl isRequired>
              <FormLabel>Country</FormLabel>
              <Select name="country" value={formData.country} onChange={handleChange} placeholder="Select Country">
                {countries.map((country, idx) => (
                  <option key={idx} value={country}>{country}</option>
                ))}
              </Select>
            </FormControl>

            {/* Map & Coordinates */}
            <HStack>
              <Input placeholder="Search location..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <Button colorScheme="yellow" size="sm" onClick={handleSearch}>Search</Button>
            </HStack>

            <Button colorScheme="yellow" w="full" onClick={() => setShowMap(!showMap)}>
              {showMap ? 'Hide Map' : 'Select Coordinates via Map'}
            </Button>

            {showMap && (
              <Box w="full" h="300px" borderRadius="md" overflow="hidden">
                <MapContainer center={[markerPosition.lat, markerPosition.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <ChangeView center={[markerPosition.lat, markerPosition.lng]} zoom={13} />
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MapClickHandler onMapClick={handleMapClick} />
                  <Marker position={[markerPosition.lat, markerPosition.lng]} />
                </MapContainer>
              </Box>
            )}

            {/* Latitude & Longitude */}
            <FormControl>
              <FormLabel>Latitude</FormLabel>
              <Input name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" />
            </FormControl>
            <FormControl>
              <FormLabel>Longitude</FormLabel>
              <Input name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" />
            </FormControl>

            {/* Structure Type */}
            <FormControl isRequired>
              <FormLabel>Structure Type</FormLabel>
              <Select name="structure_type" value={formData.structure_type} onChange={handleChange} placeholder="Select Type">
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
                <Input name="otherType" value={formData.otherType} onChange={handleChange} />
              </FormControl>
            )}

            <FormControl isRequired>
              <FormLabel>Structure Name</FormLabel>
              <Input name="structure_name" value={formData.structure_name} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Structure Dimension</FormLabel>
              <Input name="structure_dimension" value={formData.structure_dimension} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Construction Material</FormLabel>
              <Input name="construction_material" value={formData.construction_material} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Construction Date</FormLabel>
              <Input name="construction_date" type="date" value={formData.construction_date} onChange={handleChange} />
            </FormControl>

            {/* Images & Videos */}
            <FormControl>
              <FormLabel>Structure Images</FormLabel>
              <Input type="file" multiple accept="image/*" onChange={(e) => setStructureImages([...e.target.files])} />
            </FormControl>

            <FormControl>
              <FormLabel>Structure Videos</FormLabel>
              <Input type="file" multiple accept="video/*" onChange={(e) => setStructureVideo([...e.target.files])} />
              {projectVideos.length > 0 && <Text fontSize="xs">{projectVideos.length} video(s) selected</Text>}
            </FormControl>

            <Button colorScheme="yellow" w="full" type="submit" isLoading={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Project'}
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default AddProjectDropdown;



