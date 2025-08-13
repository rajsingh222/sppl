// import React, { useEffect, useState } from 'react';
// import {
//     Box,
//     Heading,
//     Text,
//     Image,
//     Flex,
//     Divider,
//     List,
//     ListItem,
//     Spinner
// } from '@chakra-ui/react';
// import { LuUpload, LuMapPin, LuCalendar, LuBuilding, LuRuler } from 'react-icons/lu';
// import { SiMaterialdesignicons } from "react-icons/si";
// import { RiBuilding2Fill } from "react-icons/ri";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { icon } from 'leaflet';
// import { useAuth } from '../components/AuthContext';
// import WeatherCard from '../components/WeatherCard';
// const DefaultIcon = icon({
//     iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41]
// });
// const Project = () => {
//     const { user } = useAuth();
//     const [project, setProject] = useState(null);
//     useEffect(() => {
//         if (user) {
//             const projects = user.project || [];
//             const currentProject = user.currentProject;
//             const foundProject = projects.find((p) => p.id === currentProject);
//             setProject(foundProject);
//         }
//     }, [user]);

//     if (!user || !project) {
//         return (
//             <Box width="full" height="90vh" display="flex" justifyContent="center" alignItems="center">
//                 <Spinner size="xl" />
//             </Box>
//         );
//     }

//     function parseUrlString(str) {
//         try {
//             // Remove extra backslashes if present
//             const cleanStr = str.replace(/\\/g, '');
//             return JSON.parse(cleanStr);
//         } catch (error) {
//             console.error('Error parsing URL string:', error);
//             return [];
//         }
//     }
//     const structureData = {
//         name: project.structure_name,
//         location: `${project.area}, ${project.city}, ${project.country}`,
//         constructionDate: project.construction_date,
//         type: project.project_type,
//         coordinates: [project.latitude, project.longitude],
//         images: parseUrlString(project.project_images),
//         dimension: project.structure_dimension,
//         material:project.construction_material,
//     };


//     console.log("Project: ", project);
//     console.log("Structure Data: ", structureData.images);
//     return (
//         <Box p={4} bg="gray.100" height="90vh" width='full' overflowY='auto' display="flex" flexDirection="column">
//             <Heading mb={3} color="blue.800" textAlign="center" fontSize="lg">
//                 Structure Details
//             </Heading>
//             <Box
//                 width="full"
//                 display="flex"
//                 flexDirection="row"
//                 justifyContent="space-evenly"
//                 height="95%"
//             >
//                 <Box
//                     display="flex"
//                     flexDirection="column"
//                     justifyContent="space-evenly"
//                     width="50%"
//                 >

//                     <Box
//                         display="flex"
//                         flexDirection="row"
//                         justifyContent="space-evenly"
//                         width="full"
//                         height="45%"
//                         gap={4}
//                     >
//                         <Box p={3} borderRadius="xl" boxShadow="2xl" mb={4} width="50%" height="100%" bg="#f3f3f3">
//                             <Heading size="sm" mb={2} color="blue.800">
//                                 Location Map
//                             </Heading>
//                             <Box h="231px" borderRadius="lg" overflow="hidden" >
//                                 <MapContainer
//                                     center={structureData.coordinates}
//                                     zoom={13}
//                                     style={{ height: '100%', width: '100%' }}
//                                 >
//                                     <TileLayer
//                                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                         attribution='&copy; OpenStreetMap contributors'
//                                     />
//                                     <Marker position={structureData.coordinates} icon={DefaultIcon}>
//                                         <Popup>{structureData.name}</Popup>
//                                     </Marker>
//                                 </MapContainer>
//                             </Box>
//                         </Box>
//                         <Box
//                             height="100%"
//                             width="50%"
//                             // boxShadow="xl"
//                             borderRadius="lg"
//                         >
//                             <WeatherCard city={project.city} />
//                         </Box>

//                     </Box>
//                     <Box bg="white" p={3} borderRadius="xl" boxShadow="lg">
//                         <Heading size="sm" mb={2} color="blue.800">
//                             Structure Images
//                         </Heading>
//                         <Flex
//                             direction="column"
//                             h="250px"
//                             overflowY="auto"
//                             gap={1}
//                             px={10}
//                             mx='auto'
//                         >
//                             {structureData.images.map((img, index) => (
//                                 <Box
//                                     key={index}
//                                     borderRadius="lg"
//                                     overflow="hidden"
//                                     flexShrink={0}
//                                 >
//                                     <Image
//                                         src={img}
//                                         alt={`Structure ${index + 1}`}
//                                         objectFit="cover"
//                                         w="100%"
//                                         h="100%"
//                                         borderRadius="lg"
//                                     />
//                                 </Box>
//                             ))}
//                         </Flex>
//                     </Box>

//                 </Box>
//                 <Box bg="white" p={6} borderRadius="xl" boxShadow="lg" width="45%" ml={4}>
//                     <List spacing={6}>
//                         <ListItem>
//                             <Flex align="center">
//                                 <LuBuilding size={20} color="#2B6CB0" />
//                                 <Box ml={3}>
//                                     <Text fontWeight="bold" color="gray.600" fontSize="sm">
//                                         Structure Name
//                                     </Text>
//                                     <Text fontSize="md">{structureData.name}</Text>
//                                 </Box>
//                             </Flex>
//                         </ListItem>

//                         <Divider my={2} />

//                         <ListItem>
//                             <Flex align="center">
//                                 <LuMapPin size={20} color="#2B6CB0" />
//                                 <Box ml={3}>
//                                     <Text fontWeight="bold" color="gray.600" fontSize="sm">
//                                         Location
//                                     </Text>
//                                     <Text fontSize="md">{structureData.location}</Text>
//                                 </Box>
//                             </Flex>
//                         </ListItem>

//                         <Divider my={2} />

//                         <ListItem>
//                             <Flex align="center">
//                                 <LuCalendar size={20} color="#2B6CB0" />
//                                 <Box ml={3}>
//                                     <Text fontWeight="bold" color="gray.600" fontSize="sm">
//                                         Construction Completion Date
//                                     </Text>
//                                     <Text fontSize="md">
//                                         {new Date(structureData.constructionDate).toLocaleDateString()}
//                                     </Text>
//                                 </Box>
//                             </Flex>
//                         </ListItem>

//                         <Divider my={2} />

//                         <ListItem>
//                             <Flex align="center">
//                                 <SiMaterialdesignicons size={20} color="#2B6CB0" />
//                                 <Box ml={3}>
//                                     <Text fontWeight="bold" color="gray.600" fontSize="sm">
//                                         Construction Material
//                                     </Text>
//                                     <Text fontSize="md"> {structureData.material}</Text>
//                                 </Box>
//                             </Flex>
//                         </ListItem>

//                         <Divider my={2} />

//                         {/* New items start here */}
//                         <ListItem>
//                             <Flex align="center">
//                                 <LuRuler size={20} color="#2B6CB0" />
//                                 <Box ml={3}>
//                                     <Text fontWeight="bold" color="gray.600" fontSize="sm">
//                                         Dimensions
//                                     </Text>
//                                     <Text fontSize="md">{structureData.dimension}</Text>
//                                 </Box>
//                             </Flex>
//                         </ListItem>


//                         <Divider my={2} />

//                         {/* <ListItem>
//                             <Flex align="center">
//                                 <RiBuilding2Fill size={20} color="#2B6CB0" />
//                                 <Box ml={3}>
//                                     <Text fontWeight="bold" color="gray.600" fontSize="sm">
//                                         Building Purpose
//                                     </Text>
//                                     <Text fontSize="md">Residence Building</Text>
//                                 </Box>
//                             </Flex>
//                         </ListItem>
//                         <Divider my={2} /> */}
//                     </List>
//                 </Box>
                

//             </Box>


//         </Box>
//     );
// }

// export default Project;

// Project.jsx
import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Image,
    Flex,
    Divider,
    List,
    ListItem,
    Spinner
} from '@chakra-ui/react';
import { LuMapPin, LuCalendar, LuBuilding, LuRuler } from 'react-icons/lu';
import { SiMaterialdesignicons } from "react-icons/si";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import { useAuth } from '../components/AuthContext';
import WeatherCard from '../components/WeatherCard';

const DefaultIcon = icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const Project = () => {
    const { user } = useAuth();
    const [project, setProject] = useState(null);

    useEffect(() => {
        if (user) {
            const projects = user.project || [];
            const currentProject = user.currentProject;
            const foundProject = projects.find((p) => p.id === currentProject);
            setProject(foundProject);
        }
    }, [user]);

    if (!user || !project) {
        return (
            <Box width="full" height="90vh" display="flex" justifyContent="center" alignItems="center" bg="#FFF9C4">
                <Spinner size="xl" color="yellow.400" />
            </Box>
        );
    }

    const parseUrlString = (str) => {
        try {
            const cleanStr = str.replace(/\\/g, '');
            return JSON.parse(cleanStr);
        } catch (error) {
            console.error('Error parsing URL string:', error);
            return [];
        }
    };

    const structureData = {
        name: project.structure_name,
        location: `${project.area}, ${project.city}, ${project.country}`,
        constructionDate: project.construction_date,
        type: project.project_type,
        coordinates: [project.latitude, project.longitude],
        images: parseUrlString(project.project_images),
        dimension: project.structure_dimension,
        material: project.construction_material,
    };

    return (
        <Box p={4} bg="#FFF9C4" height="90vh" width='full' overflowY='auto' display="flex" flexDirection="column">
            <Heading mb={3} color="#000000" textAlign="center" fontSize="lg">
                Structure Details
            </Heading>

            <Box display="flex" flexDirection="row" justifyContent="space-evenly" height="95%">
                {/* Left Side */}
                <Box display="flex" flexDirection="column" justifyContent="space-evenly" width="50%">
                    {/* Map & Weather */}
                    <Box display="flex" flexDirection="row" justifyContent="space-evenly" width="full" height="45%" gap={4}>
                        <Box p={3} borderRadius="xl" boxShadow="2xl" mb={4} width="50%" height="100%" bg="#ffffff">
                            <Heading size="sm" mb={2} color="#000000">Location Map</Heading>
                            <Box h="231px" borderRadius="lg" overflow="hidden">
                                <MapContainer
                                    center={structureData.coordinates}
                                    zoom={13}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; OpenStreetMap contributors'
                                    />
                                    <Marker position={structureData.coordinates} icon={DefaultIcon}>
                                        <Popup>{structureData.name}</Popup>
                                    </Marker>
                                </MapContainer>
                            </Box>
                        </Box>

                        <Box height="100%" width="50%" borderRadius="lg">
                            <WeatherCard city={project.city} />
                        </Box>
                    </Box>

                    {/* Structure Images */}
                    <Box bg="#ffffff" p={3} borderRadius="xl" boxShadow="lg">
                        <Heading size="sm" mb={2} color="#000000">Structure Images</Heading>
                        <Flex direction="column" h="250px" overflowY="auto" gap={1} px={10} mx='auto'>
                            {structureData.images.map((img, index) => (
                                <Box key={index} borderRadius="lg" overflow="hidden" flexShrink={0}>
                                    <Image
                                        src={img}
                                        alt={`Structure ${index + 1}`}
                                        objectFit="cover"
                                        w="100%"
                                        h="100%"
                                        borderRadius="lg"
                                    />
                                </Box>
                            ))}
                        </Flex>
                    </Box>
                </Box>

                {/* Right Side */}
                <Box bg="#ffffff" p={6} borderRadius="xl" boxShadow="lg" width="45%" ml={4}>
                    <List spacing={6}>
                        <ListItem>
                            <Flex align="center">
                                <LuBuilding size={20} color="#FFD700" />
                                <Box ml={3}>
                                    <Text fontWeight="bold" color="#000000" fontSize="sm">Structure Name</Text>
                                    <Text fontSize="md">{structureData.name}</Text>
                                </Box>
                            </Flex>
                        </ListItem>

                        <Divider my={2} borderColor="#FFD700" />

                        <ListItem>
                            <Flex align="center">
                                <LuMapPin size={20} color="#FFD700" />
                                <Box ml={3}>
                                    <Text fontWeight="bold" color="#000000" fontSize="sm">Location</Text>
                                    <Text fontSize="md">{structureData.location}</Text>
                                </Box>
                            </Flex>
                        </ListItem>

                        <Divider my={2} borderColor="#FFD700" />

                        <ListItem>
                            <Flex align="center">
                                <LuCalendar size={20} color="#FFD700" />
                                <Box ml={3}>
                                    <Text fontWeight="bold" color="#000000" fontSize="sm">Construction Completion Date</Text>
                                    <Text fontSize="md">{new Date(structureData.constructionDate).toLocaleDateString()}</Text>
                                </Box>
                            </Flex>
                        </ListItem>

                        <Divider my={2} borderColor="#FFD700" />

                        <ListItem>
                            <Flex align="center">
                                <SiMaterialdesignicons size={20} color="#FFD700" />
                                <Box ml={3}>
                                    <Text fontWeight="bold" color="#000000" fontSize="sm">Construction Material</Text>
                                    <Text fontSize="md">{structureData.material}</Text>
                                </Box>
                            </Flex>
                        </ListItem>

                        <Divider my={2} borderColor="#FFD700" />

                        <ListItem>
                            <Flex align="center">
                                <LuRuler size={20} color="#FFD700" />
                                <Box ml={3}>
                                    <Text fontWeight="bold" color="#000000" fontSize="sm">Dimensions</Text>
                                    <Text fontSize="md">{structureData.dimension}</Text>
                                </Box>
                            </Flex>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Box>
    );
}

export default Project;
