import React from 'react';
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const[isCollapsed,setIsCollapsed] = useState(false);
  const handleToggleSidebar = () =>{
    setIsCollapsed((prev) => !prev);
  }
  return (
    <Flex direction="column" h="100vh">
      {/* Navbar at the top */}
      <Navbar onSidebarToggle={handleToggleSidebar}/>
      {/* Sidebar and Main Content */}
      <Flex flex="1">
        {/* Sidebar with a fixed width */}
        <Sidebar isCollapsed={isCollapsed} handleToggle={handleToggleSidebar}/>
        <Outlet/>
      </Flex>
    </Flex>
  );
};

export default Layout;
