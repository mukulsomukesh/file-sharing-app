import {HStack, Box, Flex, Text, Heading, Button } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { ImDownload } from "react-icons/im";

export default function DownloadFile() {

    const [isProtected, setIsProtected] = useState(true)


  return (
<>
{/* flex container */}
<Flex h="80vh"align="center" justify="center" flexDirection="column" gap="1rem" >

{/* heading */}
<Heading> Download File </Heading>

{/* box that contain file name & download button */}
<Box w="20rem" p="1rem" display="flex" flexDirection="column" gap="1rem" justify="center" align="center" border="1px" borderRadius="1rem" borderColor="teal" boxShadow="dark-lg" >

{/* download icon */}
<Box>
<ImDownload size="100px" color="teal" />
</Box>

{/* file name */}
<HStack m="auto"> <Text as="b"> Name: </Text>  <Text> This is file name </Text></HStack>

{/* file size */}
<HStack m="auto"> <Text as="b"> Size: </Text>  <Text> 1 MB </Text></HStack>

{/* download button */}
<Button colorScheme="teal" variant="solid" disabled > Download </Button>

</Box>

</Flex>

</>
  )
}
