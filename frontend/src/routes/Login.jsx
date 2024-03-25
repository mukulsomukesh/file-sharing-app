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
  Flex,
  Heading,
  Icon,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/AuthReducer/action";
import { Navigate, useNavigate } from 'react-router-dom'
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { FaFileShield } from "react-icons/fa6";

export default function Login() {

  const dispatch = useDispatch()

  const [userInput, setUserInput] = useState({ email: "", password: "" })
  const [inputErrors, setInputErrors] = useState({ email: "", password: "" });
  const loginMessage = useSelector((state) => state.AuthReducer.loginMessage)
  const isProcessing = useSelector((state) => state.AuthReducer.isProcessing)
  const isLogin = useSelector((store) => store.AuthReducer.isLogin)
  const navigate = useNavigate()
  const toast = useToast()


  // email validation
  function validateEmail(email) {
    const validate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validate.test(email);
  }

  function handelInputSubmit() {
    // Reset input errors
    setInputErrors({ email: "", password: "" });

    // trim email and password
    const trimmedEmail = userInput.email.trim();
    const trimmedPassword = userInput.password.trim();

    let hasError = false;

    // if any field is missing
    if (!trimmedEmail || !trimmedPassword) {
      setInputErrors((prev) => ({ ...prev, email: "Please fill all the fields" }));
      hasError = true;
    }

    // check for valid email
    if (!validateEmail(trimmedEmail)) {
      setInputErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
      hasError = true;
    }

    // // check for max length
    // if (trimmedPassword.length < 8) {
    //   setInputErrors((prev) => ({ ...prev, password: "Password must contain at least 8 characters" }));
    //   hasError = true;
    // }

    if (hasError) {
      return;
    }

    // dispatch login
    dispatch(login(userInput.email, userInput.password));
  }


  useEffect(() => {
    let status;
    const navigate_url = localStorage.getItem('file-sharing-app-redirect-url')

    if (isLogin) {
      status = "success"
      toastMessage(status)
      localStorage.removeItem("file-sharing-app-redirect-url");

      if (navigate_url === null) {
        navigate("/UploadFiles")
      }
      else {
        navigate(navigate_url)

      }
    }

    if (loginMessage.length > 2) {
      status = "error"
      toastMessage(status)
    }
  }, [isLogin, loginMessage])


  // toast message
  function toastMessage(status, message) {
    return (
      toast({
        position: "top-right",
        title: message || loginMessage || "Login Success!",
        status: status,
        duration: 9000,
        isClosable: true,
      })
    );
  }

  return (
    <>
      <Flex flexWrap="wrap" bg="primary.100" color="primary.500">
        {/* Left side - Image */}
        <Flex borderEndRadius="70px" flexDirection="column" color="secondry.50" w={{ base: "100%", md: "50%" }} h="100vh" alignItems="center" justifyContent="center" bgGradient="linear(to-b,  primary.100, primary.100)">
            {/* <Icon as={FaFileShield} boxSize={16} /> */}
            <Image src={"http://res.cloudinary.com/dfrhy6m3m/image/upload/v1711359165/wez11lt0zponjsuzlnq6.png"} />
            <Text as="b" mt="4" > Share files securely with your friends</Text>
          
        </Flex>

        {/* Right side - Signup Form */}
        <Flex w={{ base: "100%", md: "50%" }} h="100vh" alignItems="center" justifyContent="center" bg="primary.50">
          <Box h="fit-content" maxW="550px" w="550px" p="4">

          <Heading color="primary.500" > Welcome On  </Heading>
          <Heading mb={"8"} color="primary.500"> Secure File Sharing  </Heading>

            {/* email input */}
            <CustomInput required={true} label="Email" value={userInput.email} onChange={(e) => setUserInput((prev) => ({ ...prev, email: e.target.value }))} error={inputErrors.email} type="text" placeholder="example@gmail.com" />

            {/* password input */}
            <CustomInput required={true} label="Password" value={userInput.password} onChange={(e) => setUserInput((prev) => ({ ...prev, password: e.target.value }))} error={inputErrors.password} type="password" placeholder="Enter Your Password" />


            {/* signup button */}
            <CustomButton loadingText="Please Wait" isLoading={isProcessing} onClick={handelInputSubmit} text="Login" />

            <Flex mt="4" justifyContent={"space-between"} alignItems={"center"} >
              <Text   > Don't have an account,  <span style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => { navigate("/signup") }} >Signup</span> </Text>

              <Text>Forgot Password</Text>

            </Flex>
          </Box>
        </Flex>
      </Flex>

    </>
    // <Box>

    //   {/* email input */}
    //   <FormControl isRequired>
    //     <FormLabel>Email</FormLabel>
    //     <Input placeholder="Enter Your Email!" value={userInput.email || ""} onChange={(e) => setUserInput((prev) => ({ ...prev, email: e.target.value }))} />
    //   </FormControl>

    //   {/* password input */}
    //   <FormControl isRequired mt="1rem">
    //     <FormLabel>Password</FormLabel>
    //     <InputGroup size="md">
    //       <Input
    //         value={userInput.password || ""} onChange={(e) => setUserInput((prev) => ({ ...prev, password: e.target.value }))}
    //         type={show ? "text" : "password"}
    //         placeholder="Enter password" />

    //       <InputRightElement width="4.5rem">
    //         <Button bg="teal" color="white" h="1.75rem" size="sm" onClick={(e) => { setShow(!show) }}>
    //           {show ? "Hide" : "Show"}
    //         </Button>
    //       </InputRightElement>
    //     </InputGroup>
    //   </FormControl>

    //   {/* login button */}
    //   <Button mt="1rem" color="white" bg="teal" w="full"
    //     colorScheme="teal"
    //     isLoading={isProcessing}
    //     loadingText={isProcessing ? "Please Wait" : ""}
    //     variant={isProcessing ? "outline" : "solid"}
    //     onClick={(e) => { handelInputSubmit() }}>
    //     Login
    //   </Button>

    //   {/* <Text fontSize={"xs"} as={"b"} color="red">{loginMessage}</Text> */}

    // </Box>
  );
}
