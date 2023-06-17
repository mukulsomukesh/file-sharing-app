import { Box, Container, HStack, Image, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import RenameFile from '../components/DisplayFiles/RenameFile'
import ChangeFilePassword from '../components/DisplayFiles/ChangeFilePassword'
import DeleteFile from '../components/DisplayFiles/DeleteFile'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getSingleFile } from '../redux/AppReducer/action';
import Loader from '../components/DisplayFiles/Loader'
import Error from '../components/DisplayFiles/Error'


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

            <Box display={isLoading && isError ? "none" : "flex"} h="85vh" w={"full"} alignContent={"center"} alignItems={"center"}>

                <Container textAlign={"center"}>
                    <Text fontSize={"xl"}> {singleFile.name}  </Text>
                    <Image border={"1px"} w="full" h="full" src={fileData} />
                </Container>


                <Container>

                    <HStack mt={2}> <Text as='b'> File Status: </Text> <Text> {singleFile.isProtected ? "Password Protected" : "Not Password Protected"} </Text> </HStack>
                    <HStack mt={2}> <Text as='b'> Upload Date: </Text><Text> {new Date(singleFile.createdAt).toLocaleString()} </Text> </HStack>
                    <HStack mt={2}> <Text as='b'> Last Update Date: </Text><Text> {new Date(singleFile.updatedAt).toLocaleString()} </Text> </HStack>

                    <RenameFile el={singleFile} />
                    <ChangeFilePassword el={singleFile} />

                    <DeleteFile _id={singleFile._id} />

                </Container>
            </Box>

        </>
    )
}
