import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
   <Flex w="full" align={"right"} justify="right" p="1rem" gap="1rem" as="b">
    <Link to="/"> All_Files </Link>
    <Link to="/UploadFiles"> Upload_Files </Link>
    <Link to="/authentication"> Signup/Login </Link>
   </Flex>

  )
}
