import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Navbar() {

  const isLogin = useSelector((store) => store.AuthReducer.isLogin)

  return (
   <Flex w="full" align={"right"} justify="right" p="1rem" gap="1rem" as="b">
    <Link to="/"> All_Files </Link>
    <Link to="/UploadFiles"> Upload_Files </Link>

{!isLogin?     <Link to="/authentication"> Signup/Login </Link> : ""}
  
   </Flex>

  )
}
