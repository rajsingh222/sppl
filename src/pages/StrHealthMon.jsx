// import React, {useState, useEffect} from "react";
// import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
// import { LuFolder, LuPlus, LuUser } from "react-icons/lu";
// import SensorLayout from "./SensorLayout";
// import SensorMonitoring from "./SensorMonitoring";
// import FrequencyAnalysis from "../components/FrequencyAnalysis";
// import BeamDeflectionCalculator from "../components/DeflectionProfile"
// import { useAuth } from "../components/AuthContext";

// // import DeflectionProfile from "./DeflectionProfile";
// // children: [
// //   {
// //     type: 'dropdown',
// //     name: 'Done By Other Party',
// //     children: [
// //       { name: 'Compliance Report', to: '/project/project-a' }
// //     ]
// //   },
// //   {
// //     type: 'dropdown',
// //     name: 'Done By SPPL India',
// //     children: [
// //       { name: 'Test Methodology', to: '/project/project-a' },
// //       { name: 'Test Results', to: '/project/project-a' },
// //       { name: 'Compliance Report', to: '/project/project-a' }
// //     ]
// //   },
// // ]
// const SHM = () => {

//   const { user, isLoggedIn } = useAuth();
//   const [project, setProject] = useState(null);

//   useEffect(() => {
//     if (user) {
//       const projects = user.project || [];
//       const currentProject = user.currentProject;
//       const foundProject = projects.find((p) => p.id === currentProject);
//       setProject(foundProject);
//     }
//     // eslint-disable-next-line
//   }, [user]);

//   if (!isLoggedIn) {
//     return (
//       <Box height="90vh" width="83%" mx='auto' my='auto'>
//         <Box
//           maxW="800px"
//           w="100%"
//           bg='white'
//           p={8}
//           borderRadius="xl"
//           boxShadow="2xl"
//           mx='auto'
//           mt='10'
//         >
//           <Box textAlign='center'>
//             <LuUser size={60} />
//             <h1>Please Login to view this page</h1>
//           </Box>
//         </Box>
//       </Box>
//     )
//   }
//   if (!project) {
//     return (
//       <Box width="full" height="90vh" display="flex" justifyContent="center" alignItems="center">
//         Please first select or add a project
//       </Box>
//     );
//   }

//   return (
//     <Tabs
//       defaultIndex={0}
//       pl='0.5rem'
//       mx='auto'
//       colorScheme='blue'
//       width='90%'
//     >
//       <TabList>
//         <Tab>
//           Sensor Based Monitoring
//         </Tab>
//         <Tab>
//           Sensor Layout
//         </Tab>
//         <Tab>
//           Frequency Analysis
//         </Tab>
//         {/* <Tab>
//           Deflection Profile
//         </Tab> */}
//       </TabList>
//       <TabPanels>
//         <TabPanel>
//           <Box
//             // border="1px solid green"
//             width="100%"
//             mx="auto"
//             height='80vh'
//             overflowY='auto'
//           >
//             <SensorMonitoring />
//           </Box>
//         </TabPanel>
//         <TabPanel>
//           <Box
//             // border="1px solid green"
//             width="100%"
//             mx="auto"
//             height='80vh'


//           >
//             <SensorLayout structure_model={project?.structure_model} />
//           </Box>
//         </TabPanel>
//         <TabPanel>
//           <Box
//             // border="1px solid green"
//             width="100%"
//             mx="auto"
//             height='80vh'
//           >
//             <FrequencyAnalysis />
//           </Box>
//         </TabPanel>
//         {/* <TabPanel>
//           <Box
//             // border="1px solid green"
//             width="100%"
//             mx="auto"
//             height='80vh'
//           >
//             <BeamDeflectionCalculator />
//           </Box>
//         </TabPanel> */}
//       </TabPanels>
//     </Tabs>
//   );
// };

// export default SHM;

// import React, { useState, useEffect } from "react";
// import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button, Heading, Text } from "@chakra-ui/react";
// import { LuFolder, LuPlus, LuUser } from "react-icons/lu";
// import SensorLayout from "./SensorLayout";
// import SensorMonitoring from "./SensorMonitoring";
// import FrequencyAnalysis from "../components/FrequencyAnalysis";
// import BeamDeflectionCalculator from "../components/DeflectionProfile";
// import { useAuth } from "../components/AuthContext";

// const SHM = () => {
//   const { user, isLoggedIn } = useAuth();
//   const [project, setProject] = useState(null);

//   useEffect(() => {
//     if (user) {
//       const projects = user.project || [];
//       const currentProject = user.currentProject;
//       const foundProject = projects.find((p) => p.id === currentProject);
//       setProject(foundProject);
//     }
//   }, [user]);

//   if (!isLoggedIn) {
//     return (
//       <Box height="90vh" width="83%" mx="auto" my="auto">
//         <Box
//           maxW="800px"
//           w="100%"
//           bg="white"
//           p={8}
//           borderRadius="xl"
//           boxShadow="2xl"
//           mx="auto"
//           mt="10"
//         >
//           <Box textAlign="center">
//             <LuUser size={60} />
//             <h1>Please Login to view this page</h1>
//           </Box>
//         </Box>
//       </Box>
//     );
//   }
//   if (!project) {
//     return (
//       <Box width="full" height="90vh" display="flex" justifyContent="center" alignItems="center">
//         Please first select or add a project
//       </Box>
//     );
//   }

//   return (
//     <>
//       <Tabs defaultIndex={0} pl="0.5rem" mx="auto" colorScheme="blue" width="90%">
//         <TabList>
//           <Tab>Sensor Based Monitoring</Tab>
//           <Tab>Sensor Layout</Tab>
//           <Tab>Frequency Analysis</Tab>
//         </TabList>

//         <TabPanels>
//           <TabPanel>
//             <Box width="100%" mx="auto" height="80vh" overflowY="auto">
//               <SensorMonitoring />
//             </Box>
//           </TabPanel>
//           <TabPanel>
//             <Box width="100%" mx="auto" height="80vh">
//               <SensorLayout structure_model={project?.structure_model} />
//             </Box>
//           </TabPanel>
//           <TabPanel>
//             <Box width="100%" mx="auto" height="80vh">
//               <FrequencyAnalysis />
//             </Box>
//           </TabPanel>
//         </TabPanels>
//       </Tabs>

//       {/* Report Generation Section */}
//       <Box
//         width="90%"
//         mx="auto"
//         mt={8}
//         p={6}
//         borderRadius="md"
//         boxShadow="lg"
//         bg="white"
//       >
//         <Heading size="md" mb={4}>Report Generation</Heading>
//         <Text mb={4}>
//           Generate detailed project reports including monitoring data, frequency analysis, and sensor layouts.
//         </Text>
//         <Button colorScheme="blue" onClick={() => alert("Generating report...")}>
//           Generate Report
//         </Button>
//       </Box>
//     </>
//   );
// };

// export default SHM;

// import React, { useState, useEffect } from "react";
// import {
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   Box,
//   Button,
//   Heading,
//   Text,
// } from "@chakra-ui/react";
// import { LuUser } from "react-icons/lu";
// import SensorLayout from "./SensorLayout";
// import SensorMonitoring from "./SensorMonitoring";
// import FrequencyAnalysis from "../components/FrequencyAnalysis";
// import { useAuth } from "../components/AuthContext";

// const SHM = () => {
//   const { user, isLoggedIn } = useAuth();
//   const [project, setProject] = useState(null);

//   useEffect(() => {
//     if (user) {
//       const projects = user.project || [];
//       const currentProject = user.currentProject;
//       const foundProject = projects.find((p) => p.id === currentProject);
//       setProject(foundProject);
//     }
//   }, [user]);

//   // Not logged in view
//   if (!isLoggedIn) {
//     return (
//       <Box
//         minH="90vh"
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         bg="black"
//         color="white"
//       >
//         <Box
//           maxW="500px"
//           w="full"
//           bg="white"
//           p={8}
//           borderRadius="xl"
//           boxShadow="2xl"
//           textAlign="center"
//           color="black"
//         >
//           <LuUser size={60} />
//           <Heading size="md" mt={4}>
//             Please Login to view this page
//           </Heading>
//         </Box>
//       </Box>
//     );
//   }

//   // No project view
//   if (!project) {
//     return (
//       <Box
//         w="full"
//         minH="90vh"
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         bg="black"
//         color="yellow.400"
//         fontWeight="bold"
//       >
//         Please first select or add a project
//       </Box>
//     );
//   }

//   return (
//     <Box bg="black" minH="100vh" py={6}>
//       {/* Tabs Section */}
//       <Tabs
//         defaultIndex={0}
//         variant="enclosed-colored"
//         colorScheme="yellow"
//         mx="auto"
//         w={{ base: "95%", md: "90%" }}
//         bg="white"
//         p={4}
//         borderRadius="xl"
//         boxShadow="lg"
//       >
//         <TabList>
//           <Tab _selected={{ bg: "yellow.400", color: "black" }}>
//             Sensor Based Monitoring
//           </Tab>
//           <Tab _selected={{ bg: "yellow.400", color: "black" }}>
//             Sensor Layout
//           </Tab>
//           <Tab _selected={{ bg: "yellow.400", color: "black" }}>
//             Frequency Analysis
//           </Tab>
//         </TabList>

//         <TabPanels mt={4}>
//           <TabPanel p={0}>
//             <SensorMonitoring />
//           </TabPanel>
//           <TabPanel p={0}>
//             <SensorLayout structure_model={project?.structure_model} />
//           </TabPanel>
//           <TabPanel p={0}>
//             <FrequencyAnalysis />
//           </TabPanel>
//         </TabPanels>
//       </Tabs>

//       {/* Report Generation Section */}
//       <Box
//         w={{ base: "95%", md: "90%" }}
//         mx="auto"
//         mt={8}
//         p={6}
//         borderRadius="xl"
//         boxShadow="xl"
//         bg="white"
//         border="2px solid yellow"
//       >
//         <Heading size="md" mb={4} color="black">
//           Report Generation
//         </Heading>
//         <Text mb={4} color="gray.700">
//           Generate detailed project reports including monitoring data, frequency
//           analysis, and sensor layouts.
//         </Text>
//         <Button
//           bg="yellow.400"
//           color="black"
//           _hover={{ bg: "yellow.300" }}
//           onClick={() => alert("Generating report...")}
//         >
//           Generate Report
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default SHM;

import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Heading,
} from "@chakra-ui/react";
import { LuUser } from "react-icons/lu";
import SensorLayout from "./SensorLayout";
import SensorMonitoring from "./SensorMonitoring";
import FrequencyAnalysis from "../components/FrequencyAnalysis";
import { useAuth } from "../components/AuthContext";

const SHM = () => {
  const { user, isLoggedIn } = useAuth();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (user) {
      const projects = user.project || [];
      const currentProject = user.currentProject;
      const foundProject = projects.find((p) => p.id === currentProject);
      setProject(foundProject);
    }
  }, [user]);

  if (!isLoggedIn) {
    return (
      <Box
        minH="90vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="black"
        color="white"
      >
        <Box
          maxW="500px"
          w="full"
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="2xl"
          textAlign="center"
          color="black"
        >
          <LuUser size={60} />
          <Heading size="md" mt={4}>
            Please Login to view this page
          </Heading>
        </Box>
      </Box>
    );
  }

  if (!project) {
    return (
      <Box
        w="full"
        minH="90vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="black"
        color="yellow.400"
        fontWeight="bold"
      >
        Please first select or add a project
      </Box>
    );
  }

  return (
    <Box bg="black" minH="100vh" py={6}>
      <Tabs
        defaultIndex={0}
        variant="enclosed-colored"
        colorScheme="yellow"
        mx="auto"
        w={{ base: "95%", md: "90%" }}
        bg="white"
        p={4}
        borderRadius="xl"
        boxShadow="lg"
      >
        <TabList>
          <Tab _selected={{ bg: "yellow.400", color: "black" }}>
            Sensor Based Monitoring
          </Tab>
          <Tab _selected={{ bg: "yellow.400", color: "black" }}>
            Sensor Layout
          </Tab>
          <Tab _selected={{ bg: "yellow.400", color: "black" }}>
            Frequency Analysis
          </Tab>
        </TabList>

        <TabPanels mt={4}>
          <TabPanel p={0}>
            <SensorMonitoring />
          </TabPanel>
          <TabPanel p={0}>
            <SensorLayout structure_model={project?.structure_model} />
          </TabPanel>
          <TabPanel p={0}>
            <FrequencyAnalysis />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SHM;

