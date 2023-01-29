import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function Signup() {
  const [show, setShow] = useState(false);
  const [userInput, setUserInput] = useState([{ name:"", email:"", password:"" }])

  function handelInputSubmit(){
    
  }

  return (
    <>
      <Box>
        {/* name input */}
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Enter Your Full Name!" value={userInput.name} onChange={(e)=> setUserInput((prev)=>( {...prev, name:e.target.value} ))} />
        </FormControl>

        {/* email input */}
        <FormControl isRequired mt="1rem">
          <FormLabel>Email</FormLabel>
          <Input placeholder="Enter Your Email!" value={userInput.email} onChange={(e)=> setUserInput((prev)=>( {...prev, email:e.target.value} ))} />
        </FormControl>

        {/* password input */}
        <FormControl isRequired mt="1rem">
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
            value={userInput.password} onChange={(e)=> setUserInput((prev)=>( {...prev, password:e.target.value} ))}
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"/>

            <InputRightElement width="4.5rem">
              <Button  bg="teal" color="white" h="1.75rem" size="sm" onClick={(e)=>{ setShow(!show) }}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

<Button mt="1rem" color="white" bg="teal" w="full" onClick={(e)=>{ handelInputSubmit() }}>
    Signup
</Button>

      </Box>
    </>
  );
}
