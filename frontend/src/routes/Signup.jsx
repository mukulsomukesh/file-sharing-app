import {
  Text,
  useToast,
  Box,
  Flex,
  Heading,
  Icon,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/AuthReducer/action";
import { FaFileShield } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

export default function Signup() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState({ name: "", email: "", password: "" });
  const [inputErrors, setInputErrors] = useState({ name: "", email: "", password: "" });
  const isProcessing = useSelector((state) => state.AuthReducer.isProcessing);
  const signupMessage = useSelector((state) => state.AuthReducer.signupMessage);
  const toast = useToast();

  // Basic email validation regex
  function validateEmail(email) {
    const validate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validate.test(email);
  }

  function handelInputSubmit() {
    // Reset input errors
    setInputErrors({ name: "", email: "", password: "" });

    // trim user input
    const trimmedName = userInput.name.trim();
    const trimmedEmail = userInput.email.trim();
    const trimmedPassword = userInput.password.trim();

    let hasError = false;

    // if any field is missing
    if (!trimmedName) {
      setInputErrors((prev) => ({ ...prev, name: "Please enter your name" }));
      hasError = true;
    }
    if (!trimmedEmail) {
      setInputErrors((prev) => ({ ...prev, email: "Please enter your email" }));
      hasError = true;
    }
    if (!trimmedPassword) {
      setInputErrors((prev) => ({ ...prev, password: "Please enter your password" }));
      hasError = true;
    }

    // check for valid email
    if (trimmedEmail && !validateEmail(trimmedEmail)) {
      setInputErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
      hasError = true;
    }

    // check for valid password
    if (trimmedPassword.length < 8) {
      setInputErrors((prev) => ({ ...prev, password: "Password must contain at least 8 characters" }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // dispatch signup
    dispatch(signUp(trimmedName, trimmedEmail, trimmedPassword));
  }

  useEffect(() => {
    // toast message
    if (signupMessage) {
      toast({
        position: "top-right",
        title: signupMessage,
        status: signupMessage === "User SignUp Success!" ? "success" : "warning",
        duration: 9000,
        isClosable: true,
      });

      // set input to default
      setUserInput({ email: "", password: "", name: "" });
    }
  }, [signupMessage]);

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

            {/* name input */}
            <CustomInput required={true} value={userInput.name} label="Name" onChange={(e) => setUserInput((prev) => ({ ...prev, name: e.target.value }))} error={inputErrors.name} type="text" placeholder="Enter Your Full Name" />

            {/* email input */}
            <CustomInput required={true} label="Email" value={userInput.email} onChange={(e) => setUserInput((prev) => ({ ...prev, email: e.target.value }))} error={inputErrors.email} type="text" placeholder="example@gmail.com" />

            {/* password input */}
            <CustomInput required={true} label="Password" value={userInput.password} onChange={(e) => setUserInput((prev) => ({ ...prev, password: e.target.value }))} error={inputErrors.password} type="password" placeholder="Enter Your Password" />


            {/* signup button */}
            <CustomButton loadingText="Please Wait" isLoading={isProcessing} onClick={handelInputSubmit} text="Signup" />

            <Text mt="4"  > Already have an account,  <span style={{fontWeight:"bold", cursor:"pointer"} } onClick={()=>{navigate("/login") }} >Login</span> </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
