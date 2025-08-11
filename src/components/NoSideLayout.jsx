import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const NSBLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const handleToggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    }
    return (
        <Flex direction="column" h="100vh">
            <Navbar onSidebarToggle={handleToggleSidebar} />
            <Outlet />
        </Flex>
    );
};

export default NSBLayout;
