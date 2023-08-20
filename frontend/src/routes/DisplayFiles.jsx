import {
  Box,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsEyeFill, BsArrowUpRight } from "react-icons/bs";
import {CgArrowTopRightR} from "react-icons/cg"
import ShareFile from "../components/DisplayFiles/ShareFile";
import FileDetails from "../components/DisplayFiles/FileDetails";
import { getAllFiles } from "../redux/AppReducer/action";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/DisplayFiles/Loader";
import Error from "../components/DisplayFiles/Error";
import { Link } from 'react-router-dom'
import Preview from "../components/DisplayFiles/Preview";
import FileTypeIcon from "../components/DisplayFiles/FileTypeIcon";
import NoDataFound from "../components/DisplayFiles/NoDataFound";

const FILE_MORE_INFO = "FILE_MORE_INFO";

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
{ !isLoading && allFiles.length===0? <NoDataFound /> : "" }

      {/* grid */}
      <SimpleGrid minChildWidth="140px" spacing="2rem" p="2rem" style={{ justifyItems: "flex-start" }}>
        {/* map files */}
        {!isError && !isLoading && allFiles?.map((el) => (
          <Box
          key={el.id}
          m="auto"
            overflow="hidden"
            borderRadius="1rem"
            boxShadow="2xl"
            height="fit-content"
            w={"140px"}
            h={"190px"}
            pt="1rem"
            align="center"
            border="1px"
            borderColor="teal"
          >


<Link to= {`/Download/${el._id}`}>
           <FileTypeIcon fileType={el.fileType} />
</Link>

            <Flex
              mb="0.5rem"
              mt="0.5rem"
              color="#1a202c"
              justifyContent="space-evenly"
              cursor={"pointer"}
            >
              {/* preview button */}
              <Preview fileData={el.fileData} />

              {/* share file option */}
              <ShareFile el={el} />

              {/* file details */}
              <Box w="40px">
              <Link to= {`/FileDetail/${el._id}`}>
                <CgArrowTopRightR size="20px"  onClick={() =>  dispatch({ type: FILE_MORE_INFO, payload: el }) } />
              {/* <FileDetails el={el} /> */}
              </Link>
              </Box>

            </Flex>

            {/* file name */}
            <Flex justifyContent="center" alignItems="center" bg="teal" p="0.5rem" color="white" h="40px">
  <Text lineHeight="1rem" m="0px" p="0px" textAlign="center" maxWidth="100%" isTruncated>
    {el.name}.{el.fileType}
  </Text>
</Flex>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}
