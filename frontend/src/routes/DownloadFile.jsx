import { HStack, Box, Flex, Text, Heading, Button, Input, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ImDownload } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { checkPasswordForDownloadFile, getSingleFile } from '../redux/AppReducer/action';
import download from 'downloadjs';
import Error from "../components/DisplayFiles/Error"
import CustomButton from '../components/CustomButton';

export default function DownloadFile() {
  const [isProtected, setIsProtected] = useState(true);
  const param = useParams();
  const dispatch = useDispatch();
  const [downloadStatus, setDownloadStatus] = useState(false);
  const singleFile = useSelector((state) => state.AppReducer.singleFile);
  const isLoading = useSelector((state) => state.AppReducer.isLoading);
  const isError = useSelector((state) => state.AppReducer.isError);
  const downloadFileData = useSelector((state) => state.AppReducer.downloadFileData);
  const downloadFileMessage = useSelector((state) => state.AppReducer.downloadFileMessage);
  const downloadFileFail = useSelector((state) => state.AppReducer.downloadFileFail);
  const downloadFileSuccess = useSelector((state) => state.AppReducer.downloadFileSuccess);
  const downloadFileProcessign = useSelector((state) => state.AppReducer.downloadFileProcessign);
  const [filePassword, setFilePassword] = useState('');
  const [downloadButtonText, setDownloadButtonText] =useState("Download")
  const toast = useToast();

  // get file details
  useEffect(() => {
    dispatch(getSingleFile(param.id));
  }, []);


  // useEffect to download file
  useEffect(() => {

    if (!downloadFileProcessign && downloadFileSuccess && !downloadFileFail) {
      handleDownload()
      toastMessage("success", "File Downloading");
    }
    else if (!downloadFileProcessign && !downloadFileSuccess && downloadFileFail) {
      toastMessage("error", downloadFileMessage);
    }

  }, [downloadFileProcessign, downloadFileSuccess, downloadFileFail])

  // download file function
  const handleDownload = async () => {

    // update download file button status
    setDownloadStatus(true);

    // download file
    const response = await fetch(downloadFileData.replace("http:", "https:"));
    const fileData = await response.blob();

    // extract file extension from url
    const fileExtension = downloadFileData.split('.').pop();
    const fileName = singleFile.name + '.' + fileExtension;

    // download file
    download(fileData, fileName);

    // update download button status
    setDownloadStatus(false);

    // update download button text
    setDownloadButtonText("Download Again")
  };

  // toast message function
  function toastMessage(status, message) {
    return toast({
      position: 'top-right',
      title: message,
      status: status,
      duration: 6000,
      isClosable: true,
    });
  }

  return (
      <Flex h="90vh" align="center" justify="center" flexDirection="column" gap="1rem">
        {/* box that contain file name & download button */}
        {!isLoading && !isError && singleFile ? (
          <Box
            w="30rem"
            minW={"200px"}
            p="1rem"
            display="flex"
            flexDirection="column"
            gap="1rem"
            justify="center"
            align="center"
            border="1px"
            borderRadius="10px"
            borderColor="teal"
            boxShadow="2xl"
          >
            {/* download icon */}
            <Box>
              <ImDownload size="100px" color="teal" />
            </Box>

            {/* file name */}
            <HStack m="auto">
              {/* <Text as="b">Name:</Text> */}
              <Text as="b">
                {singleFile.name}.{singleFile.fileType}
              </Text>
            </HStack>

            {/* file size */}
            {/* <HStack m="auto">
              <Text as="b">Size:</Text>
              <Text>1 MB</Text>
            </HStack> */}

          {/* password input */}
          {singleFile.isProtected ? (
            <Input
              value={filePassword}
              onChange={(e) => setFilePassword(e.target.value)}
              placeholder="Enter Password"
              p="7"
              h="30px"
              rounded="10px" // Apply 10px border radius to the left
              border="1px"
              borderColor="primary.500"
              bg="primary.100"
            />
          ) : (
            ""
          )}

          {/* download button and dispatch checkPasswordForDownloadFile on Click */}
          <CustomButton
            onClick={() => {
              dispatch(checkPasswordForDownloadFile(filePassword, param.id));
            }}
            isLoading={downloadFileProcessign}
            loadingText={
              downloadStatus || downloadFileProcessign
                ? "Downloading..."
                : downloadButtonText
            }
            text="Upload File"
            disabled={downloadStatus}
          />
        </Box>
      ) : (
        <Error message="File Not Found!" />
      )}
      
    </Flex>
  );
}
