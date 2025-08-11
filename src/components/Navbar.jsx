// Navbar.jsx
import React from "react";
import {
  Box,
  Flex,
  Text,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import NotificationMenu from "./NotificationMenu";
import { useAuth } from "./AuthContext"; // Adjust the path if needed
import { FaUser, FaHome } from "react-icons/fa";
import { CircularProgress, CircularProgressLabel, useTheme } from "@chakra-ui/react";

const palette = {
  hoverPrimary: "#3B82F6", // blue.500
  navbarBackground: "#FFFFFF", // white
  buttonPrimary: "#2563EB", // blue.600
  hoverButtonPrimary: "#1E40AF", // blue.700
  primaryText: "blue.800", // blue.800
  whiteText: "#FFFFFF", // white
  accentRed: "#FFA07A", // soft red
  textColor: "#fff",
};

const NavbarContent = () => {
  // Destructure logout from our auth context instead of using setIsLoggedIn directly.
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const handleLogout = () => {
    // Call the logout helper to clear tokens and user data.
    logout();
    window.location.reload();
    navigate("/");
  };

  const userMenu = (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FaUser size="1.2em" color={palette.primaryText} />}
        borderRadius="50%"
        variant="ghost"
        aria-label="User Menu"
      />
      <MenuList>
        <MenuItem
          color={palette.primaryText}
          onClick={() => navigate("/profile")}
        >
          Profile
        </MenuItem>
        <MenuItem color={palette.primaryText} onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );

  return (
    <Box
      bg={palette.textColor}
      color={palette.textColor}
      px="6"
      py="3"
      height="10vh"
      boxShadow="md"
    >
      <Flex align="center">
        {/* Company Logo */}
        <Image
          src="/images/sppl-logo.png"
          alt="Company Logo"
          boxSize="50px"
          ml="5em"
          cursor="pointer"
          onClick={() => navigate("/")}
        />

        {/* Company Names */}
        <Flex direction="column" ml="4">
          <Text color={palette.primaryText} fontSize="1.2rem" fontFamily="rowdies">
            Sanrachna Prahari Private Limited
          </Text>
          <Text
            fontSize=".8em"
            fontWeight="bold"
            color={"red.500"}
          >
            An IIT Delhi Company
          </Text>
        </Flex>

        <SearchBar />

        <Spacer />

        <IconButton
          color={theme.colors.palette.pink}
          icon={<FaHome size="1.5rem" />}
          variant="ghost"
          aria-label="Home"
          onClick={() => (window.location.href = "https://spplindia.org")}
        />

        <NotificationMenu />

        {isLoggedIn ? (
          userMenu
        ) : (
          <Button colorScheme="teal" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Flex>
    </Box>
  );
};

const Navbar = () => {
  return <NavbarContent />;
};

export default Navbar;