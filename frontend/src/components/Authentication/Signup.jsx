import {
Text,
useToast ,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/AuthReducer/action";

export default function Signup() {

  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [userInput, setUserInput] = useState([{ name:"", email:"", password:"" }])
  const isProcessing = useSelector((state) => state.AuthReducer.isProcessing)
  const signupMessage = useSelector((state) => state.AuthReducer.signupMessage)
  const toast = useToast()

  function handelInputSubmit(){
    // dispatch signUp() function
    if(userInput.name && userInput.email && userInput.password ){
      dispatch(signUp(userInput.name, userInput.email, userInput.password))
      
      // set Difault values to inputs
          setUserInput({ name:"", email:"", password:"" })
    }
    else{
    toastMessage("Fill All The Fields")
    }

  }

  function toastMessage(signupMessage){

    var status="error";

    if(signupMessage=="User Already Exist!"){
      status="warning"
      }
    if(signupMessage=="User SignUp Success!"){
        status="success"
    }


return(
  toast({
    position:"top-right",
    title: signupMessage,
    status: status,
    duration: 9000,
    isClosable: true,
  })
)
}


useEffect(()=>{
    // toast message
if(signupMessage){
  toastMessage(signupMessage)
}
},[signupMessage])

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
          <Input  placeholder="Enter Your Email!" value={userInput.email} onChange={(e)=> setUserInput((prev)=>( {...prev, email:e.target.value} ))} />
        </FormControl>

        {/* password input */}
        <FormControl isRequired mt="1rem">
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
            value={userInput.password} onChange={(e)=> setUserInput((prev)=>( {...prev, password:e.target.value} ))}
              type={show ? "text" : "password"}
              placeholder="Enter password"/>

            <InputRightElement width="4.5rem">
              <Button bg="teal" color="white" h="1.75rem" size="sm" onClick={(e)=>{ setShow(!show) }}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button mt="1rem" color="white" bg="teal" w="full"
           colorScheme="teal"
           isLoading={isProcessing}
           loadingText={isProcessing ? "Please Wait" : ""}
           variant={isProcessing ? "outline" : "solid"}
           onClick={(e)=>{ handelInputSubmit() }}>
    Signup
</Button>

{/* <Text as="b" color="red">{signupMessage}</Text> */}


      </Box>
    </>
  );
}
