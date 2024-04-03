import { Box, Button, Flex, Table, TableContainer, Tag, TagLabel, Tbody, Td, Text, Th, Thead, Tooltip, Tr, } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CgArrowTopRightR } from "react-icons/cg"
import ShareFile from "../components/DisplayFiles/ShareFile";
import { getAllFiles } from "../redux/AppReducer/action";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/DisplayFiles/Loader";
import Error from "../components/DisplayFiles/Error";
import { Link } from 'react-router-dom'
import Preview from "../components/DisplayFiles/Preview";
import NoDataFound from "../components/DisplayFiles/NoDataFound";

const FILE_MORE_INFO = "FILE_MORE_INFO";

export default function DisplayFiles() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.AppReducer.isLoading);
  const isError = useSelector((state) => state.AppReducer.isError);
  const allFiles = useSelector((state) => state.AppReducer.allFiles);
  const [page, setPage] = useState(1)

  // call getAllFiles 
  useEffect(() => {
    dispatch(getAllFiles(page));
  }, [page]);


  return (
    <>

      {/* loader Display when data is loading */}
      {isLoading ? <Loader /> : ""}

      {/* Error display when error come */}
      {isError ? <Error /> : ""}

      {/* no file is uploaded yed */}
      {!isLoading && allFiles.length === 0 ? <NoDataFound /> : ""}

      <Box w={"92%"} border={"1px"} borderRadius={"10px"} m="auto" mt="8" mb="8"  >
        <TableContainer borderRadius={"9px"}>
          <Table variant='simple'>

            {/* table header */}
            <Thead  >
              <Tr h={"60px"} backgroundColor={"primary.500"} >
                <Th textColor={"primary.100"}>SR No</Th>
                <Th textColor={"primary.100"} style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>File Name</Th>
                <Th textColor={"primary.100"} >File Type</Th>
                <Th textColor={"primary.100"} >Upload Date</Th>
                <Th textColor={"primary.100"} >Last Update</Th>
                <Th textColor={"primary.100"} >Status</Th>
                <Th textColor={"primary.100"} textAlign={"right"} >Actions</Th>
              </Tr>
            </Thead>
            <Tbody>

              {/* map files */}
              {!isError && !isLoading && allFiles.files?.map((el, index) => (

                // table row
                <Tr backgroundColor={index % 2 == 0 ? "gray.100" : "gray.50"}>

                  {/* index number */}
                  <Td >{((allFiles.currentPage - 1) * 10) + index + 1}</Td>

                  {/* file name */}
                  <Td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >{el.name}</Td>

                  {/* file type */}
                  <Td>.{el.fileType}</Td>

                  {/* upload date */}
                  <Td>{new Date(el.createdAt).toLocaleString()}</Td>

                  {/* last update */}
                  <Td>{new Date(el.updatedAt).toLocaleString()}</Td>

                  {/* protection status */}
                  <Td  >
                    <Tag size='lg' colorScheme={el.isProtected ? "red" : "green"} borderRadius='full'>
                      <TagLabel>{el.isProtected ? "Password Protected" : "Not Protected"}</TagLabel>
                    </Tag>

                  </Td>

                  {/* action buttons */}
                  <Td display={"flex"} justifyContent={"space-around"} pt={"5"}  >

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

        </TableContainer>

        {/* paginatation & total number of file text container */}
        <Flex justifyContent={"space-between"} alignItems={"center"} gap="4" mt={4} mb={4} wrap={"wrap"} px={6} >

          {/* total number of files */}
          <Text as={"b"} > Total Files {allFiles.totalFiles || 0} </Text>

          {/* paginatation button */}
          <Flex wrap={"wrap"} gap="2" alignItems={"center"} >

            {/* preview page button */}
            <Button backgroundColor={"primary.500"} border={"2px"} borderColor={"primary.500"} _hover={{ backgroundColor: "transparent", textColor: "primary.500" }} textColor={"primary.50"} mr="4" isDisabled={allFiles.currentPage == 1} onClick={() => { setPage(page - 1) }} > Preiew</Button>

            {/* total and current page */}
            <Text as={"b"}> Page {allFiles.currentPage || 0} of {allFiles.totalPages || 0} </Text>

            {/* next page button */}
            <Button backgroundColor={"primary.500"} border={"2px"} borderColor={"primary.500"} _hover={{ backgroundColor: "transparent", textColor: "primary.500" }} textColor={"primary.50"} ml={4} isDisabled={allFiles.currentPage == allFiles.totalPages} onClick={() => { setPage(page + 1) }}>Next</Button>
          </Flex>

        </Flex>

      </Box>



    </>
  );
}
