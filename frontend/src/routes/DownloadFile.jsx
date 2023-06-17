import { HStack, Box, Flex, Text, Heading, Button, Input, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ImDownload } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleFile } from '../redux/AppReducer/action';
import download from 'downloadjs';

export default function DownloadFile() {
  const [isProtected, setIsProtected] = useState(true);
  const param = useParams();
  const dispatch = useDispatch();
  const [downloadStatus, setDownloadStatus] = useState(false);
  const singleFile = useSelector((state) => state.AppReducer.singleFile);
  const isLoading = useSelector((state) => state.AppReducer.isLoading);
  const isError = useSelector((state) => state.AppReducer.isError);
  const [filePassword, setFilePassword] = useState('');
  const toast = useToast();

  useEffect(() => {
    dispatch(getSingleFile(param.id));
  }, []);

  // download file function
  const handleDownload = async () => {
    let message;
    let status;

    if (!singleFile.isProtected || (singleFile.isProtected && singleFile.password === filePassword)) {
      setDownloadStatus(true);
      const response = await fetch(singleFile.fileData);
      const fileData = await response.blob();

      // extract file extension from url
      const fileExtension = singleFile.fileData.split('.').pop();
      const fileName = singleFile.name + '.' + fileExtension;

      // download file
      download(fileData, fileName);

      setDownloadStatus(false);
      status = 'success';
      message = 'Downloaded with password';
    } else {
      status = 'error';
      message = 'Something went wrong!';
    }

    toast({
      position: 'top-right',
      title: message,
      status: status,
      duration: 6000,
      isClosable: true,
    });
  };

  return (
    <>
      {/* flex container */}
      <Flex h="90vh" align="center" justify="center" flexDirection="column" gap="1rem">
        {/* box that contain file name & download button */}
        {!isLoading && !isError && singleFile ? (
          <Box
            w="20rem"
            p="1rem"
            display="flex"
            flexDirection="column"
            gap="1rem"
            justify="center"
            align="center"
            border="1px"
            borderRadius="1rem"
            borderColor="teal"
            boxShadow="dark-lg"
          >
            {/* download icon */}
            <Box>
              <ImDownload size="100px" color="teal" />
            </Box>

            {/* file name */}
            <HStack m="auto">
              <Text as="b">Name:</Text>
              <Text>
                {singleFile.name}.{singleFile.fileType}
              </Text>
            </HStack>

            {/* file size */}
            <HStack m="auto">
              <Text as="b">Size:</Text>
              <Text>1 MB</Text>
            </HStack>

            {/* password input */}
            {singleFile.isProtected ? (
              <Input value={filePassword} onChange={(e) => setFilePassword(e.target.value)} placeholder="Enter Password" />
            ) : (
              ''
            )}

            {/* download button */}
            <Button colorScheme="teal" variant="solid" onClick={handleDownload} disabled={downloadStatus}>
              {downloadStatus ? 'Downloading...' : 'Download'}
            </Button>
          </Box>
        ) : (
          ''
        )}
      </Flex>
    </>
  );
}
