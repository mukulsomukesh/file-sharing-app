import {
  useToast,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Text,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/AuthReducer/action";  
import { Navigate, useNavigate } from 'react-router-dom'

  export default function Login() {

    const dispatch = useDispatch()


    const [show, setShow] = useState(false);
    const [userInput, setUserInput] = useState({ email:"", password:"" })
    const loginMessage = useSelector((state) => state.AuthReducer.loginMessage)
    const isProcessing = useSelector((state) => state.AuthReducer.isProcessing)
    const isLogin = useSelector((store) => store.AuthReducer.isLogin)
    const navigate = useNavigate()
    const toast = useToast()
    
  function handelInputSubmit(){
    dispatch(login(userInput.email, userInput.password))
  }

  useEffect(()=>{
    let status;
    const navigate_url=localStorage.getItem('file-sharing-app-redirect-url')
 

    
    if(isLogin){      
      status="success"
      toastMessage(status)
      localStorage.removeItem("file-sharing-app-redirect-url");
      
      if(navigate_url===null){
        navigate("/UploadFiles")        
      }
      else{
        navigate(navigate_url)

      }
    }
    
    if(loginMessage.length>2){
      status="error"
toastMessage(status)
    }

    

  },[isLogin, loginMessage])


  // toast message
  function toastMessage(status){

return(
  toast({
    position:"top-right",
    title: loginMessage || "Login Success!",
    status: status,
    duration: 9000,
    isClosable: true,
  })

  )

}
  
    return (
      <>
      <Box>

        {/* email input */}
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Enter Your Email!" value={userInput.email || ""} onChange={(e)=> setUserInput((prev)=>( {...prev, email:e.target.value} ))} />
        </FormControl>

        {/* password input */}
        <FormControl isRequired mt="1rem">
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
            value={userInput.password || ""} onChange={(e)=> setUserInput((prev)=>( {...prev, password:e.target.value} ))}
              type={show ? "text" : "password"}
              placeholder="Enter password"/>

            <InputRightElement width="4.5rem">
              <Button bg="teal" color="white" h="1.75rem" size="sm" onClick={(e)=>{ setShow(!show) }}>
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
  