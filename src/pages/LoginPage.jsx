// // LoginPage.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Heading,
//   Text,
//   VStack,
//   useColorModeValue,
//   Container,
//   Link,
// } from "@chakra-ui/react";
// import { useAuth } from "../components/AuthContext";
// import { loginUser } from "../api/Login";

// function Login() {
//   const { setIsLoggedIn } = useAuth();
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const data = await loginUser(email, password);
//       setMessage(data.message);

//       if (data.success) {
//         console.log("User logged in successfully!");
//         setIsLoggedIn(true);
//         navigate("/");
//       } else {
//         console.error("Login failed");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       setMessage("An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxW="md" centerContent>
//       <Box
//         p={8}
//         mt={10}
//         w="full"
//         borderRadius="lg"
//         boxShadow="lg"
//         bg={useColorModeValue("white", "gray.700")}
//       >
//         <Heading textAlign="center" mb={6} fontSize="2xl">
//           Login
//         </Heading>
//         <VStack spacing={4}>
//           <FormControl>
//             <FormLabel>Email Address</FormLabel>
//             <Input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Password</FormLabel>
//             <Input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </FormControl>
//           {message && (
//             <Text color="red.500" mt={2}>
//               {message}
//             </Text>
//           )}
//           <Button
//             colorScheme="blue"
//             w="full"
//             mt={4}
//             onClick={handleLogin}
//             isLoading={loading}
//           >
//             Login
//           </Button>
//           <Text textAlign="right" w="full">
//             <Link color="blue.400" href="/password-reset-request">
//               Forgot Password?
//             </Link>
//           </Text>
//           <Text>
//             Don't have an account?{" "}
//             <Link color="blue.400" href="/signin">
//               Sign Up
//             </Link>
//           </Text>
//         </VStack>
//       </Box>
//     </Container>
//   );
// }

// export default Login;
// src/components/LoginPage.jsx
// src/components/LoginPage.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Heading,
//   Text,
//   VStack,
//   useColorModeValue, 
//   Container,
//   Link,
// } from "@chakra-ui/react";
// import { loginUser } from "../api/Login";
// import { useAuth } from "../components/AuthContext";

// function Login() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const data = await loginUser(email, password);
//       setMessage(data.message);

//       if (data.success) {
//         // console.log("User logged in successfully!", data);
//         login(data.user || {});
//         console.log("User ", data, data.user);
//         navigate("/");
//       } else {
//         console.error("Login failed");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       setMessage("An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxW="md" centerContent>
//       <Box
//         p={8}
//         mt={10}
//         w="full"
//         borderRadius="lg"
//         boxShadow="lg"
//         bg={useColorModeValue("white", "gray.700")}
//       >
//         <Heading textAlign="center" mb={6} fontSize="2xl">Login</Heading>
//         <VStack spacing={4}>
//           <FormControl>
//             <FormLabel>Email Address</FormLabel>
//             <Input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Password</FormLabel>
//             <Input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </FormControl>
//           {message && (
//             <Text color="Green.500" mt={2}>
//               {message}
//             </Text>
//           )}
//           <Button
//             colorScheme="yellow"
//             w="full"
//             mt={4}
//             onClick={handleLogin}
//             isLoading={loading}
//           >
//             Login
//           </Button>
//           <Text textAlign="right" w="full">
//             <Link color="blue.400" href="/password-reset-request">
//               Forgot Password?
//             </Link>
//           </Text>
//           <Text>
//             Don't have an account?{" "}
//             <Link color="blue.400" href="/signin">
//               Sign Up
//             </Link>
//           </Text>
//         </VStack>
//       </Box>
//     </Container>
//   );
// }

// export default Login;
import React, { useState } from "react";
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
  Select,
} from "@chakra-ui/react";
import { loginUser } from "../api/Login";
import { useAuth } from "../components/AuthContext";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");  // new role state
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!role) {
      setMessage("Please select a role.");
      return;
    }

    setLoading(true);
    try {
      // Pass role to your login API
      const data = await loginUser(email, password, role);
      setMessage(data.message);

      if (data.success) {
        login(data.user || {});
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred");
    } finally {
      setLoading(false);
    }
  };

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
        <Heading textAlign="center" mb={6} fontSize="2xl">Login</Heading>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Role</FormLabel>
            <Select
              placeholder="Select role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Admin">Customer admin</option>
              <option value="Customer">Customer</option>
            </Select>
          </FormControl>

          {message && (
            <Text color="green.500" mt={2}>
              {message}
            </Text>
          )}
          <Button
            colorScheme="yellow"
            w="full"
            mt={4}
            onClick={handleLogin}
            isLoading={loading}
          >
            Login
          </Button>
          <Text textAlign="right" w="full">
            <Link color="blue.400" href="/password-reset-request">
              Forgot Password?
            </Link>
          </Text>
          <Text>
            Don't have an account?{" "}
            <Link color="blue.400" href="/signin">
              Sign Up
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
}

export default Login;
