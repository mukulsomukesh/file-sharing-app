import {
  Box,
  Center,
  Flex,
  Heading,
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
import Preview from "../components/DisplayFiles/Preview";

export default function DisplayFiles() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.AppReducer.isLoading);
  const isError = useSelector((state) => state.AppReducer.isError);
  const allFiles = useSelector((state) => state.AppReducer.allFiles);

  useEffect(() => {
    dispatch(getAllFiles);
  }, []);


  return (
    <>

{/* loader Display when data is loading */}
{isLoading?  <Loader /> : "" }

{/* Error display when error come */}
{isError?  <Error /> : "" }

{/* no file is uploaded yed */}
{ allFiles.length===0? <Center h="85%"> <Heading as="h2" size="lg" > You Have't Uploaded Any Files Yet. </Heading> </Center>: "" }

      {/* grid */}
      <SimpleGrid minChildWidth="160px" spacing="2rem" p="2rem" style={{ justifyItems: "flex-start" }}>
        {/* map files */}
        {!isError && !isLoading && allFiles?.map((el) => (
          <Box
          key={el.id}
          m="auto"
            overflow="hidden"
            borderRadius="1rem"
            boxShadow="2xl"
            height="fit-content"
            maxW={"160px"}
            pt="1rem"
            align="center"
            border="1px"
            borderColor="teal"
          >


<Link to= {`/Download/${el._id}`}>
            <BsFileEarmarkMedical size="100px" />
</Link>

            <Flex
              mb="0.5rem"
              mt="0.5rem"
              gap="0.5rem"
              color="#1a202c"
              justifyContent="space-evenly"
              cursor={"pointer"}
            >
              {/* preview button */}
              <Preview fileData={el.fileData} />

              {/* share file option */}
              <ShareFile el={el} />

              {/* file details */}
              <FileDetails el={el} />

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
