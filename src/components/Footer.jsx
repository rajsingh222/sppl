import React from 'react';
import { Box, Flex, Text, Link as ChakraLink, HStack, Icon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const hoverColor = "#b58900"; // dark mustard yellow

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Project', to: '/project' },
    { label: 'General', to: '/general' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <Box bg="white" color="black" py={6} px={{ base: 4, md: 16 }} boxShadow="sm">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
      >
        <Text fontSize="sm" mb={{ base: 4, md: 0 }}>
          &copy; {new Date().getFullYear()} Sanrachna Prahari Pvt Ltd. All rights reserved.
        </Text>

        <HStack spacing={6} fontWeight="medium" fontSize="sm" mb={{ base: 4, md: 0 }}>
          {navLinks.map(({ label, to }) => (
            <ChakraLink
              key={label}
              as={RouterLink}
              to={to}
              _hover={{ color: hoverColor, textDecoration: 'none' }}
              transition="color 0.3s ease"
            >
              {label}
            </ChakraLink>
          ))}
        </HStack>

        <HStack spacing={5}>
          {[FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope].map((IconComp, idx) => (
            <ChakraLink
              key={idx}
              href="#"
              isExternal={IconComp !== FaEnvelope}
              aria-label="social link"
              color="black"
              fontSize="lg"
              transition="color 0.3s ease"
              _hover={{ color: hoverColor }}
            >
              <Icon as={IconComp} />
            </ChakraLink>
          ))}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;
