// import { useEffect, useState } from "react";
// import {
//   Box,
//   VStack,
//   useTheme,
//   Button,
//   Collapse,
//   Text,
//   Flex,
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   useDisclosure,
//   useBreakpointValue,
//   Icon,
// } from "@chakra-ui/react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import { MdMenu } from "react-icons/md";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../components/AuthContext";
// const palette = {
//   hover_blue: "blue.500",
//   btn_blue: "blue.600",
//   hover_main_blue: "blue.700",
//   main_blue: "blue.800",
//   white: "white",
// };
// const Transform = (inputData) => {
//   const projects = inputData.projects;
//   const grouped = projects.reduce((acc, project) => {
//     const location = project.project_title;
//     const type = project.structure_type;

//     if (!acc[location]) {
//       acc[location] = {};
//     }

//     if (!acc[location][type]) {
//       acc[location][type] = [];
//     }

//     acc[location][type].push({
//       name: project.structure_name,
//       to: "/project",
//       id: project.id,
//     });

//     return acc;
//   }, {});
//   return Object.entries(grouped).map(([location, types]) => ({
//     type: "dropdown",
//     name: location,
//     children: Object.entries(types).map(([type, children]) => ({
//       type: "dropdown",
//       name: type,
//       children: children,
//     })),
//   }));
// };

// const menuItems = [
//   { type: "link", name: "General", to: "/general" },
//   {
//     type: "dropdown",
//     name: "Project",
//     to: "/projects",
//     children: [],
//   },
//   { type: "link", name: "Design Proof Check", to: "/design-proof-check" },
//   { type: "link", name: "Non-Destructive Evaluation", to: "/non-destructive-evaluation" },
//   { type: "link", name: "Load Testing", to: "/load-testing" },
//   { type: "link", name: "Structural Health Monitoring (SHM)", to: "/structural-health-monitoring" },
//   { type: "link", name: "Advanced Features", to: "/" },
//   { type: "link", name: "Threshold Based Alerts", to: "/" },
//   // { type: "link", name: "Report Generation", to: "/reports" },
//   { type: "link", name: "Contact Us", to: "/contact" },
//   // { type: "link", name: "Settings", to: "/settings" },
// ];

// const DirectLink = ({ name, to, selectedMenu, setSelectedMenu, id, setOpenDropdowns, path }) => {
//   const { user, setUser } = useAuth();
//   const isSelected = selectedMenu === name;

//   const handleClick = () => {
//     setSelectedMenu(name);
//     setOpenDropdowns(path); // Keep only dropdowns in the path open
//     if (id) {
//       setUser((prevUser) => ({
//         ...prevUser,
//         currentProject: id,
//       }));
//     }
//   };

//   return (
//     <NavLink
//       to={to}
//       style={{ width: "100%", textDecoration: "none" }}
//       onClick={handleClick}
//     >
//       {() => (
//         <Flex
//           align="center"
//           p="2"
//           bg={isSelected ? "blue.700" : "transparent"}
//           borderRadius="md"
//           _hover={{ bg: palette.hover_main_blue }}
//         >
//           <Text>{name}</Text>
//         </Flex>
//       )}
//     </NavLink>
//   );
// };


// const DropdownItem = ({
//   name,
//   children: childrenItems,
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   path,
// }) => {
//   const isOpen = openDropdowns.includes(name);
//   const toggleDropdown = () =>
//     setOpenDropdowns(isOpen ? openDropdowns.filter((n) => n !== name) : [...openDropdowns, name]);

//   return (
//     <Box w="100%">
//       <Flex
//         align="center"
//         p="2"
//         cursor="pointer"
//         onClick={toggleDropdown}
//         _hover={{ bg: palette.hover_main_blue, borderRadius: "md" }}
//         bg="transparent"
//         borderRadius="0"
//       >
//         <Text flex="1">{name}</Text>
//         {!isCollapsed && <Icon as={isOpen ? FiChevronUp : FiChevronDown} boxSize="4" />}
//       </Flex>
//       <Collapse in={isOpen} animateOpacity>
//         <VStack align="start" pl="4" spacing="1">
//           {childrenItems.map((child) =>
//             renderMenuItem(
//               child,
//               isCollapsed,
//               openDropdowns,
//               setOpenDropdowns,
//               selectedMenu,
//               setSelectedMenu,
//               [...path, name]
//             )
//           )}
//         </VStack>
//       </Collapse>
//     </Box>
//   );
// };


// const renderMenuItem = (
//   item,
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   path = []
// ) => {
//   if (item.type === "link" || !item.type)
//     return (
//       <DirectLink
//         key={item.name}
//         name={item.name}
//         to={item.to}
//         selectedMenu={selectedMenu}
//         setSelectedMenu={setSelectedMenu}
//         id={item.id}
//         setOpenDropdowns={setOpenDropdowns}
//         path={path}
//       />
//     );
//   if (item.type === "dropdown")
//     return (
//       <DropdownItem
//         key={item.name}
//         name={item.name}
//         children={item.children}
//         isCollapsed={isCollapsed}
//         openDropdowns={openDropdowns}
//         setOpenDropdowns={setOpenDropdowns}
//         selectedMenu={selectedMenu}
//         setSelectedMenu={setSelectedMenu}
//         path={[...path, item.name]}
//       />
//     );
//   return null;
// };


// const SidebarContent = ({
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   projects,
// }) => {
//   const width = isCollapsed ? "0" : "18rem";
//   menuItems[1].children = projects;
//   return (
//     <Box
//       w={width}
//       maxHeight="90vh"
//       bg={palette.main_blue}
//       color={palette.white}
//       overflow="auto"
//       p={isCollapsed ? "0" : "3"}
//       transition="width 0.3s ease-in-out"
//       css={{ "&::-webkit-scrollbar": { width: "4px" } }}
//       borderTopRightRadius="md"
//       borderBottomRightRadius="md"
//     >
//       {!isCollapsed && (
//         <VStack align="start" spacing="5" w="100%">
//           {menuItems.map((item) =>
//             renderMenuItem(
//               item,
//               isCollapsed,
//               openDropdowns,
//               setOpenDropdowns,
//               selectedMenu,
//               setSelectedMenu
//             )
//           )}
//         </VStack>
//       )}
//     </Box>
//   );
// };

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [openDropdowns, setOpenDropdowns] = useState([]);
//   const [selectedMenu, setSelectedMenu] = useState("");
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const isMobile = useBreakpointValue({ base: true, md: false });
//   const theme = useTheme();
//   const { user, setUser } = useAuth();
//   const userEmail = user?.email;
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     if (!userEmail) {
//       console.warn("User email is not available yet.");
//       return;
//     }
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch(
//           `https://spplindia.org/api/fetch_projects.php?email=${encodeURIComponent(userEmail)}`
//         );
//         const data = await response.json();
//         if (data.projects) {
//           console.log("Fetched Projects:", data.projects);
//           setUser((prevUser) => ({
//             ...prevUser,
//             project: data.projects,
//           }));
//           const transformedProjects = Transform(data || {});
//           setProjects(transformedProjects);
//         } else {
//           console.error("Error:", data.error);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     fetchProjects();
//   }, [userEmail]);

//   const handleToggle = () => {
//     isMobile ? onOpen() : setIsCollapsed(!isCollapsed);
//   };
//   return (
//     <>
//       <Button
//         onClick={handleToggle}
//         position="absolute"
//         top="4"
//         left="4"
//         bg={palette.white}
//         color={palette.main_blue}
//         _hover={{ bg: palette.hover_blue, color: palette.white }}
//         zIndex="107"
//       >
//         <MdMenu size="1.5em" />
//       </Button>

//       {!isMobile && (
//         <SidebarContent
//           isCollapsed={isCollapsed}
//           openDropdowns={openDropdowns}
//           setOpenDropdowns={setOpenDropdowns}
//           selectedMenu={selectedMenu}
//           setSelectedMenu={setSelectedMenu}
//           projects={projects}
//         />
//       )}

//       {isMobile && (
//         <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
//           <DrawerOverlay />
//           <DrawerContent bg={theme.colors.palette.primaryBlue} color={palette.white} p="8">
//             <DrawerCloseButton />
//             <SidebarContent
//               isCollapsed={false}
//               openDropdowns={openDropdowns}
//               setOpenDropdowns={setOpenDropdowns}
//               selectedMenu={selectedMenu}
//               setSelectedMenu={setSelectedMenu}
//               projects={projects}
//             />
//           </DrawerContent>
//         </Drawer>
//       )}
//     </>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   VStack,
//   Button,
//   Collapse,
//   Text,
//   Flex,
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   useDisclosure,
//   useBreakpointValue,
//   Icon,
// } from "@chakra-ui/react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import { MdMenu } from "react-icons/md";
// import { NavLink, useLocation } from "react-router-dom";
// import { useAuth } from "../components/AuthContext";

// const palette = {
//   hover_yellow: "yellow.400",
//   btn_yellow: "yellow.500",
//   hover_main_yellow: "yellow.600",
//   main_yellow: "yellow.700",
//   black: "black",
//   white: "white",
// };

// const Transform = (inputData) => {
//   const projects = inputData.projects || [];
//   const grouped = projects.reduce((acc, project) => {
//     const location = project.project_title;
//     const type = project.structure_type;

//     if (!acc[location]) {
//       acc[location] = {};
//     }

//     if (!acc[location][type]) {
//       acc[location][type] = [];
//     }

//     acc[location][type].push({
//       name: project.structure_name,
//       to: "/project",
//       id: project.id,
//     });

//     return acc;
//   }, {});
//   return Object.entries(grouped).map(([location, types]) => ({
//     type: "dropdown",
//     name: location,
//     children: Object.entries(types).map(([type, children]) => ({
//       type: "dropdown",
//       name: type,
//       children: children,
//     })),
//   }));
// };

// const menuItems = [
//   { type: "link", name: "General", to: "/general" },
//   {
//     type: "dropdown",
//     name: "Project",
//     to: "/projects",
//     children: [],
//   },
//   { type: "link", name: "Design Proof Check", to: "/design-proof-check" },
//   { type: "link", name: "Non-Destructive Evaluation", to: "/non-destructive-evaluation" },
//   { type: "link", name: "Load Testing", to: "/load-testing" },
//   { type: "link", name: "Structural Health Monitoring (SHM)", to: "/structural-health-monitoring" },
//   { type: "link", name: "Advanced Features", to: "/" },
//   { type: "link", name: "Threshold Based Alerts", to: "/" },
//   { type: "link", name: "Contact Us", to: "/contact" },
// ];

// const DirectLink = ({ name, to, selectedMenu, setSelectedMenu, id, setOpenDropdowns, path }) => {
//   const { user, setUser } = useAuth();
//   const isSelected = selectedMenu === name;

//   const handleClick = () => {
//     setSelectedMenu(name);
//     setOpenDropdowns(path); // Keep only dropdowns in the path open
//     if (id) {
//       setUser((prevUser) => ({
//         ...prevUser,
//         currentProject: id,
//       }));
//     }
//   };

//   return (
//     <NavLink
//       to={to}
//       style={{ width: "100%", textDecoration: "none" }}
//       onClick={handleClick}
//     >
//       {() => (
//         <Flex
//           align="center"
//           p="2"
//           bg={isSelected ? palette.main_yellow : "transparent"}
//           borderRadius="md"
//           _hover={{ bg: palette.hover_main_yellow, color: palette.black }}
//           color={isSelected ? palette.black : palette.white}
//         >
//           <Text>{name}</Text>
//         </Flex>
//       )}
//     </NavLink>
//   );
// };

// const DropdownItem = ({
//   name,
//   children: childrenItems,
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   path,
// }) => {
//   const isOpen = openDropdowns.includes(name);
//   const toggleDropdown = () =>
//     setOpenDropdowns(isOpen ? openDropdowns.filter((n) => n !== name) : [...openDropdowns, name]);

//   return (
//     <Box w="100%">
//       <Flex
//         align="center"
//         p="2"
//         cursor="pointer"
//         onClick={toggleDropdown}
//         _hover={{ bg: palette.hover_main_yellow, borderRadius: "md", color: palette.black }}
//         bg="transparent"
//         borderRadius="0"
//         color={palette.white}
//       >
//         <Text flex="1">{name}</Text>
//         {!isCollapsed && <Icon as={isOpen ? FiChevronUp : FiChevronDown} boxSize="4" />}
//       </Flex>
//       <Collapse in={isOpen} animateOpacity>
//         <VStack align="start" pl="4" spacing="1">
//           {childrenItems.map((child) =>
//             renderMenuItem(
//               child,
//               isCollapsed,
//               openDropdowns,
//               setOpenDropdowns,
//               selectedMenu,
//               setSelectedMenu,
//               [...path, name]
//             )
//           )}
//         </VStack>
//       </Collapse>
//     </Box>
//   );
// };

// const renderMenuItem = (
//   item,
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   path = []
// ) => {
//   if (item.type === "link" || !item.type)
//     return (
//       <DirectLink
//         key={item.name}
//         name={item.name}
//         to={item.to}
//         selectedMenu={selectedMenu}
//         setSelectedMenu={setSelectedMenu}
//         id={item.id}
//         setOpenDropdowns={setOpenDropdowns}
//         path={path}
//       />
//     );
//   if (item.type === "dropdown")
//     return (
//       <DropdownItem
//         key={item.name}
//         name={item.name}
//         children={item.children}
//         isCollapsed={isCollapsed}
//         openDropdowns={openDropdowns}
//         setOpenDropdowns={setOpenDropdowns}
//         selectedMenu={selectedMenu}
//         setSelectedMenu={setSelectedMenu}
//         path={[...path, item.name]}
//       />
//     );
//   return null;
// };

// const SidebarContent = ({
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   projects,
// }) => {
//   const width = isCollapsed ? "0" : "18rem";
//   menuItems[1].children = projects;

//   return (
//     <Box
//       w={width}
//       maxHeight="90vh"
//       bg={palette.black}
//       color={palette.white}
//       overflow="auto"
//       p={isCollapsed ? "0" : "3"}
//       transition="width 0.3s ease-in-out"
//       css={{ "&::-webkit-scrollbar": { width: "4px" } }}
//       borderTopRightRadius="md"
//       borderBottomRightRadius="md"
//     >
//       {!isCollapsed && (
//         <VStack align="start" spacing="5" w="100%">
//           {menuItems.map((item) =>
//             renderMenuItem(
//               item,
//               isCollapsed,
//               openDropdowns,
//               setOpenDropdowns,
//               selectedMenu,
//               setSelectedMenu
//             )
//           )}
//         </VStack>
//       )}
//     </Box>
//   );
// };

// const Sidebar = () => {
//   const location = useLocation();
//   const [isCollapsed, setIsCollapsed] = useState(location.pathname === "/");
//   const [openDropdowns, setOpenDropdowns] = useState([]);
//   const [selectedMenu, setSelectedMenu] = useState("");
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const isMobile = useBreakpointValue({ base: true, md: false });
//   const { user, setUser } = useAuth();
//   const userEmail = user?.email;
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     // Collapse sidebar if on homepage, expand otherwise
//     if (location.pathname === "/") {
//       setIsCollapsed(true);
//     } else {
//       setIsCollapsed(false);
//     }
//   }, [location.pathname]);

//   useEffect(() => {
//     if (!userEmail) {
//       console.warn("User email is not available yet.");
//       return;
//     }
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch(
//           `https://spplindia.org/api/fetch_projects.php?email=${encodeURIComponent(userEmail)}`
//         );
//         const data = await response.json();
//         if (data.projects) {
//           setUser((prevUser) => ({
//             ...prevUser,
//             project: data.projects,
//           }));
//           const transformedProjects = Transform(data || {});
//           setProjects(transformedProjects);
//         } else {
//           console.error("Error:", data.error);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     fetchProjects();
//   }, [userEmail, setUser]);

//   const handleToggle = () => {
//     isMobile ? onOpen() : setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <>
//       <Button
//         onClick={handleToggle}
//         position="absolute"
//         top="4"
//         left="4"
//         bg={palette.yellow}
//         color={palette.black}
//         _hover={{ bg: palette.hover_yellow, color: palette.black }}
//         zIndex="107"
//       >
//         <MdMenu size="1.5em" />
//       </Button>

//       {!isMobile && (
//         <SidebarContent
//           isCollapsed={isCollapsed}
//           openDropdowns={openDropdowns}
//           setOpenDropdowns={setOpenDropdowns}
//           selectedMenu={selectedMenu}
//           setSelectedMenu={setSelectedMenu}
//           projects={projects}
//         />
//       )}

//       {isMobile && (
//         <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
//           <DrawerOverlay />
//           <DrawerContent bg={palette.black} color={palette.white} p="8">
//             <DrawerCloseButton />
//             <SidebarContent
//               isCollapsed={false}
//               openDropdowns={openDropdowns}
//               setOpenDropdowns={setOpenDropdowns}
//               selectedMenu={selectedMenu}
//               setSelectedMenu={setSelectedMenu}
//               projects={projects}
//             />
//           </DrawerContent>
//         </Drawer>
//       )}
//     </>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { keyframes } from "@emotion/react";

// import {
//   Box,
//   VStack,
//   Button,
//   Collapse,
//   Text,
//   Flex,
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   useDisclosure,
//   useBreakpointValue,
//   Icon,
// } from "@chakra-ui/react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import { MdMenu } from "react-icons/md";
// import { NavLink, useLocation } from "react-router-dom";
// import { useAuth } from "../components/AuthContext";

// // Yellow/black/white color palette
// const palette = {
//   hover_yellow: "yellow.400",
//   btn_yellow: "yellow.500",
//   hover_main_yellow: "yellow.600",
//   main_yellow: "yellow.700",
//   black: "black",
//   white: "white",
// };

// // Sliding background keyframes (left to right)
// const slideBg = keyframes`
//   0% {
//     background-position: -100% 0;
//   }
//   100% {
//     background-position: 100% 0;
//   }
// `;

// // Hamburger Button with sliding yellow background on hover
// const HamburgerButton = ({ onClick }) => {
//   return (

//     <Button
//       onClick={onClick}
//       position="absolute"
//       top="4"
//       left="4"
//       bg="transparent"
//       color={palette.black}              // Initially black
//       _hover={{
//         color: palette.main_yellow,      // Icon turns yellow on hover
//         bgGradient: "linear(to-r, transparent 0%, yellow.400 50%, transparent 100%)",
//         bgSize: "200% 100%",
//         animation: `${slideBg} 1.5s linear forwards`, // slide once on hover
//       }}
//       _active={{
//         bg: palette.main_yellow,
//         color: palette.black,
//       }}
//       transition="color 0.3s ease"
//       zIndex="107"
//       borderRadius="md"
//       p="2"
//       _focus={{ boxShadow: "none" }}
//       aria-label="Toggle menu"
//     >
//       <MdMenu size="1.5em" />
//     </Button>

    
//   );
// };

// const Transform = (inputData) => {
//   const projects = inputData.projects || [];
//   const grouped = projects.reduce((acc, project) => {
//     const location = project.project_title;
//     const type = project.structure_type;

//     if (!acc[location]) {
//       acc[location] = {};
//     }

//     if (!acc[location][type]) {
//       acc[location][type] = [];
//     }

//     acc[location][type].push({
//       name: project.structure_name,
//       to: "/project",
//       id: project.id,
//     });

//     return acc;
//   }, {});
//   return Object.entries(grouped).map(([location, types]) => ({
//     type: "dropdown",
//     name: location,
//     children: Object.entries(types).map(([type, children]) => ({
//       type: "dropdown",
//       name: type,
//       children: children,
//     })),
//   }));
// };

// const menuItems = [
//   { type: "link", name: "Home", to: "/" },
//   { type: "link", name: "General", to: "/general" },

//   {
//     type: "dropdown",
//     name: "Project",
//     to: "/projects",
//     children: [],
//   },
//   { type: "link", name: "Design Proof Check", to: "/design-proof-check" },
//   { type: "link", name: "Non-Destructive Evaluation", to: "/non-destructive-evaluation" },
//   { type: "link", name: "Load Testing", to: "/load-testing" },
//   { type: "link", name: "Structural Health Monitoring (SHM)", to: "/structural-health-monitoring" },
//   { type: "link", name: "Advanced Features", to: "/" },
//   { type: "link", name: "Threshold Based Alerts", to: "/" },
//   { type: "link", name: "Contact Us", to: "/contact" },
// ];

// const DirectLink = ({ name, to, selectedMenu, setSelectedMenu, id, setOpenDropdowns, path }) => {
//   const { user, setUser } = useAuth();
//   const isSelected = selectedMenu === name;

//   const handleClick = () => {
//     setSelectedMenu(name);
//     setOpenDropdowns(path); // Keep only dropdowns in the path open
//     if (id) {
//       setUser((prevUser) => ({
//         ...prevUser,
//         currentProject: id,
//       }));
//     }
//   };

//   return (
//     <NavLink
//       to={to}
//       style={{ width: "100%", textDecoration: "none" }}
//       onClick={handleClick}
//     >
//       {() => (
//         <Flex
//           align="center"
//           p="2"
//           bg={isSelected ? palette.main_yellow : "transparent"}
//           borderRadius="md"
//           _hover={{ bg: palette.hover_main_yellow }}
//           color={isSelected ? palette.black : palette.white}
//         >
//           <Text>{name}</Text>
//         </Flex>
//       )}
//     </NavLink>
//   );
// };

// const DropdownItem = ({
//   name,
//   children: childrenItems,
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   path,
// }) => {
//   const isOpen = openDropdowns.includes(name);
//   const toggleDropdown = () =>
//     setOpenDropdowns(isOpen ? openDropdowns.filter((n) => n !== name) : [...openDropdowns, name]);

//   return (
//     <Box w="100%">
//       <Flex
//         align="center"
//         p="2"
//         cursor="pointer"
//         onClick={toggleDropdown}
//         _hover={{ bg: palette.hover_main_yellow, borderRadius: "md" }}
//         bg="transparent"
//         borderRadius="0"
//         color={palette.white}
//       >
//         <Text flex="1">{name}</Text>
//         {!isCollapsed && <Icon as={isOpen ? FiChevronUp : FiChevronDown} boxSize="4" />}
//       </Flex>
//       <Collapse in={isOpen} animateOpacity>
//         <VStack align="start" pl="4" spacing="1">
//           {childrenItems.map((child) =>
//             renderMenuItem(
//               child,
//               isCollapsed,
//               openDropdowns,
//               setOpenDropdowns,
//               selectedMenu,
//               setSelectedMenu,
//               [...path, name]
//             )
//           )}
//         </VStack>
//       </Collapse>
//     </Box>
//   );
// };

// const renderMenuItem = (
//   item,
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   path = []
// ) => {
//   if (item.type === "link" || !item.type)
//     return (
//       <DirectLink
//         key={item.name}
//         name={item.name}
//         to={item.to}
//         selectedMenu={selectedMenu}
//         setSelectedMenu={setSelectedMenu}
//         id={item.id}
//         setOpenDropdowns={setOpenDropdowns}
//         path={path}
//       />
//     );
//   if (item.type === "dropdown")
//     return (
//       <DropdownItem
//         key={item.name}
//         name={item.name}
//         children={item.children}
//         isCollapsed={isCollapsed}
//         openDropdowns={openDropdowns}
//         setOpenDropdowns={setOpenDropdowns}
//         selectedMenu={selectedMenu}
//         setSelectedMenu={setSelectedMenu}
//         path={[...path, item.name]}
//       />
//     );
//   return null;
// };

// const SidebarContent = ({
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   projects,
// }) => {
//   const width = isCollapsed ? "0" : "18rem";
//   menuItems[1].children = projects;
//   return (
//     <Box
//       w={width}
//       maxHeight="90vh"
//       bg={palette.black}
//       color={palette.white}
//       overflow="auto"
//       p={isCollapsed ? "0" : "3"}
//       transition="width 0.3s ease-in-out"
//       css={{ "&::-webkit-scrollbar": { width: "4px" } }}
//       borderTopRightRadius="md"
//       borderBottomRightRadius="md"
//     >
//       {!isCollapsed && (
//         <VStack align="start" spacing="5" w="100%">
//           {menuItems.map((item) =>
//             renderMenuItem(
//               item,
//               isCollapsed,
//               openDropdowns,
//               setOpenDropdowns,
//               selectedMenu,
//               setSelectedMenu
//             )
//           )}
//         </VStack>
//       )}
//     </Box>
//   );
// };

// const Sidebar = () => {
//   const location = useLocation();
//   const [isCollapsed, setIsCollapsed] = useState(location.pathname === "/");
//   const [openDropdowns, setOpenDropdowns] = useState([]);
//   const [selectedMenu, setSelectedMenu] = useState("");
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const isMobile = useBreakpointValue({ base: true, md: false });
//   const { user, setUser } = useAuth();
//   const userEmail = user?.email;
//   const [projects, setProjects] = useState([]);

//   // Collapse sidebar on home page, expand otherwise
//   useEffect(() => {
//     if (location.pathname === "/") {
//       setIsCollapsed(true);
//     } else {
//       setIsCollapsed(false);
//     }
//   }, [location.pathname]);

//   // Fetch projects from API
//   useEffect(() => {
//     if (!userEmail) return;

//     const fetchProjects = async () => {
//       try {
//         const response = await fetch(
//           `https://spplindia.org/api/fetch_projects.php?email=${encodeURIComponent(userEmail)}`
//         );
//         const data = await response.json();
//         if (data.projects) {
//           setUser((prevUser) => ({
//             ...prevUser,
//             project: data.projects,
//           }));
//           const transformedProjects = Transform(data || {});
//           setProjects(transformedProjects);
//         } else {
//           console.error("Error:", data.error);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     fetchProjects();
//   }, [userEmail, setUser]);

//   const handleToggle = () => {
//     if (isMobile) {
//       onOpen();
//     } else {
//       setIsCollapsed(!isCollapsed);
//     }
//   };

//   return (
//     <>
//       <HamburgerButton onClick={handleToggle} />

//       {!isMobile && (
//         <SidebarContent
//           isCollapsed={isCollapsed}
//           openDropdowns={openDropdowns}
//           setOpenDropdowns={setOpenDropdowns}
//           selectedMenu={selectedMenu}
//           setSelectedMenu={setSelectedMenu}
//           projects={projects}
//         />
//       )}

//       {isMobile && (
//         <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
//           <DrawerOverlay />
//           <DrawerContent bg={palette.black} color={palette.white} p="8">
//             <DrawerCloseButton />
//             <SidebarContent
//               isCollapsed={false}
//               openDropdowns={openDropdowns}
//               setOpenDropdowns={setOpenDropdowns}
//               selectedMenu={selectedMenu}
//               setSelectedMenu={setSelectedMenu}
//               projects={projects}
//             />
//           </DrawerContent>
//         </Drawer>
//       )}
//     </>
//   );
// };

// export default Sidebar;



// import React, { useState, useEffect } from "react";
// import { keyframes } from "@emotion/react";

// import {
//   Box,
//   VStack,
//   Button,
//   Collapse,
//   Text,
//   Flex,
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   useDisclosure,
//   useBreakpointValue,
//   Icon,
// } from "@chakra-ui/react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import { MdMenu } from "react-icons/md";
// import { NavLink, useLocation } from "react-router-dom";
// import { useAuth } from "../components/AuthContext";

// // Yellow/black/white color palette
// const palette = {
//   hover_yellow: "yellow.400",
//   btn_yellow: "yellow.500",
//   hover_main_yellow: "yellow.600",
//   main_yellow: "yellow.700",
//   black: "black",
//   white: "white",
//   grayText: "gray.200",
// };

// // Sliding background keyframes (left to right)
// const slideBg = keyframes`
//   0% {
//     background-position: -100% 0;
//   }
//   100% {
//     background-position: 100% 0;
//   }
// `;

// // Hamburger Button with sliding yellow background on hover
// const HamburgerButton = ({ onClick }) => {
//   return (
//     <Button
//       onClick={onClick}
//       position="absolute"
//       top="4"
//       left="4"
//       bg="black"
//       color={palette.white}
//       _hover={{
//         color: palette.main_yellow,
//         bgGradient:
//           "linear(to-r, transparent 0%, yellow.400 50%, transparent 100%)",
//         bgSize: "200% 100%",
//         animation: `${slideBg} 1s linear forwards`,
//       }}
//       _active={{
//         bg: palette.main_yellow,
//         color: palette.black,
//       }}
//       transition="color 0.3s ease"
//       zIndex="107"
//       borderRadius="md"
//       p="2"
//       _focus={{ boxShadow: "none" }}
//     >
//       <MdMenu size="1.5em" />
//     </Button>
//   );
// };

// const Transform = (inputData) => {
//   const projects = inputData.projects || [];
//   const grouped = projects.reduce((acc, project) => {
//     const location = project.project_title;
//     const type = project.structure_type;

//     if (!acc[location]) {
//       acc[location] = {};
//     }

//     if (!acc[location][type]) {
//       acc[location][type] = [];
//     }

//     acc[location][type].push({
//       name: project.structure_name,
//       to: "/project",
//       id: project.id,
//     });

//     return acc;
//   }, {});
//   return Object.entries(grouped).map(([location, types]) => ({
//     type: "dropdown",
//     name: location,
//     children: Object.entries(types).map(([type, children]) => ({
//       type: "dropdown",
//       name: type,
//       children: children,
//     })),
//   }));
// };

// // Add Home button at top of General submenu
// const menuItems = [
//   { type: "link", name: "Home", to: "/" },       // <-- Home button added here
//   { type: "link", name: "General", to: "/general" },
//   {
//     type: "dropdown",
//     name: "Project",
//     to: "/projects",
//     children: [],
//   },
//   { type: "link", name: "Design Proof Check", to: "/design-proof-check" },
//   { type: "link", name: "Non-Destructive Evaluation", to: "/non-destructive-evaluation" },
//   { type: "link", name: "Load Testing", to: "/load-testing" },
//   { type: "link", name: "Structural Health Monitoring (SHM)", to: "/structural-health-monitoring" },
//   { type: "link", name: "Report Generation", to: "/structural-health-monitoring" },
//   { type: "link", name: "Advanced Features", to: "/" },
//   { type: "link", name: "Threshold Based Alerts", to: "/" },
//   { type: "link", name: "Contact Us", to: "/contact" },
// ];

// const DirectLink = ({
//   name,
//   to,
//   selectedMenu,
//   setSelectedMenu,
//   id,
//   setOpenDropdowns,
//   path,
// }) => {
//   const { user, setUser } = useAuth();
//   const isSelected = selectedMenu === name;

//   const handleClick = () => {
//     setSelectedMenu(name);
//     setOpenDropdowns(path); // Keep only dropdowns in the path open
//     if (id) {
//       setUser((prevUser) => ({
//         ...prevUser,
//         currentProject: id,
//       }));
//     }
//   };

//   return (
//     <NavLink
//       to={to}
//       style={{ width: "100%", textDecoration: "none" }}
//       onClick={handleClick}
//     >
//       {() => (
//         <Flex
//           align="center"
//           p="2"
//           bg={isSelected ? palette.main_yellow : "transparent"}
//           borderRadius="md"
//           _hover={{ bg: palette.hover_main_yellow }}
//           color={isSelected ? palette.black : palette.grayText}
//           fontWeight={isSelected ? "semibold" : "normal"}
//           transition="color 0.3s ease, background-color 0.3s ease"
//         >
//           <Text>{name}</Text>
//         </Flex>
//       )}
//     </NavLink>
//   );
// };

// const DropdownItem = ({
//   name,
//   children: childrenItems,
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   path,
// }) => {
//   const isOpen = openDropdowns.includes(name);
//   const toggleDropdown = () =>
//     setOpenDropdowns(
//       isOpen ? openDropdowns.filter((n) => n !== name) : [...openDropdowns, name]
//     );

//   return (
//     <Box w="100%">
//       <Flex
//         align="center"
//         p="2"
//         cursor="pointer"
//         onClick={toggleDropdown}
//         _hover={{ bg: palette.hover_main_yellow, borderRadius: "md" }}
//         bg="transparent"
//         borderRadius="0"
//         color={palette.white}
//         fontWeight="semibold"
//       >
//         <Text flex="1">{name}</Text>
//         {!isCollapsed && (
//           <Icon as={isOpen ? FiChevronUp : FiChevronDown} boxSize="4" />
//         )}
//       </Flex>
//       <Collapse in={isOpen} animateOpacity>
//         <VStack align="start" pl="4" spacing="1">
//           {childrenItems.map((child) =>
//             renderMenuItem(
//               child,
//               isCollapsed,
//               openDropdowns,
//               setOpenDropdowns,
//               selectedMenu,
//               setSelectedMenu,
//               [...path, name]
//             )
//           )}
//         </VStack>
//       </Collapse>
//     </Box>
//   );
// };

// const renderMenuItem = (
//   item,
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   path = []
// ) => {
//   if (item.type === "link" || !item.type)
//     return (
//       <DirectLink
//         key={item.name}
//         name={item.name}
//         to={item.to}
//         selectedMenu={selectedMenu}
//         setSelectedMenu={setSelectedMenu}
//         id={item.id}
//         setOpenDropdowns={setOpenDropdowns}
//         path={path}
//       />
//     );
//   if (item.type === "dropdown")
//     return (
//       <DropdownItem
//         key={item.name}
//         name={item.name}
//         children={item.children}
//         isCollapsed={isCollapsed}
//         openDropdowns={openDropdowns}
//         setOpenDropdowns={setOpenDropdowns}
//         selectedMenu={selectedMenu}
//         setSelectedMenu={setSelectedMenu}
//         path={[...path, item.name]}
//       />
//     );
//   return null;
// };

// const SidebarContent = ({
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   projects,
// }) => {
//   const width = isCollapsed ? "0" : "18rem";
//   menuItems[2].children = projects; // Project submenu populated

//   return (
//     <Box
//       w={width}
//       maxHeight="90vh"
//       bg={palette.black}
//       color={palette.white}
//       overflow="auto"
//       p={isCollapsed ? "0" : "3"}
//       transition="width 0.3s ease-in-out"
//       css={{ "&::-webkit-scrollbar": { width: "4px" } }}
//       borderTopRightRadius="md"
//       borderBottomRightRadius="md"
//     >
//       {!isCollapsed && (
//         <VStack align="start" spacing="5" w="100%">
//           {menuItems.map((item) =>
//             renderMenuItem(
//               item,
//               isCollapsed,
//               openDropdowns,
//               setOpenDropdowns,
//               selectedMenu,
//               setSelectedMenu
//             )
//           )}
//         </VStack>
//       )}
//     </Box>
//   );
// };

// const Sidebar = () => {
//   const location = useLocation();
//   const [isCollapsed, setIsCollapsed] = useState(location.pathname === "/");
//   const [openDropdowns, setOpenDropdowns] = useState([]);
//   const [selectedMenu, setSelectedMenu] = useState("");
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const isMobile = useBreakpointValue({ base: true, md: false });
//   const { user, setUser } = useAuth();
//   const userEmail = user?.email;
//   const [projects, setProjects] = useState([]);

//   // Collapse sidebar on home page, expand otherwise
//   useEffect(() => {
//     if (location.pathname === "/") {
//       setIsCollapsed(true);
//     } else {
//       setIsCollapsed(false);
//     }
//   }, [location.pathname]);

//   // Sync selected menu with current path so selection updates on route change
//   useEffect(() => {
//     const pathToNameMap = {
//       "/": "Home",
//       "/general": "General",
//       "/projects": "Project",
//       "/design-proof-check": "Design Proof Check",
//       "/non-destructive-evaluation": "Non-Destructive Evaluation",
//       "/load-testing": "Load Testing",
//       "/structural-health-monitoring": "Structural Health Monitoring (SHM)",
//       "/contact": "Contact Us",
//       // Add other mappings as necessary
//     };

//     setSelectedMenu(pathToNameMap[location.pathname] || "");
//   }, [location.pathname]);

//   // Fetch projects from API
//   useEffect(() => {
//     if (!userEmail) return;

//     const fetchProjects = async () => {
//       try {
//         const response = await fetch(
//           `https://spplindia.org/api/fetch_projects.php?email=${encodeURIComponent(
//             userEmail
//           )}`
//         );
//         const data = await response.json();
//         if (data.projects) {
//           setUser((prevUser) => ({
//             ...prevUser,
//             project: data.projects,
//           }));
//           const transformedProjects = Transform(data || {});
//           setProjects(transformedProjects);
//         } else {
//           console.error("Error:", data.error);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     fetchProjects();
//   }, [userEmail, setUser]);

//   const handleToggle = () => {
//     if (isMobile) {
//       onOpen();
//     } else {
//       setIsCollapsed(!isCollapsed);
//     }
//   };

//   return (
//     <>
//       <HamburgerButton onClick={handleToggle} />

//       {!isMobile && (
//         <SidebarContent
//           isCollapsed={isCollapsed}
//           openDropdowns={openDropdowns}
//           setOpenDropdowns={setOpenDropdowns}
//           selectedMenu={selectedMenu}
//           setSelectedMenu={setSelectedMenu}
//           projects={projects}
//         />
//       )}

//       {isMobile && (
//         <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
//           <DrawerOverlay />
//           <DrawerContent bg={palette.black} color={palette.white} p="8">
//             <DrawerCloseButton />
//             <SidebarContent
//               isCollapsed={false}
//               openDropdowns={openDropdowns}
//               setOpenDropdowns={setOpenDropdowns}
//               selectedMenu={selectedMenu}
//               setSelectedMenu={setSelectedMenu}
//               projects={projects}
//             />
//           </DrawerContent>
//         </Drawer>
//       )}
//     </>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { keyframes } from "@emotion/react";

// import {
//   Box,
//   VStack,
//   Button,
//   Collapse,
//   Text,
//   Flex,
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   useDisclosure,
//   useBreakpointValue,
//   Icon,
// } from "@chakra-ui/react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import { MdMenu } from "react-icons/md";
// import { NavLink, useLocation } from "react-router-dom";
// import { useAuth } from "../components/AuthContext";

// // Yellow/black/white color palette
// const palette = {
//   hover_yellow: "yellow.400",
//   btn_yellow: "yellow.500",
//   hover_main_yellow: "yellow.600",
//   main_yellow: "yellow.700",
//   black: "black",
//   white: "white",
//   grayText: "gray.200",
// };

// // Sliding background keyframes (left to right)
// const slideBg = keyframes`
//   0% { background-position: -100% 0; }
//   100% { background-position: 100% 0; }
// `;

// // Hamburger Button with sliding yellow background on hover
// const HamburgerButton = ({ onClick }) => {
//   return (
//     <Button
//       onClick={onClick}
//       position="absolute"
//       top="4"
//       left="4"
//       bg="black"
//       color={palette.white}
//       _hover={{
//         color: palette.main_yellow,
//         bgGradient:
//           "linear(to-r, transparent 0%, yellow.400 50%, transparent 100%)",
//         bgSize: "200% 100%",
//         animation: `${slideBg} 1s linear forwards`,
//       }}
//       _active={{
//         bg: palette.main_yellow,
//         color: palette.black,
//       }}
//       transition="color 0.3s ease"
//       zIndex="107"
//       borderRadius="md"
//       p="2"
//       _focus={{ boxShadow: "none" }}
//     >
//       <MdMenu size="1.5em" />
//     </Button>
//   );
// };

// const Transform = (inputData) => {
//   const projects = inputData.projects || [];
//   const grouped = projects.reduce((acc, project) => {
//     const location = project.project_title;
//     const type = project.structure_type;

//     if (!acc[location]) acc[location] = {};
//     if (!acc[location][type]) acc[location][type] = [];

//     acc[location][type].push({
//       name: project.structure_name,
//       to: "/project",
//       id: project.id,
//     });

//     return acc;
//   }, {});
//   return Object.entries(grouped).map(([location, types]) => ({
//     type: "dropdown",
//     name: location,
//     children: Object.entries(types).map(([type, children]) => ({
//       type: "dropdown",
//       name: type,
//       children: children,
//     })),
//   }));
// };

// // Sidebar menu items (base)
// // const menuItems = [
// //   { type: "link", name: "Home", to: "/" },
// //   { type: "link", name: "General", to: "/general" },
// //   {
// //     type: "dropdown",
// //     name: "Project",
// //     to: "/projects",
// //     children: [], // will be injected: Add Project + dynamic projects
// //   },
// //   { type: "link", name: "Design Proof Check", to: "/design-proof-check" },
// //   { type: "link", name: "Non-Destructive Evaluation", to: "/non-destructive-evaluation" },
// //   { type: "link", name: "Load Testing", to: "/load-testing" },
// //   { type: "link", name: "Structural Health Monitoring (SHM)", to: "/structural-health-monitoring" },
// //   // UPDATED: send to the section inside SHM
// //   { type: "link", name: "Report Generation", to: "/structural-health-monitoring#report-generation" },
// //   { type: "link", name: "Advanced Features", to: "/" },
// //   { type: "link", name: "Threshold Based Alerts", to: "/" },
// //   { type: "link", name: "Contact Us", to: "/contact" },

// // ];

// // Menu Items Configuration
// const menuItems = [
//   { type: "link", name: "Home", to: "/" },
//   { type: "link", name: "General", to: "/general" },

//   // {
//   //   type: "dropdown",
//   //   name: "Project",
//   //   to: "/projects",
//   //   children: [
//   //     { type: "link", name: "Add Project", to: "/projects/add" },
//   //     // Dynamic projects can be injected here from state or props:
//   //     // Example:
//   //     // { type: "link", name: "Project Alpha", to: "/projects/1" },
//   //   ],
//   // },

//   {
//   type: "dropdown",
//   name: "Project",
//   to: "/projects",
//   children: [
//     { type: "link", name: "➕ Add Project", to: "/add-project" },
//     ...(projects || []),
//   ],
// },

//   { type: "link", name: "Design Proof Check", to: "/design-proof-check" },
//   { type: "link", name: "Non-Destructive Evaluation", to: "/non-destructive-evaluation" },
//   { type: "link", name: "Load Testing", to: "/load-testing" },
//   { type: "link", name: "Structural Health Monitoring (SHM)", to: "/structural-health-monitoring" },

//   // This will scroll to the report section of SHM page
//   { type: "link", name: "Report Generation", to: "/structural-health-monitoring#report" },

//   { type: "link", name: "Advanced Features", to: "/" },
//   { type: "link", name: "Threshold Based Alerts", to: "/" },
//   { type: "link", name: "Contact Us", to: "/contact" },
// ];




// const DirectLink = ({
//   name,
//   to,
//   selectedMenu,
//   setSelectedMenu,
//   id,
//   setOpenDropdowns,
//   path,
// }) => {
//   const { user, setUser } = useAuth();
//   const isSelected = selectedMenu === name;

//   const handleClick = () => {
//     setSelectedMenu(name);
//     setOpenDropdowns(path);

//     // Persist current project if it's a project link
//     if (id) {
//       setUser((prevUser) => ({
//         ...prevUser,
//         currentProject: id,
//       }));
//     }

//     // If clicking top-level "Report Generation", no dropdown to open,
//     // route already includes #report-generation (handled by NavLink).
//   };

//   return (
//     <NavLink
//       to={to}
//       style={{ width: "100%", textDecoration: "none" }}
//       onClick={handleClick}
//     >
//       {() => (
//         <Flex
//           align="center"
//           p="2"
//           bg={isSelected ? palette.main_yellow : "transparent"}
//           borderRadius="md"
//           _hover={{ bg: palette.hover_main_yellow }}
//           color={isSelected ? palette.black : palette.grayText}
//           fontWeight={isSelected ? "semibold" : "normal"}
//           transition="color 0.3s ease, background-color 0.3s ease"
//         >
//           <Text>{name}</Text>
//         </Flex>
//       )}
//     </NavLink>
//   );
// };

// const DropdownItem = ({
//   name,
//   children: childrenItems,
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   path,
// }) => {
//   const isOpen = openDropdowns.includes(name);
//   const toggleDropdown = () =>
//     setOpenDropdowns(
//       isOpen ? openDropdowns.filter((n) => n !== name) : [...openDropdowns, name]
//     );

//   return (
//     <Box w="100%">
//       <Flex
//         align="center"
//         p="2"
//         cursor="pointer"
//         onClick={toggleDropdown}
//         _hover={{ bg: palette.hover_main_yellow, borderRadius: "md" }}
//         bg="transparent"
//         borderRadius="0"
//         color={palette.white}
//         fontWeight="semibold"
//       >
//         <Text flex="1">{name}</Text>
//         {!isCollapsed && (
//           <Icon as={isOpen ? FiChevronUp : FiChevronDown} boxSize="4" />
//         )}
//       </Flex>
//       <Collapse in={isOpen} animateOpacity>
//         <VStack align="start" pl="4" spacing="1">
//           {childrenItems.map((child) =>
//             renderMenuItem(
//               child,
//               isCollapsed,
//               openDropdowns,
//               setOpenDropdowns,
//               selectedMenu,
//               setSelectedMenu,
//               [...path, name]
//             )
//           )}
//         </VStack>
//       </Collapse>
//     </Box>
//   );
// };

// const renderMenuItem = (
//   item,
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   path = []
// ) => {
//   if (item.type === "link" || !item.type)
//     return (
//       <DirectLink
//         key={item.name}
//         name={item.name}
//         to={item.to}
//         selectedMenu={selectedMenu}
//         setSelectedMenu={setSelectedMenu}
//         id={item.id}
//         setOpenDropdowns={setOpenDropdowns}
//         path={path}
//       />
//     );
//   if (item.type === "dropdown")
//     return (
//       <DropdownItem
//         key={item.name}
//         name={item.name}
//         children={item.children}
//         isCollapsed={isCollapsed}
//         openDropdowns={openDropdowns}
//         setOpenDropdowns={setOpenDropdowns}
//         selectedMenu={selectedMenu}
//         setSelectedMenu={setSelectedMenu}
//         path={[...path, item.name]}
//       />
//     );
//   return null;
// };

// const SidebarContent = ({
//   isCollapsed,
//   openDropdowns,
//   setOpenDropdowns,
//   selectedMenu,
//   setSelectedMenu,
//   projects,
// }) => {
//   const width = isCollapsed ? "0" : "18rem";

//   // 🔸 Inject "Add Project" at the top of Project dropdown, then dynamic projects
//   menuItems[2].children = [
//     { type: "link", name: "➕ Add Project", to: "/add-project" },
//     ...(projects || []),
//   ];

//   return (
//     <Box
//       w={width}
//       maxHeight="90vh"
//       bg={palette.black}
//       color={palette.white}
//       overflow="auto"
//       p={isCollapsed ? "0" : "3"}
//       transition="width 0.3s ease-in-out"
//       css={{ "&::-webkit-scrollbar": { width: "4px" } }}
//       borderTopRightRadius="md"
//       borderBottomRightRadius="md"
//     >
//       {!isCollapsed && (
//         <VStack align="start" spacing="5" w="100%">
//           {menuItems.map((item) =>
//             renderMenuItem(
//               item,
//               isCollapsed,
//               openDropdowns,
//               setOpenDropdowns,
//               selectedMenu,
//               setSelectedMenu
//             )
//           )}
//         </VStack>
//       )}
//     </Box>
//   );
// };

// const Sidebar = () => {
//   const location = useLocation();
//   const [isCollapsed, setIsCollapsed] = useState(location.pathname === "/");
//   const [openDropdowns, setOpenDropdowns] = useState([]);
//   const [selectedMenu, setSelectedMenu] = useState("");
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const isMobile = useBreakpointValue({ base: true, md: false });
//   const { user, setUser } = useAuth();
//   const userEmail = user?.email;
//   const [projects, setProjects] = useState([]);

//   // Collapse on home, expand otherwise
//   useEffect(() => {
//     if (location.pathname === "/") setIsCollapsed(true);
//     else setIsCollapsed(false);
//   }, [location.pathname]);

//   // Sync selected menu with current path
//   useEffect(() => {
//     const pathToNameMap = {
//       "/": "Home",
//       "/general": "General",
//       "/projects": "Project",
//       "/design-proof-check": "Design Proof Check",
//       "/non-destructive-evaluation": "Non-Destructive Evaluation",
//       "/load-testing": "Load Testing",
//       "/structural-health-monitoring": "Structural Health Monitoring (SHM)",
//       "/contact": "Contact Us",
//     };
//     setSelectedMenu(pathToNameMap[location.pathname] || "");
//   }, [location.pathname]);

//   // Fetch projects from API and transform for sidebar
//   useEffect(() => {
//     if (!userEmail) return;

//     const fetchProjects = async () => {
//       try {
//         const response = await fetch(
//           `https://spplindia.org/api/fetch_projects.php?email=${encodeURIComponent(
//             userEmail
//           )}`
//         );
//         const data = await response.json();
//         if (data.projects) {
//           setUser((prevUser) => ({
//             ...prevUser,
//             project: data.projects,
//           }));
//           const transformedProjects = Transform(data || {});
//           setProjects(transformedProjects);
//         } else {
//           console.error("Error:", data.error);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     fetchProjects();
//   }, [userEmail, setUser]);

//   const handleToggle = () => {
//     if (isMobile) onOpen();
//     else setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <>
//       <HamburgerButton onClick={handleToggle} />

//       {!isMobile && (
//         <SidebarContent
//           isCollapsed={isCollapsed}
//           openDropdowns={openDropdowns}
//           setOpenDropdowns={setOpenDropdowns}
//           selectedMenu={selectedMenu}
//           setSelectedMenu={setSelectedMenu}
//           projects={projects}
//         />
//       )}

//       {isMobile && (
//         <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
//           <DrawerOverlay />
//           <DrawerContent bg={palette.black} color={palette.white} p="8">
//             <DrawerCloseButton />
//             <SidebarContent
//               isCollapsed={false}
//               openDropdowns={openDropdowns}
//               setOpenDropdowns={setOpenDropdowns}
//               selectedMenu={selectedMenu}
//               setSelectedMenu={setSelectedMenu}
//               projects={projects}
          
//             />
//           </DrawerContent>
//         </Drawer>
//       )}
//     </>
//   );
// };

// export default Sidebar;


// Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Box, VStack, Flex, Collapse, Icon, Text, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { keyframes } from "@emotion/react";

// Color palette
const palette = {
  hover_yellow: "yellow.400",
  btn_yellow: "yellow.500",
  hover_main_yellow: "yellow.600",
  main_yellow: "yellow.700",
  black: "black",
  white: "white",
  grayText: "gray.200",
};

// Sliding background keyframes
const slideBg = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 100% 0; }
`;

// Hamburger Button
const HamburgerButton = ({ onClick }) => (
  <Box position="absolute" top="4" left="4" zIndex="107">
    <Box
      as="button"
      onClick={onClick}
      bg="black"
      color={palette.white}
      _hover={{
        color: palette.main_yellow,
        bgGradient: "linear(to-r, transparent 0%, yellow.400 50%, transparent 100%)",
        bgSize: "200% 100%",
        animation: `${slideBg} 1s linear forwards`,
      }}
      _active={{
        bg: palette.main_yellow,
        color: palette.black,
      }}
      borderRadius="md"
      p="2"
    >
      <MdMenu size="1.5em" />
    </Box>
  </Box>
);

// Transform API projects for sidebar
const Transform = (inputData) => {
  const projects = inputData.projects || [];
  const grouped = projects.reduce((acc, project) => {
    const location = project.project_title;
    const type = project.structure_type;

    if (!acc[location]) acc[location] = {};
    if (!acc[location][type]) acc[location][type] = [];

    acc[location][type].push({
      name: project.structure_name,
      to: "/project",
      id: project.id,
    });

    return acc;
  }, {});
  return Object.entries(grouped).map(([location, types]) => ({
    type: "dropdown",
    name: location,
    children: Object.entries(types).map(([type, children]) => ({
      type: "dropdown",
      name: type,
      children: children,
    })),
  }));
};

// Sidebar menu items base
const baseMenuItems = [
  { type: "link", name: "Home", to: "/" },
  { type: "link", name: "General", to: "/general" },
  {
    type: "dropdown",
    name: "Project",
    to: "/projects",
    children: [], // will inject Add Project + dynamic projects
  },
  { type: "link", name: "Design Proof Check", to: "/design-proof-check" },
  { type: "link", name: "Non-Destructive Evaluation", to: "/non-destructive-evaluation" },
  { type: "link", name: "Load Testing", to: "/load-testing" },
  { type: "link", name: "Structural Health Monitoring (SHM)", to: "/structural-health-monitoring" },
  { type: "link", name: "Report Generation", to: "/structural-health-monitoring#report" },
  { type: "link", name: "Advanced Features", to: "/" },
  { type: "link", name: "Threshold Based Alerts", to: "/" },
  { type: "link", name: "Contact Us", to: "/contact" },
];

// DirectLink component
const DirectLink = ({ name, to, selectedMenu, setSelectedMenu, id, setOpenDropdowns, path, setUser }) => {
  const isSelected = selectedMenu === name;

  const handleClick = () => {
    setSelectedMenu(name);
    setOpenDropdowns(path);

    if (id && setUser) {
      setUser(prev => ({ ...prev, currentProject: id }));
    }
  };

  return (
    <NavLink to={to} style={{ width: "100%", textDecoration: "none" }} onClick={handleClick}>
      {() => (
        <Flex
          align="center"
          p="2"
          bg={isSelected ? palette.main_yellow : "transparent"}
          borderRadius="md"
          _hover={{ bg: palette.hover_main_yellow }}
          color={isSelected ? palette.black : palette.grayText}
          fontWeight={isSelected ? "semibold" : "normal"}
        >
          <Text>{name}</Text>
        </Flex>
      )}
    </NavLink>
  );
};

// DropdownItem component
const DropdownItem = ({ name, children: childrenItems, isCollapsed, openDropdowns, setOpenDropdowns, selectedMenu, setSelectedMenu, path, setUser }) => {
  const isOpen = openDropdowns.includes(name);
  const toggleDropdown = () =>
    setOpenDropdowns(isOpen ? openDropdowns.filter(n => n !== name) : [...openDropdowns, name]);

  return (
    <Box w="100%">
      <Flex
        align="center"
        p="2"
        cursor="pointer"
        onClick={toggleDropdown}
        _hover={{ bg: palette.hover_main_yellow, borderRadius: "md" }}
        bg="transparent"
        color={palette.white}
        fontWeight="semibold"
      >
        <Text flex="1">{name}</Text>
        {!isCollapsed && <Icon as={isOpen ? FiChevronUp : FiChevronDown} boxSize="4" />}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <VStack align="start" pl="4" spacing="1">
          {childrenItems.map(child =>
            renderMenuItem(child, isCollapsed, openDropdowns, setOpenDropdowns, selectedMenu, setSelectedMenu, [...path, name], setUser)
          )}
        </VStack>
      </Collapse>
    </Box>
  );
};

// Render menu item helper
const renderMenuItem = (item, isCollapsed, openDropdowns, setOpenDropdowns, selectedMenu, setSelectedMenu, path = [], setUser) => {
  if (!item.type || item.type === "link")
    return <DirectLink key={item.name} {...item} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} setOpenDropdowns={setOpenDropdowns} path={path} setUser={setUser} />;
  if (item.type === "dropdown")
    return <DropdownItem key={item.name} {...item} isCollapsed={isCollapsed} openDropdowns={openDropdowns} setOpenDropdowns={setOpenDropdowns} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} path={path} setUser={setUser} />;
  return null;
};

// SidebarContent component
const SidebarContent = ({ isCollapsed, openDropdowns, setOpenDropdowns, selectedMenu, setSelectedMenu, projects = [], setUser }) => {
  const width = isCollapsed ? "0" : "18rem";

  // Clone baseMenuItems to avoid mutation
  const menuItems = JSON.parse(JSON.stringify(baseMenuItems));

  // Inject Add Project + dynamic projects
  const projectIndex = menuItems.findIndex(item => item.name === "Project");
  if (projectIndex !== -1) {
    menuItems[projectIndex].children = [
      { type: "link", name: "➕ Add Project", to: "/add-project" },
      ...projects,
    ];
  }

  return (
    <Box
      w={width}
      maxHeight="90vh"
      bg={palette.black}
      color={palette.white}
      overflow="auto"
      p={isCollapsed ? "0" : "3"}
      transition="width 0.3s ease-in-out"
      css={{ "&::-webkit-scrollbar": { width: "4px" } }}
      borderTopRightRadius="md"
      borderBottomRightRadius="md"
    >
      {!isCollapsed && (
        <VStack align="start" spacing="5" w="100%">
          {menuItems.map(item =>
            renderMenuItem(item, isCollapsed, openDropdowns, setOpenDropdowns, selectedMenu, setSelectedMenu, [], setUser)
          )}
        </VStack>
      )}
    </Box>
  );
};

// Sidebar main component
const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(location.pathname === "/");
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { user, setUser } = useAuth();
  const userEmail = user?.email;
  const [projects, setProjects] = useState([]);

  // Collapse on home, expand otherwise
  useEffect(() => setIsCollapsed(location.pathname === "/"), [location.pathname]);

  // Sync selected menu with path
  useEffect(() => {
    const pathMap = {
      "/": "Home",
      "/general": "General",
      "/projects": "Project",
      "/design-proof-check": "Design Proof Check",
      "/non-destructive-evaluation": "Non-Destructive Evaluation",
      "/load-testing": "Load Testing",
      "/structural-health-monitoring": "Structural Health Monitoring (SHM)",
      "/contact": "Contact Us",
      "/add-project": "➕ Add Project",
    };
    setSelectedMenu(pathMap[location.pathname] || "");
  }, [location.pathname]);

  // Fetch user projects
  useEffect(() => {
    if (!userEmail) return;

    const fetchProjects = async () => {
      try {
        const res = await fetch(`https://spplindia.org/api/fetch_projects.php?email=${encodeURIComponent(userEmail)}`);
        const data = await res.json();
        if (data.projects) {
          setUser(prev => ({ ...prev, project: data.projects }));
          const transformed = Transform(data);
          setProjects(transformed);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProjects();
  }, [userEmail, setUser]);

  const handleToggle = () => (isMobile ? onOpen() : setIsCollapsed(prev => !prev));

  return (
    <>
      <HamburgerButton onClick={handleToggle} />
      {!isMobile && (
        <SidebarContent
          isCollapsed={isCollapsed}
          openDropdowns={openDropdowns}
          setOpenDropdowns={setOpenDropdowns}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          projects={projects}
          setUser={setUser}
        />
      )}
      {isMobile && (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg={palette.black} color={palette.white} p="8">
            <DrawerCloseButton />
            <SidebarContent
              isCollapsed={false}
              openDropdowns={openDropdowns}
              setOpenDropdowns={setOpenDropdowns}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
              projects={projects}
              setUser={setUser}
            />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;


