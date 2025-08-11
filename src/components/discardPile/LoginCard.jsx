// src/components/LoginCard.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton, 
  Input,
  FormControl,
  FormLabel,
  Text,
  Link,
} from "@chakra-ui/react";

function LoginCard({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://spplindia.org/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Log response status & content
      console.log("Response Status:", response.status);
      const text = await response.text();
      console.log("Raw Response:", text);

      // Try parsing JSON
      const data = JSON.parse(text);
      setMessage(data.message);

      if (data.success) {
        console.log("User logged in successfully!");
        onLoginSuccess();
        onClose();
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false} // Prevent closing on outside click
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {message && (
            <Text color="red.500" mt={2}>
              {message}
            </Text>
          )}
        </ModalBody>
        <ModalFooter flexDir="column">
          <Button
            colorScheme="blue"
            width="100%"
            mb={2}
            onClick={handleLogin}
            isLoading={loading}
          >
            Login
          </Button>
          <Button variant="ghost" width="100%" onClick={onClose} mb={2}>
            Cancel
          </Button>
          <Text fontSize="sm">
            Don't have an account?{" "}
            <Link
              color="blue.500"
              onClick={() => {
                onClose();
                console.log("Redirecting to SignInPage");
                navigate("/signin");
              }}
            >
              Sign Up
            </Link>
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginCard;
