import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  useTheme,
  Button,
  Collapse,
  Text,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
const palette = {
  hover_blue: "blue.500",
  btn_blue: "blue.600",
  hover_main_blue: "blue.700",
  main_blue: "blue.800",
  white: "white",
};
const Transform = (inputData) => {
  const projects = inputData.projects;
  const grouped = projects.reduce((acc, project) => {
    const location = project.project_title;
    const type = project.structure_type;

    if (!acc[location]) {
      acc[location] = {};
    }

    if (!acc[location][type]) {
      acc[location][type] = [];
    }

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

const menuItems = [
  { type: "link", name: "General", to: "/general" },
  {
    type: "dropdown",
    name: "Project",
    to: "/projects",
    children: [],
  },
  { type: "link", name: "Design Proof Check", to: "/design-proof-check" },
  { type: "link", name: "Non-Destructive Evaluation", to: "/non-destructive-evaluation" },
  { type: "link", name: "Load Testing", to: "/load-testing" },
  { type: "link", name: "Structural Health Monitoring (SHM)", to: "/structural-health-monitoring" },
  { type: "link", name: "Advanced Features", to: "/" },
  { type: "link", name: "Threshold Based Alerts", to: "/" },
  // { type: "link", name: "Report Generation", to: "/reports" },
  { type: "link", name: "Contact Us", to: "/contact" },
  // { type: "link", name: "Settings", to: "/settings" },
];

const DirectLink = ({ name, to, selectedMenu, setSelectedMenu, id, setOpenDropdowns, path }) => {
  const { user, setUser } = useAuth();
  const isSelected = selectedMenu === name;

  const handleClick = () => {
    setSelectedMenu(name);
    setOpenDropdowns(path); // Keep only dropdowns in the path open
    if (id) {
      setUser((prevUser) => ({
        ...prevUser,
        currentProject: id,
      }));
    }
  };

  return (
    <NavLink
      to={to}
      style={{ width: "100%", textDecoration: "none" }}
      onClick={handleClick}
    >
      {() => (
        <Flex
          align="center"
          p="2"
          bg={isSelected ? "blue.700" : "transparent"}
          borderRadius="md"
          _hover={{ bg: palette.hover_main_blue }}
        >
          <Text>{name}</Text>
        </Flex>
      )}
    </NavLink>
  );
};


const DropdownItem = ({
  name,
  children: childrenItems,
  isCollapsed,
  openDropdowns,
  setOpenDropdowns,
  selectedMenu,
  setSelectedMenu,
  path,
}) => {
  const isOpen = openDropdowns.includes(name);
  const toggleDropdown = () =>
    setOpenDropdowns(isOpen ? openDropdowns.filter((n) => n !== name) : [...openDropdowns, name]);

  return (
    <Box w="100%">
      <Flex
        align="center"
        p="2"
        cursor="pointer"
        onClick={toggleDropdown}
        _hover={{ bg: palette.hover_main_blue, borderRadius: "md" }}
        bg="transparent"
        borderRadius="0"
      >
        <Text flex="1">{name}</Text>
        {!isCollapsed && <Icon as={isOpen ? FiChevronUp : FiChevronDown} boxSize="4" />}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <VStack align="start" pl="4" spacing="1">
          {childrenItems.map((child) =>
            renderMenuItem(
              child,
              isCollapsed,
              openDropdowns,
              setOpenDropdowns,
              selectedMenu,
              setSelectedMenu,
              [...path, name]
            )
          )}
        </VStack>
      </Collapse>
    </Box>
  );
};


const renderMenuItem = (
  item,
  isCollapsed,
  openDropdowns,
  setOpenDropdowns,
  selectedMenu,
  setSelectedMenu,
  path = []
) => {
  if (item.type === "link" || !item.type)
    return (
      <DirectLink
        key={item.name}
        name={item.name}
        to={item.to}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        id={item.id}
        setOpenDropdowns={setOpenDropdowns}
        path={path}
      />
    );
  if (item.type === "dropdown")
    return (
      <DropdownItem
        key={item.name}
        name={item.name}
        children={item.children}
        isCollapsed={isCollapsed}
        openDropdowns={openDropdowns}
        setOpenDropdowns={setOpenDropdowns}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        path={[...path, item.name]}
      />
    );
  return null;
};


const SidebarContent = ({
  isCollapsed,
  openDropdowns,
  setOpenDropdowns,
  selectedMenu,
  setSelectedMenu,
  projects,
}) => {
  const width = isCollapsed ? "0" : "18rem";
  menuItems[1].children = projects;
  return (
    <Box
      w={width}
      maxHeight="90vh"
      bg={palette.main_blue}
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
          {menuItems.map((item) =>
            renderMenuItem(
              item,
              isCollapsed,
              openDropdowns,
              setOpenDropdowns,
              selectedMenu,
              setSelectedMenu
            )
          )}
        </VStack>
      )}
    </Box>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const theme = useTheme();
  const { user, setUser } = useAuth();
  const userEmail = user?.email;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!userEmail) {
      console.warn("User email is not available yet.");
      return;
    }
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `https://spplindia.org/api/fetch_projects.php?email=${encodeURIComponent(userEmail)}`
        );
        const data = await response.json();
        if (data.projects) {
          console.log("Fetched Projects:", data.projects);
          setUser((prevUser) => ({
            ...prevUser,
            project: data.projects,
          }));
          const transformedProjects = Transform(data || {});
          setProjects(transformedProjects);
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProjects();
  }, [userEmail]);

  const handleToggle = () => {
    isMobile ? onOpen() : setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <Button
        onClick={handleToggle}
        position="absolute"
        top="4"
        left="4"
        bg={palette.white}
        color={palette.main_blue}
        _hover={{ bg: palette.hover_blue, color: palette.white }}
        zIndex="107"
      >
        <MdMenu size="1.5em" />
      </Button>

      {!isMobile && (
        <SidebarContent
          isCollapsed={isCollapsed}
          openDropdowns={openDropdowns}
          setOpenDropdowns={setOpenDropdowns}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          projects={projects}
        />
      )}

      {isMobile && (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg={theme.colors.palette.primaryBlue} color={palette.white} p="8">
            <DrawerCloseButton />
            <SidebarContent
              isCollapsed={false}
              openDropdowns={openDropdowns}
              setOpenDropdowns={setOpenDropdowns}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
              projects={projects}
            />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;