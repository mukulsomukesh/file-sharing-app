import {
  Box,  Checkbox,  Flex,  Input,  Text,  useToast} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { uploadToServer } from "../redux/AppReducer/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const cloudinaryAPI = process.env.REACT_APP_CLOUDINARY_API;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESENT;
const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const fileSizeLimit = 10 * 1024 * 1024; // 10 MB limit

export default function UploadFiles() {

  // define states
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [fileProtected, setFileProtected] = useState(false);
  const [process, setProcess] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { message, isError, isUploading, uploadedFileId } = useSelector((state) => state.AppReducer)


  useEffect(() => {

    // if file successfully uploaded oo server
    if (isUploading && uploadedFileId) {

      // nagivate user to upload success page
      navigate(`/upload_file_success?id=${uploadedFileId}`);

    }
    else if (isError) {  // if failed to upload on server
      toastMessage("error", message)
    }

    // set process false
    setProcess(false);

  }, [isUploading]);


  // handel input file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // check file size if lessthen 10 mb go head
    if (file && file.size > fileSizeLimit) {
      toastMessage("error", "File size more then 10MB.")
      return;
    }
    else {
      setImage(file);
    }
  };


  // upload image on cloudnary
  const postDetails = async () => {

    // set processing as true
    setProcess(true);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", uploadPreset);
    data.append("cloud_name", cloudName);
    let ans;

    // post request on cloudinary 
    ans = await fetch(`${cloudinaryAPI}`, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {

        // upload file on server, dispatch uploadServer() function
        let pic = data.url.replace("http:", "https:");
        dispatch(uploadToServer(data.original_filename, data.format, password, fileProtected, pic));

      })
      .catch((err) => {

        // if upload on cloudnary failed
        setProcess(false);
        let toastStatus = "error";
        let message = "File Uploading Failed!";
        toastMessage(toastStatus, message);
      });
  };


  // toast message
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
          maxW={"650px"}
          w="90%"
          display="flex"
          flexDirection="column"
          gap="1rem"
          p="1.5rem"
        >

          {/* file input container */}
          <Box
            height="240px"
            border="2px"
            borderColor="primary.500"
            borderStyle="dashed"
            borderRadius="1rem"
            bg="primary.100"
            overflow="hidden"
            backgroundImage={`url(http://res.cloudinary.com/dfrhy6m3m/image/upload/v1711399435/cdzkr0galrapylddy023.png)`}
            backgroundSize="240px"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
          >

            {/* file input */}
            <Input
              opacity={image ? 1 : 0}
              border="none"
              type="file"
              onChange={handleFileChange}
              height="100%"
            />
          </Box>

          {/* set password checkbox */}
          <Checkbox
            mt={4}
            colorScheme="teal"
            onChange={() => {
              setFileProtected(!fileProtected);
            }}
          >
            Set Password
          </Checkbox>

          {/* enter password input */}
          <Input
            h="30px"
            border="1px"
            bg="primary.100"
            p="7"
            fontWeight={"bold"}
            color="primary.500"
            borderColor="primary.500"
            borderRadius="10px"
            value={password}
            placeholder="Set Password"
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            disabled={!fileProtected}
          />

          {/* upload button */}
          <CustomButton
            onClick={postDetails}
            isLoading={process}
            loadingText={process ? "Uploading" : ""}
            text="Upload File"
          />

          {/* max file text  */}
          <Text fontSize='sm' as="b"> Max file size is 10MB. </Text>
        </Box>
      </Flex>
    </>
  );
}
