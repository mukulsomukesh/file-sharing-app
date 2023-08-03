import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { uploadToServer } from "../redux/AppReducer/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const cloudinaryAPI = process.env.REACT_APP_CLOUDINARY_API;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESENT;
const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const fileSizeLimit = 10 * 1024 * 1024; // 10 MB limit

export default function UploadFiles() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [fileType, setFiletype] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [fileProtected, setFileProtected] = useState(false);
  const [process, setProcess] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {

    if (url) {
      let isProtected = fileProtected;
      let pic = url.replace("http:","https:");
      dispatch(uploadToServer(name, fileType, password, isProtected, pic));
      navigate("/UploadFileSuccess");

      // toast message
      let toastStatus = "success";
      let message = "File Successfully uploaded!";
      toastMessage(toastStatus, message);
    }

    setProcess(false);
  }, [url]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > fileSizeLimit) {
      toastMessage("error", "File size more then 10MB.")
      return;
    }
    else{
      setImage(file);
    }
  };

  const postDetails = async () => {
    setProcess(true);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", uploadPreset);
    data.append("cloud_name", cloudName);
    let ans;

    ans = await fetch(`${cloudinaryAPI}`, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.original_filename);
        setFiletype(data.format);
        setUrl(data.url);
      })
      .catch((err) => {
        setProcess(false);

        // toast message
        let toastStatus = "error";
        let message = "File Uploading Failed!";
        toastMessage(toastStatus, message);
      });
  };

  function toastMessage(toastStatus, message) {
    return toast({
      position: "top-right",
      title: message,
      status: toastStatus,
      duration: 2500,
      isClosable: true,
    });
  }

  return (
    <>
      <Flex
        h="88vh"
        align="center"
        justify="center"
        flexDirection="column"
        gap="1rem"
      >
        <Box
          bg="white"
          w="20rem"
          display="flex"
          flexDirection="column"
          gap="1rem"
          boxShadow="dark-lg"
          p="1.5rem"
          border="1px"
          borderColor="teal"
          borderRadius="1rem"
        >
          <Box
            height="200px"
            border="2px"
            borderColor="teal"
            borderStyle="dashed"
            borderRadius="1rem"
            overflow="hidden"
            backgroundImage={`url(http://res.cloudinary.com/dmzzzl5jj/image/upload/v1675932758/ur2hvbmmuiigrnpffhxs.png)`}
            backgroundSize="170px"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
          >
            <Input
              opacity={image ? 1 : 0}
              border="none"
              type="file"
              onChange={handleFileChange}
              height="100%"
            />
          </Box>

          <Checkbox
            onChange={() => {
              setFileProtected(!fileProtected);
            }}
          >
            Set Password
          </Checkbox>
          <Input
            value={password}
            placeholder="Set Password"
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            disabled={!fileProtected}
          />
          <Button
            bg="teal"
            color="white"
            onClick={postDetails}
            colorScheme="teal"
            isLoading={process}
            loadingText={process ? "Please Wait" : ""}
            variant={process ? "outline" : "solid"}
          >
            Upload File
          </Button>

          <Text fontSize='sm' as="b"> Max file size is 10MB. </Text>
        </Box>
      </Flex>
    </>
  );
}
