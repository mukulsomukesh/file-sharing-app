import { Center, Heading, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { RiFileCopyFill } from "react-icons/ri";
import React, { useEffect, useState } from "react";

export default function UploadFileSuccess() {
  const [url, setUrl] = useState("");
  const toast = useToast();

  useEffect(() => {
    const location = window.location.href;

    // Extract the `id` query parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
      // Replace `/upload_file_success` with `/download` in the current URL
      const updatedLocation = location.replace("/upload_file_success", "/download");

      // Set the URL with the `id` query parameter
      setUrl(`${updatedLocation}`);
    }
  }, []);

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast({
      position: "top-right",
      title: "URL copied to clipboard!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Center
      display={"flex"}
      flexDirection="column"
      gap="2rem"
      bg="transparent"
      w="100%"
      h="85vh"
    >
      {/* Input for share URL */}
      <InputGroup cursor="pointer" w="fit-content" bg="white">
        <Input value={url} w="40vw" minW={"250px"} isReadOnly />
        <InputRightElement
          children={<RiFileCopyFill color="teal" />}
          onClick={handleCopy}
        />
      </InputGroup>

      <Heading as="h2" size="md">
        Copy the link above & share it with your friends.
      </Heading>
    </Center>
  );
}
