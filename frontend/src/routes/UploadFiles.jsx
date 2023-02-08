import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { uploadToServer } from "../redux/AppReducer/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UploadFiles() {

  const dispatch = useDispatch();
  const message = useSelector((state) => state.AppReducer.message)
  const [name, setName] = useState("");
  const [fileType, setFiletype] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [fileProtected, setFileProtected] = useState(false);
  const [process, setProcess] = useState(false);
  const navigate = useNavigate()



  useEffect(() => {
    if (url) {
      let isProtected = fileProtected;
      let pic = url;
      dispatch(uploadToServer(name, fileType, password, isProtected, pic));
      
      setProcess(false);

      navigate("/UploadFileSuccess")
    }
  }, [url]);

  const postDetails = async () => {
    setProcess(true);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "filesharing-app");
    data.append("cloud_name", "dmzzzl5jj");
    let ans;

    ans = await fetch(
      "https://api.cloudinary.com/v1_1/dmzzzl5jj/image/upload",
      {
        method: "post",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url);
        setName(data.original_filename);
        setFiletype(data.original_extension);
      })
      .catch((err) => {
        console.log(err);
        setProcess(false);
      });
  };

  return (
    <>
      <Flex
        h="91vh"
        align="center"
        justify="center"
        flexDirection="column"
        gap="1rem"
      >
        <Heading> Upload File </Heading>

{/*   this input box contain all the inputs */}
        <Box
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

{/* this box contain only file input */}
            <Box height="200px"
                    border="1px"
                    borderColor="teal"
                    borderStyle="dotted"
                    borderRadius="1rem"
                    overflow="hidden"
      backgroundImage={`url(https://img.freepik.com/free-icon/upload_318-250684.jpg)`}
      backgroundSize="cover"
      backgroundPosition="center" >

{/* file input */}
    <Input
     opacity={image ? 1 : 0}
    border="none"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        height="100%"/>

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
            Upload File{" "}
          </Button>

<Text> {message} </Text>

        </Box>
      

      </Flex>
    </>
  );
}
