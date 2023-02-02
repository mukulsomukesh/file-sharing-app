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
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/AuthReducer/action";  

  export default function Login() {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [userInput, setUserInput] = useState([{ email:"", password:"" }])
    const loginMessage = useSelector((state) => state.AuthReducer.loginMessage)
    const isProcessing = useSelector((state) => state.AuthReducer.isProcessing)
    
  function handelInputSubmit(){
    dispatch(login(userInput.email, userInput.password))
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

        <Box ml="auto" textAlign={"right"} cursor={"pointer"}>
<Text color="teal" as="b" > Forgot Password! </Text>
</Box>

<Button mt="1rem" color="white" bg="teal" w="full"
           colorScheme="teal"
           isLoading={isProcessing}
           loadingText={isProcessing ? "Please Wait" : ""}
           variant={isProcessing ? "outline" : "solid"}

onClick={(e)=>{ handelInputSubmit() }}>
    Login
</Button>



<Text as="b" color="red">{loginMessage}</Text>

      </Box>
      </>
    );
  }
  