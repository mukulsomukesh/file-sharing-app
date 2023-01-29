import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
   <Flex>
    <Link to="/"> Home </Link>
    <Link to="/authentication"> Signup/Login </Link>
   </Flex>

  )
}
