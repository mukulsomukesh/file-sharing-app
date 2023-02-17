import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import {checkAuthentication} from "../redux/AuthReducer/action"

export default function Authentication() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkAuthentication)
  },[])

  return (
    <>
      {/* flex  */}
      <Flex align={"center"} justify="center" h="90vh">
        {/* tabs */}
        <Tabs bg="white" isFitted variant="enclosed" borderRadius="1rem" border="1px" borderColor="teal" boxShadow="dark-lg" p="1rem" w="20rem">
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
