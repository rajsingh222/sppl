import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

const ResetPassword = () => {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const response = await fetch('https://spplindia.org/api/forgot_password.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }
  
      toast({
        title: "Reset email sent",
        description: "Check your email for password reset instructions",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={6}>
      <Text fontSize="2xl" mb={6} textAlign="center">
        Forgot Password
      </Text>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <Text color="red.500" mt={1} fontSize="sm">
              {errors.email.message}
            </Text>
          )}
        </FormControl>

        <Button
          mt={4}
          colorScheme="blue"
          isLoading={isSubmitting}
          type="submit"
          width="full"
        >
          Send Reset Instructions
        </Button>
      </form>

      <Text mt={4} textAlign="center">
        Remember your password?{" "}
        <Link as={RouterLink} to="/login" color="blue.500">
          Login here
        </Link>
      </Text>
    </Box>
  );
};

export default ResetPassword;