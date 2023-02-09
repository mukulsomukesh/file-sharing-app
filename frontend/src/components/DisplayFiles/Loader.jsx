import { Box, Center, CircularProgress, Text } from "@chakra-ui/react";
import React from "react";

export default function Loader() {
  return (
    <>
      {/* center container */}
      <Center h="90vh">
        {/* box contain loader & text */}
        <Box align="center" as="b">
          {/* loader */}
          <CircularProgress isIndeterminate color="teal" />

          {/* text */}
          <Text mt="1rem"> Please Wait! </Text>
        </Box>
      </Center>
    </>
  );
}
