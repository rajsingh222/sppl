import React from 'react';
import {
    Box,
    Flex,
    Avatar,
    Heading,
    Text,
    Grid,
    GridItem,
    Divider,
    Button,
    useColorModeValue
} from '@chakra-ui/react';
import AddProjectDropdown from '../components/AddProject';
import { useAuth } from "../components/AuthContext";
const ProfilePage = () => {
    const { user, isLoggedIn } = useAuth();
    console.log("Profile Page", user, isLoggedIn);
    const cardBg = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.300');

    return (
        <Box height="90vh" py={8} width="83%" mx='auto'>
            {isLoggedIn ? (
                <Flex justify="center" align="center" flexDirection="row">
                    <Box
                        maxW="800px"
                        w="100%"
                        bg={cardBg}
                        p={8}
                        borderRadius="xl"
                        boxShadow="2xl"
                        mx={4}
                    >
                        <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={8}>
                            <Avatar
                                size="2xl"
                                name={user.fullname}
                                src="https://via.placeholder.com/150"
                                border="4px solid"
                                borderColor="blue.100"
                            />
                            <Box textAlign={{ base: 'center', md: 'left' }}>
                                <Heading as="h1" size="xl" mb={2}>
                                    {user.fullname}
                                </Heading>
                                {/* <Text fontSize="lg" color="blue.500" mb={2}>
                                    @{user.username}
                                </Text> */}
                                <Text fontSize="md" color={textColor}>
                                    Welcome {user.fullname}
                                </Text>
                            </Box>
                        </Flex>

                        <Divider my={8} borderColor="gray.200" />

                        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                            <DetailItem label="Email" value={user.email} />
                            <DetailItem label="Alternate Email" value={user.alt_email || 'Not Added'} />
                            <DetailItem label="Phone" value={user.phone_number} />
                            <DetailItem label="Member Since" value="July 2025" />
                            {/* <GridItem colSpan={{ base: 1, md: 2 }}>
                                <DetailItem 
                                    label="Address" 
                                    value={`${user.address}`} 
                                />
                            </GridItem> */}
                        </Grid>

                        {/* <Box mt={8}>
                            <Heading size="md" mb={4}>About</Heading>
                            <Text color={textColor} lineHeight="tall">
                                Experienced SHM Engineer with a strong background in monitoring bridges,
                                tunnels, and critical infrastructures. Passionate about integrating advanced sensor
                                technologies to ensure safety and longevity of structures.
                            </Text>
                        </Box> */}

                        {/* <Flex mt={8} justify="flex-end">
                            <Button 
                                colorScheme="blue" 
                                size="lg" 
                                px={8}
                                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                            >
                                Edit Profile
                            </Button>
                        </Flex> */}
                    </Box>
                    <AddProjectDropdown />

                </Flex>
            ) : (
                <Text
                    fontSize="4xl"
                    fontWeight="bold"
                    color="blue.800"
                    textAlign="center"
                    mx="auto"
                    py="15rem"
                >
                    Please log in to see your profile details.
                </Text>
            )}
        </Box>
    );
};

const DetailItem = ({ label, value }) => {
    const textColor = useColorModeValue('gray.600', 'gray.300');
    
    return (
        <Box>
            <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={1}>
                {label}
            </Text>
            <Text fontSize="md" color={textColor}>
                {value || 'N/A'}
            </Text>
        </Box>
    );
};

export default ProfilePage;