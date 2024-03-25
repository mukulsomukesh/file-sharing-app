import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsEyeFill, BsArrowUpRight } from "react-icons/bs";
import { CgArrowTopRightR } from "react-icons/cg"
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
      {isLoading ? <Loader /> : ""}

      {/* Error display when error come */}
      {isError ? <Error /> : ""}

      {/* no file is uploaded yed */}
      {!isLoading && allFiles.length === 0 ? <NoDataFound /> : ""}

      <Box w={"92%"} m="auto" border={"1px"} mt="8" mb="8" borderRadius={"10px"} borderColor={"gray.300"} >
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr h={"60px"} >
                <Th >SR No</Th>
                <Th style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>File Name</Th>
                <Th >File Type</Th>
                <Th >Upload Date</Th>
                <Th >Last Update</Th>
                <Th >Status</Th>
                <Th textAlign={"right"} >Actions</Th>
                {/* <Th>Download File</Th> */}
                {/* <Th isNumeric>multiply by</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {!isError && !isLoading && allFiles?.map((el, index) => (

                <Tr>
                  <Td >{index + 1}</Td>
                  <Td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >{el.name}.{el.fileType}</Td>
                  <Td>.{el.fileType}</Td>
                  <Td>{new Date(el.createdAt).toLocaleString()}</Td>
                  <Td>{new Date(el.updatedAt).toLocaleString()}</Td>
                  <Td  >
                    <Tag size='lg' colorScheme={el.isProtected ? "red" : "green"} borderRadius='full'>
                      <TagLabel>{el.isProtected ? "Password Protected" : "Not Protected"}</TagLabel>
                    </Tag>

                  </Td>
                  <Td display={"flex"} justifyContent={"space-around"}  >

                    {/* preview button */}
                    <Preview fileData={el.fileData} />

                    {/* share file option */}
                    <ShareFile el={el} />

                    <Tooltip hasArrow label='File Details' bg='primary.500'>
                      <Box h="20px" w="20px" ml={"3"}>
                        <Link to={`/FileDetail/${el._id}`}>
                          <CgArrowTopRightR size="20px" onClick={() => dispatch({ type: FILE_MORE_INFO, payload: el })} />
                          {/* <FileDetails el={el} /> */}
                        </Link>
                      </Box>
                    </Tooltip>


                  </Td>

                </Tr>
              ))}

            </Tbody>
            {/* <Tfoot><Button> Preiew</Button> Imperial to metric conversion factors <Button>Next</Button>

            </Tfoot> */}
          </Table>

          {/* <Flex justifyContent={"center"} alignItems={"center"} gap="4" mt={4} mb={4} >
            <Button> Preiew</Button> Page 1 of 3 <Button>Next</Button>
          </Flex> */}
        </TableContainer>
      </Box>



    </>
  );
}
