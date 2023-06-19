import { Center, Heading, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { RiFileCopyFill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function UploadFileSuccess() {
  const [url, setUrl] = useState("");
  const uploadedFileId = useSelector((state) => state.AppReducer.uploadedFileId)
  const toast = useToast()

  useEffect(() => {
    let location = window.location.href;
    let id = uploadedFileId;

    location = location.replace("/UploadFileSuccess","/Download")
    // set url to input
    setUrl(`${location}/${id}`);
  }, [uploadedFileId]);

  // copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(url);

    return(
      toast({
        position:"top-right",
        title: "Url Copy To ClipBoard!",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    )
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
{/* input for share url */}
      <InputGroup cursor="pointer" w="fit-content" bg="white">
        <Input value={url} w="40vw" minW={"250px"} />
        <InputRightElement children={<RiFileCopyFill color="teal" />} onClick={handleCopy} />
      </InputGroup>


      <Heading as="h2" size="md" > Copy Above Link & Share With Your Friends. </Heading>


    </Center>
  );
}
