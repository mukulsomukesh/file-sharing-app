import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Text,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  
  export default function Login() {
    const [show, setShow] = useState(false);
    const [userInput, setUserInput] = useState([{ email:"", password:"" }])

    
  function handelInputSubmit(){
    alert(userInput)
  }

  
    return (
      <>
      <Box>

        {/* email input */}
        <FormControl isRequired>
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

<Box ml="auto" textAlign={"right"} mt="1rem" cursor={"pointer"}>
<Text color="teal" as="b" > Forgot Password! </Text>
</Box>



      </Box>
      </>
    );
  }
  