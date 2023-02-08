import {
  Box,
  Button,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsFileEarmarkMedical, BsEyeFill } from "react-icons/bs";
import ShareFile from "../components/DisplayFiles/ShareFile";
import FileDetails from "../components/DisplayFiles/FileDetails";

export default function DisplayFiles() {
  let arr = [1, 2, 3, 4, 5, 9, 9, 9];

  return (
    <>

    {/* grid */}
      <SimpleGrid minChildWidth="130px" spacing="2rem" p="2rem">
        
        {/* map files */}
        {arr.map((el) => (
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

            <BsFileEarmarkMedical size="100px" />

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
              <ShareFile />

              {/* file details */}
              <FileDetails />
            </Flex>

{/* file name */}
            <Box bg="teal" p="0.5rem" color="white">
              <Text lineHeight="1rem"> this is my file name </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}
