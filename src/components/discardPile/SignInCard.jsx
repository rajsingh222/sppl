import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Container,
  Link,
} from "@chakra-ui/react";

const SignUp = () => {
  return (
    <Container maxW="md" centerContent>
      <Box
        p={8}
        mt={10}
        w="full"
        borderRadius="lg"
        boxShadow="lg"
        bg={useColorModeValue("white", "gray.700")}
      >
        <Heading textAlign="center" mb={6} fontSize="2xl">
          Sign Up
        </Heading>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input type="text" placeholder="Enter your full name" />
          </FormControl>
          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" placeholder="Choose a username" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>
          <Button colorScheme="blue" w="full" mt={4}>
            Sign Up
          </Button>
          <Text>
            Already have an account?{" "}
            <Link color="blue.400" to="/">
              Sign In
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default SignUp;
