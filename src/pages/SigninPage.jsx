// src/components/SignUp.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Alert,
  AlertIcon,
  AlertDescription,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { CheckIcon, WarningIcon, Checkbox } from "@chakra-ui/icons";
import { useAuth } from "../components/AuthContext";
import { signupUser } from "../api/Signup";

const SignUp = () => {
  // Fields for user data
  const [fullName, setFullName] = useState("");
  const [alternateEmail, setAlternateEmail] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idProofType, setIdProofType] = useState("");
  const [idProofNumber, setIdProofNumber] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [consentData, setConsentData] = useState(false);
  
  // State for messages & errors
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  // State to check real-time password validations
  const [passwordValidity, setPasswordValidity] = useState({
    minLength: false,
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
    hasSymbol: false,
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Function to validate password criteria
  useEffect(() => {
    setPasswordValidity({
      minLength: password.length >= 8,
      hasLower: /[a-z]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  // Effect to check if password and confirmPassword match
  useEffect(() => {
    // Only validate if the confirmPassword has some value
    if (confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(true);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password meets all criteria
    const validPassword = Object.values(passwordValidity).every(Boolean);
    if (!validPassword) {
      setIsError(true);
      setMessage("Password does not meet the required criteria.");
      return;
    }
    // Check if passwords match
    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }
    if (!consentData) {
      setIsError(true);
      setMessage("You must agree to the Terms & Conditions and consent to data usage.");
      return;
    }

    try {
      // Adjust the signupUser call as needed to include new fields.
      const result = await signupUser(fullName, email, userName, password, alternateEmail, phoneNumber, address, idProofType, idProofNumber);
      console.log(result.user);
      login(result.user || {});
      setIsError(false);
      setMessage("Signup successful!");

      // Clear the form states
      setFullName("");
      setAlternateEmail("");
      setEmail("");
      setUserName("");
      setPhoneNumber("");
      setAddress("");
      setPassword("");
      setConfirmPassword("");
      setIdProofType("");
      setIdProofNumber("");
      setAgreeTerms(false);
      setConsentData(false);

      // Navigate to home page (or dashboard)
      navigate("/");
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      console.error("Signup error:", error);
    }
  };

  // Component to render password criteria with an icon based on validation state
  const PasswordCriteria = ({ isValid, label }) => (
    <HStack spacing={2}>
      {isValid ? <CheckIcon color="green.500" /> : <WarningIcon color="red.500" />}
      <Text fontSize="sm">{label}</Text>
    </HStack>
  );

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
          Welcome to SPPL Dashboard
        </Heading>
        <Heading textAlign="center" mb={6} fontSize="2xl">
          Sign Up to Get Started
        </Heading>
        {message && (
          <Alert status={isError ? "error" : "success"} mb={4}>
            {isError ? <WarningIcon mr={2} /> : <CheckIcon mr={2} />}
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {/* Full Name */}
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                placeholder="Please enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormControl>
            {/* Primary Email */}
            <FormControl isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your primary email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            {/* Alternate Email */}
            <FormControl >
              <FormLabel>Alternate Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter an alternate email address"
                value={alternateEmail}
                onChange={(e) => setAlternateEmail(e.target.value)}
              />
            </FormControl>


            {/* Username */}
            {/* <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Choose a username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl> */}

            {/* Phone Number */}

           

            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormControl>

            {/* Address */}
            {/* <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl> */}

            {/* Password */}
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Text mt={2} mb={1} fontWeight="bold" fontSize="sm">
                Password must include:
              </Text>
              <VStack spacing={1} align="start">
                <PasswordCriteria
                  isValid={passwordValidity.minLength}
                  label="At least 8 characters"
                />
                <PasswordCriteria
                  isValid={passwordValidity.hasLower}
                  label="1 lowercase letter"
                />
                <PasswordCriteria
                  isValid={passwordValidity.hasUpper}
                  label="1 uppercase letter"
                />
                <PasswordCriteria
                  isValid={passwordValidity.hasNumber}
                  label="1 number"
                />
                <PasswordCriteria
                  isValid={passwordValidity.hasSymbol}
                  label="1 special symbol"
                />
              </VStack>
            </FormControl>

            {/* Confirm Password */}
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPassword && (
                <Text fontSize="sm" color={passwordsMatch ? "green.500" : "red.500"} mt={1}>
                  {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                </Text>
              )}
            </FormControl>

            {/* <FormControl isRequired>
              <FormLabel>ID Proof Type</FormLabel>
              <Input
                type="text"
                placeholder="Enter your ID proof type"
                value={idProofType}
                onChange={(e) => setIdProofType(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>ID Proof Number</FormLabel>
              <Input
                type="text"
                placeholder="Enter your ID proof number"
                value={idProofNumber}
                onChange={(e) => setIdProofNumber(e.target.value)}
              />
            </FormControl> */}

            {/* Terms & Conditions */}
            {/* <FormControl isRequired>
              <Checkbox
                isChecked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              >
                I agree to the Privacy Policy
              </Checkbox>
            </FormControl> */}

            {/* Data Consent */}
            <FormControl isRequired>
              <Checkbox
                isChecked={consentData}
                onChange={(e) => setConsentData(e.target.checked)}
              >
                I consent to the use of my data for research and monitoring purposes
              </Checkbox>
            </FormControl>

            <Button type="submit" colorScheme="blue" w="full" mt={4}>
              Sign Up
            </Button>
            <Text>
              Already have an account?{" "}
              <Link color="blue.400" href="/login">
                Sign In
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
