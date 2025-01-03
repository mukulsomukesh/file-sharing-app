import { Box, Container, Flex, HStack, Image, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import RenameFile from '../components/FileMoreInfo/RenameFile'
import ChangeFilePassword from '../components/FileMoreInfo/ChangeFilePassword'
import DeleteFile from '../components/FileMoreInfo/DeleteFile'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getSingleFile } from '../redux/AppReducer/action';
import Loader from '../components/DisplayFiles/Loader'
import Error from '../components/DisplayFiles/Error'
import RemoveFilePassword from '../components/FileMoreInfo/RemovePassword'


export default function FileMoreInfo() {

  const param = useParams();
  const dispatch = useDispatch();
  const singleFile = useSelector((state) => state.AppReducer.singleFile);
  const isLoading = useSelector((state) => state.AppReducer.isLoading);
  const isError = useSelector((state) => state.AppReducer.isError);


  // use effect
  useEffect(() => {

    // dispatch get single file details
    dispatch(getSingleFile(param.id));
  }, []);


  // get file preview, check for file types and displaying in respective view
  const getFilePreview = () => {

    switch (singleFile.fileType) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
      case "svg":
        return <img src={singleFile.fileData.replace("http:", "https:")} alt="Something Went Wrong!" />;
      case "pdf":
        return (
          <embed src={singleFile.fileData.replace("http:", "https:")} type="application/pdf" width="100%" height="500px" />
        );
      case "mp3":
      case "wav":
        return (
          <audio controls style={{ backgroundColor: 'teal', width: "100%", padding: "0.4rem", borderRadius: "2rem" }}>
            <source src={singleFile.fileData.replace("http:", "https:")} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );
      case "mp4":
      case "webm":
      case "ogg":
      case "avi":
      case "mov":
      case "wmv":
      case "flv":
      case "mkv":
      case "m4v":
        return (
          <video width="100%" style={{ maxHeight: '75vh' }} controls>
            <source src={singleFile.fileData.replace("http:", "https:")} type={`video/${singleFile.fileType}`} />
            Your browser does not support the video tag.
          </video>
        );
      case "txt":
        return <p>{singleFile.fileData}</p>;
      case "doc":
      case "docx":
        return (
          <iframe src={`https://docs.google.com/gview?url=${singleFile.fileData.replace("http:", "https:")}&embedded=true`} width="100%" height="500px" frameborder="0" scrolling="no"></iframe>
        );
      default:
        return <p>Preview not available for this file type.</p>;
    }
  };


  return (
    <Box h="fit-content" minH={"90vh"} >

      {/* loader Display when data is loading */}
      {isLoading ? <Loader /> : ""}

      {/* Error display when error come */}
      {isError ? <Error /> : ""}


      {/* if got found */}
      <Box display={isLoading && isError ? "none" : ""} w={"full"} >

        {/* file details container */}
        <Flex alignContent={"center"} alignItems={"center"} mt="10">

          {/* file preview container */}
          <Container textAlign={"center"} >

            {/* file name */}
            <Text mb={"5"} fontSize={"xl"}> {singleFile.name + "." + singleFile.fileType}   </Text>

            {/* file preview */}
            {singleFile ? getFilePreview() : ""}
          </Container>


          {/* details and action button container */}
          <Container>

            {/* file status, and uploading time info */}
            <HStack mt={2}> <Text as='b'> File Status: </Text> <Text> {singleFile.isProtected ? "Password Protected" : "Not Password Protected"} </Text> </HStack>
            <HStack mt={2}> <Text as='b'> Upload Date: </Text><Text> {new Date(singleFile.createdAt).toLocaleString()} </Text> </HStack>
            <HStack mt={2}> <Text as='b'> Last Update Date: </Text><Text> {new Date(singleFile.updatedAt).toLocaleString()} </Text> </HStack>

            {/* rename file */}
            <RenameFile el={singleFile} />

            {/* change password */}
            <ChangeFilePassword el={singleFile} />

            {/* display RemoveFilePassword only if file is protected */}
            {singleFile.isProtected && (<RemoveFilePassword el={singleFile} />)}

            {/* delete file */}
            <DeleteFile _id={singleFile._id} />

          </Container>
        </Flex>

      </Box>

    </Box>
  )
}
