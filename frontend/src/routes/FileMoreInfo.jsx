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
import UploadFiles from './UploadFiles'


export default function FileMoreInfo() {

    const param = useParams();
    const dispatch = useDispatch();
    const singleFile = useSelector((state) => state.AppReducer.singleFile);
    const isLoading = useSelector((state) => state.AppReducer.isLoading);
    const isError = useSelector((state) => state.AppReducer.isError);


    useEffect(() => {
        dispatch(getSingleFile(param.id));
    }, []);


    return (
        <>

            {/* loader Display when data is loading */}
            {isLoading ? <Loader /> : ""}

            {/* Error display when error come */}
            {isError ? <Error /> : ""}


            <Box display={isLoading && isError ? "none" : ""} w={"full"} >

            <Flex alignContent={"center"} alignItems={"center"} mt="10">
                <Container textAlign={"center"}>
                    <Text fontSize={"xl"}> {singleFile.name + "." + singleFile.fileType}   </Text>
                    <Image border={"1px"} w="full" h="full" src={singleFile.fileData} />
                </Container>


                <Container>

                    <HStack mt={2}> <Text as='b'> File Status: </Text> <Text> {singleFile.isProtected ? "Password Protected" : "Not Password Protected"} </Text> </HStack>
                    <HStack mt={2}> <Text as='b'> Upload Date: </Text><Text> {new Date(singleFile.createdAt).toLocaleString()} </Text> </HStack>
                    <HStack mt={2}> <Text as='b'> Last Update Date: </Text><Text> {new Date(singleFile.updatedAt).toLocaleString()} </Text> </HStack>

                    <RenameFile el={singleFile} />
                    <ChangeFilePassword el={singleFile} />

                    <DeleteFile _id={singleFile._id} />

                    {
                        singleFile.isProtected ?
                            <RemoveFilePassword el={singleFile} /> : ""
                    }

                </Container>
                </Flex>


            </Box>

        </>
    )
}
