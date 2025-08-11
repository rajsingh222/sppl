import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { LuFolder, LuPlus, LuUser } from "react-icons/lu";

const PageTabs = () => {
  return (
    <Tabs defaultIndex={0}
        ml='0.5rem'
        mt='0.5rem'
        colorScheme='blue'
    >
      <TabList>
        <Tab>
          Done by SPPL
        </Tab>
        <Tab>
          Done by Others
        </Tab>
        <Tab>
          <LuPlus />
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Manage your team members</TabPanel>
        <TabPanel>Manage your projects</TabPanel>
        <TabPanel>Manage your tasks for freelancers</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default PageTabs;
