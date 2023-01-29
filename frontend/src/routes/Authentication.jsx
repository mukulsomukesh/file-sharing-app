import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

export default function Authentication() {
  return (
    <>
      {/* flex  */}
      <Flex align={"center"} justify="center" h="100vh">
        {/* tabs */}
        <Tabs isFitted variant="enclosed" border="1px" borderRadius={"1rem"} p="1rem" borderColor="teal">
          {/* tablist */}
          <TabList mb="1em" cursor={"pointer"}>
            <Tab as="b"> Signup</Tab>
            <Tab as="b">Login</Tab>
          </TabList>

          {/* tab panels */}
          <TabPanels>
            {/* signup */}
            <TabPanel>
              <Signup />
            </TabPanel>

            {/* login */}
            <TabPanel>
              <Login />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}
