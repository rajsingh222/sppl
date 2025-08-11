import React, {useState, useEffect} from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import { LuFolder, LuPlus, LuUser } from "react-icons/lu";
import SensorLayout from "./SensorLayout";
import SensorMonitoring from "./SensorMonitoring";
import FrequencyAnalysis from "../components/FrequencyAnalysis";
import BeamDeflectionCalculator from "../components/DeflectionProfile"
import { useAuth } from "../components/AuthContext";

// import DeflectionProfile from "./DeflectionProfile";
// children: [
//   {
//     type: 'dropdown',
//     name: 'Done By Other Party',
//     children: [
//       { name: 'Compliance Report', to: '/project/project-a' }
//     ]
//   },
//   {
//     type: 'dropdown',
//     name: 'Done By SPPL India',
//     children: [
//       { name: 'Test Methodology', to: '/project/project-a' },
//       { name: 'Test Results', to: '/project/project-a' },
//       { name: 'Compliance Report', to: '/project/project-a' }
//     ]
//   },
// ]
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
    // eslint-disable-next-line
  }, [user]);

  if (!isLoggedIn) {
    return (
      <Box height="90vh" width="83%" mx='auto' my='auto'>
        <Box
          maxW="800px"
          w="100%"
          bg='white'
          p={8}
          borderRadius="xl"
          boxShadow="2xl"
          mx='auto'
          mt='10'
        >
          <Box textAlign='center'>
            <LuUser size={60} />
            <h1>Please Login to view this page</h1>
          </Box>
        </Box>
      </Box>
    )
  }
  if (!project) {
    return (
      <Box width="full" height="90vh" display="flex" justifyContent="center" alignItems="center">
        Please first select or add a project
      </Box>
    );
  }

  return (
    <Tabs
      defaultIndex={0}
      pl='0.5rem'
      mx='auto'
      colorScheme='blue'
      width='90%'
    >
      <TabList>
        <Tab>
          Sensor Based Monitoring
        </Tab>
        <Tab>
          Sensor Layout
        </Tab>
        <Tab>
          Frequency Analysis
        </Tab>
        {/* <Tab>
          Deflection Profile
        </Tab> */}
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box
            // border="1px solid green"
            width="100%"
            mx="auto"
            height='80vh'
            overflowY='auto'
          >
            <SensorMonitoring />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box
            // border="1px solid green"
            width="100%"
            mx="auto"
            height='80vh'


          >
            <SensorLayout structure_model={project?.structure_model} />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box
            // border="1px solid green"
            width="100%"
            mx="auto"
            height='80vh'
          >
            <FrequencyAnalysis />
          </Box>
        </TabPanel>
        {/* <TabPanel>
          <Box
            // border="1px solid green"
            width="100%"
            mx="auto"
            height='80vh'
          >
            <BeamDeflectionCalculator />
          </Box>
        </TabPanel> */}
      </TabPanels>
    </Tabs>
  );
};

export default SHM;
