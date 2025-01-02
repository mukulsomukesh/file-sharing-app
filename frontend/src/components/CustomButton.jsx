import React from "react";
import { Button } from "@chakra-ui/react";

export default function CustomButton({loadingText, isLoading, onClick, text, disabled }) {
  return (
    <Button
      h="55px"
      mt="1.4rem"
      color="white"
      bg="primary.500"
      w="full"
      colorScheme="teal"
      borderRadius="10px"
      transition="border-radius 0.3s ease"
      _hover={{ borderRadius: "50px" }}
      isLoading={isLoading}
      loadingText={isLoading ? loadingText : ""}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}
