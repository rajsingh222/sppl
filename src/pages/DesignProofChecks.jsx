import React, { useState, useEffect } from "react";
import {
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Box, Image, Text, Heading,
    Flex, List, ListItem, Divider,
    Grid, Stack, useToast,
    Button
} from "@chakra-ui/react";
import { LuFile, LuDownload, LuTrash, LuBuilding, LuMapPin, LuCalendar, LuUser } from "react-icons/lu";
import { useAuth } from "../components/AuthContext";
import PdfUploader from "../components/PdfUploader";
import MapCard from "../components/MapCard";
import { FaUserCog } from "react-icons/fa";

// InfoItem component
const InfoItem = ({ icon, label, value }) => (
    <ListItem>
        <Flex align="center">
            <Box color="blue.600" mr={3}>{icon}</Box>
            <Box>
                <Text fontSize="sm" color="gray.600" fontWeight="500">{label}</Text>
                <Text fontSize="md" fontWeight="600">{value}</Text>
            </Box>
        </Flex>
        <Divider my={3} />
    </ListItem>
);

// ReportItem component
const ReportItem = ({ icon, name, onClick, url }) => (
    <Box
        p={3}
        borderRadius="md"
        border="1px solid"
        borderColor="gray.200"
        _hover={{
            bg: 'blue.50',
            borderColor: 'blue.200',
            cursor: 'pointer'
        }}
        onClick={onClick}
    >
        <Flex align="center" flexDirection="row">
            {icon}
            <Text ml={3} fontWeight="medium">
                {name}
            </Text>
            {/* Optionally add download/trash icons here */}
            <Box ml="auto" diplay='flex' flexDirection='row'>
                <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="green"
                    onClick={e => {
                        e.stopPropagation();
                        const endpoint = `https://spplindia.org/api/download.php?url=${encodeURIComponent(url)}`;
                        window.open(endpoint, '_blank');
                    }}
                >
                    <LuDownload />
                </Button>


                {/* 

                <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Handle delete logic here
                    }
                    }
                >
                    <LuTrash />
                </Button> */}

            </Box>
        </Flex>
    </Box>
);

// Unified TabContentLayout component
const TabContentLayout = ({
    authorityValue,
    reports,
    showUploader,
    structureData,
    showMap,
    toast
}) => (
    <Box p={4}>
        <Grid
            templateColumns={{ base: '1fr', md: '3fr 2fr' }}
            gap={6}
            alignItems="start"
        >
            <Stack spacing={6}>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                    <Box bg="white" p={6} borderRadius="xl" boxShadow="md">
                        <List spacing={4}>
                            <InfoItem
                                icon={<FaUserCog />}
                                label="Authority"
                                value={authorityValue}
                            />
                            <InfoItem
                                icon={<LuBuilding />}
                                label="Structure Name"
                                value={structureData.name}
                            />
                            <InfoItem
                                icon={<LuMapPin />}
                                label="Location"
                                value={structureData.location}
                            />
                            <InfoItem
                                icon={<LuCalendar />}
                                label="Construction Date"
                                value={new Date(structureData.constructionDate).toLocaleDateString()}
                            />
                            <InfoItem
                                icon={<LuBuilding />}
                                label="Structure Type"
                                value={structureData.type}
                            />
                        </List>
                    </Box>
                    <Box
                        height="400px"
                        borderRadius="xl"
                        overflow="hidden"
                        boxShadow="md"
                    >
                        <MapCard
                            coordinates={structureData.coordinates}
                            zoom={13}
                            height="100%"
                            width="100%"
                        />
                    </Box>
                </Grid>
                <Box bg="white" p={6} borderRadius="xl" boxShadow="md">
                    <Heading size="sm" mb={4} color="blue.800">
                        Structure Images
                    </Heading>
                    <Grid
                        templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
                        gap={4}
                        maxH="400px"
                        overflowY="auto"
                        p={2}
                    >
                        {structureData.images.map((img, index) => (
                            <Image
                                key={index}
                                src={img}
                                alt={`Structure ${index + 1}`}
                                borderRadius="md"
                                objectFit="cover"
                                width="100%"
                                height="200px"
                                boxShadow="sm"
                            />
                        ))}
                    </Grid>
                </Box>
                <Box bg="white" p={6} borderRadius="xl" boxShadow="md">
                    <Heading size="sm" mb={4} color="blue.800">
                        Structure Video
                    </Heading>
                    <Box
                        borderRadius="lg"
                        overflow="hidden"
                        position="relative"
                        paddingTop="56.25%"
                    >
                        <video
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%'
                            }}
                            controls
                        >
                            <source src={structureData.video} type="video/mp4" />
                            Your browser does not support HTML video.
                        </video>
                    </Box>
                </Box>
            </Stack>
            <Box
                bg="white"
                p={6}
                borderRadius="xl"
                boxShadow="md"
                position="relative"
                height='53vh'
                overflowY='auto'
            >
                <Heading size="sm" mb={4} color="blue.800">
                    Test Reports
                </Heading>

                <Stack spacing={4} mb={8} maxH="60vh" overflowY="auto">
                    {reports.length === 0 ? (
                        <Text color="gray.500" textAlign="center">
                            No reports available from SPPL
                        </Text>
                    ) : null}
                    {reports.map((report, index) => (
                        <ReportItem
                            key={index}
                            icon={report.icon}
                            name={report.name}
                            onClick={() => window.open(report.pdfUrl, '_blank')}
                            url={report.pdfUrl}
                        />
                    ))}
                </Stack>

                {showUploader && (
                    <PdfUploader
                        api="https://spplindia.org/api/add_dpc_others.php"
                        onUploadSuccess={() =>
                            toast({
                                title: 'Upload successful',
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                            })
                        }
                        onUploadError={(error) =>
                            toast({
                                title: 'Upload failed',
                                description: error,
                                status: 'error',
                                duration: 5000,
                                isClosable: true,
                            })
                        }
                    />

                )}
            </Box>
        </Grid>
    </Box>
);

const DesignProofChecks = () => {
    const { user, isLoggedIn } = useAuth();
    const [project, setProject] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const toast = useToast();

    useEffect(() => {
        if (user) {
            const projects = user.project || [];
            const currentProject = user.currentProject;
            const foundProject = projects.find((p) => p.id === currentProject);
            setProject(foundProject);
        }
        // eslint-disable-next-line
    }, [user]);

    const parseUrlString = (str) => {
        try {
            const cleanStr = str.replace(/\\/g, '');
            return JSON.parse(cleanStr);
        } catch (error) {
            console.error('Error parsing URL string:', error);
            return [];
        }
    };
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

    const structureData = {
        name: project.project_title,
        location: `${project.area}, ${project.city}, ${project.country}`,
        constructionDate: project.construction_date,
        type: project.structure_type,
        coordinates: [project.latitude, project.longitude],
        images: parseUrlString(project.project_images),
        video: parseUrlString(project.project_videos)[0] || null
    };

    const getTitle = url =>
        decodeURIComponent(
            url.split('/').pop().split('.')[0].replace(/^[^_]*_/, '').replace(/_/g, ' ')
        );

    const sppl_dpc_reports = parseUrlString(project.sppl_dpc_reports).map((report) => ({
        name: getTitle(report),
        pdfUrl: report,
        icon: <LuFile size="1.5rem" color="#2B6CB0" />,
    }));

    const others_dpc_reports = parseUrlString(project.others_dpc_reports).map((report) => ({
        name: getTitle(report),
        pdfUrl: report,
        icon: <LuFile size="1.5rem" color="#2B6CB0" />,
    }));

    return (
        <Tabs
            index={activeTab}
            onChange={(index) => setActiveTab(index)}
            width='100%'
            height={{ base: 'auto', md: '90vh' }}
            colorScheme='blue'
            overflowY='auto'
            isLazy
        >
            <TabList px={4}>
                <Tab>Done by SPPL</Tab>
                <Tab>Done by Others</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <TabContentLayout
                        authorityValue="Sanrachna Prahari Pvt. Ltd."
                        reports={sppl_dpc_reports}
                        showUploader={false}
                        showMap={true}
                        structureData={structureData}
                        toast={toast}
                    />
                </TabPanel>
                <TabPanel>
                    <TabContentLayout
                        authorityValue="Non SPPL"
                        reports={others_dpc_reports}
                        showUploader={true}
                        showMap={false}
                        structureData={structureData}
                        toast={toast}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default DesignProofChecks;
