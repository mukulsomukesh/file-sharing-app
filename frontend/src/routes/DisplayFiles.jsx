import {
  Box,
  Center,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsFileEarmarkMedical, BsEyeFill } from "react-icons/bs";
import ShareFile from "../components/DisplayFiles/ShareFile";
import FileDetails from "../components/DisplayFiles/FileDetails";
import { getAllFiles } from "../redux/AppReducer/action";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/DisplayFiles/Loader";
import Error from "../components/DisplayFiles/Error";
import { Link } from 'react-router-dom'

export default function DisplayFiles() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.AppReducer.isLoading);
  const isError = useSelector((state) => state.AppReducer.isError);
  const allFiles = useSelector((state) => state.AppReducer.allFiles);

  useEffect(() => {
    dispatch(getAllFiles);
  }, []);

  console.log(allFiles)

  return (
    <>

{/* loader Display when data is loading */}
{isLoading?  <Loader /> : "" }

{/* Error display when error come */}
{isError?  <Error /> : "" }


      {/* grid */}
      <SimpleGrid minChildWidth="130px" spacing="2rem" p="2rem">
        {/* map files */}
        {!isError && !isLoading && allFiles?.map((el) => (
          <Box
            overflow="hidden"
            borderRadius="1rem"
            boxShadow="2xl"
            height="fit-content"
            pt="1rem"
            align="center"
            border="1px"
            borderColor="teal"
          >


<Link to= {`/Download/${el._id}`}>
            {/* <Center cursor="pointer" onClick={()=>{ alert("ok") }}> */}
            <BsFileEarmarkMedical size="100px" />
            {/* </Center> */}
</Link>

            <Flex
              mb="0.5rem"
              mt="0.5rem"
              gap="0.5rem"
              color="#1a202c"
              justifyContent="space-around"
              cursor={"pointer"}
            >
              {/* preview button */}
              <IconButton
                h="fit-content"
                w="fit-content"
                _hover={{ background: "transparent" }}
                icon={<BsEyeFill size="20px" />}
              />

              {/* share file option */}
              <ShareFile el={el} />

              {/* file details */}
              <FileDetails />

            </Flex>

            {/* file name */}
            <Box bg="teal" p="0.5rem" color="white">
              <Text lineHeight="1rem" m="0px" p="0px"> {el.name} . {el.fileType} </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}
