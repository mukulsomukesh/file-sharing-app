import { Box, Center, CircularProgress, Text } from "@chakra-ui/react";
import React from "react";
import { ImSad } from "react-icons/im";

export default function Error() {
  return (
    <>
      {/* center container */}
      <Center h="90vh">
        {/* box contain  */}
        <Box p="1rem" align="center" as="b"  border="1px" borderRadius="1rem" borderColor="teal" boxShadow="dark-lg">

        {/* icon */}
        <Box w="fit-content" m="auto"> 
        <ImSad size="100px" color="teal" />
        </Box>

          {/* text */}
          <Text mt="1rem">
            Somthing Went Wrong?
          </Text>
          <Text mt="1rem">
            Please Try Again!
          </Text>
        </Box>
      </Center>
    </>
  );
}
