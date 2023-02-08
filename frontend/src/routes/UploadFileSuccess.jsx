import { Center, Heading, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { RiFileCopyFill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function UploadFileSuccess() {
  const [url, setUrl] = useState("");
  const uploadedFileId = useSelector((state) => state.AppReducer.uploadedFileId)

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
  };

  return (
    <Center
      w="100%"
      h="90%"
    >

{/* input for share url */}
      <InputGroup cursor="pointer" w="fit-content" bg="white">
        <Input value={url} />
        <InputRightElement children={<RiFileCopyFill color="teal" />} onClick={handleCopy} />
      </InputGroup>
    </Center>
  );
}
