import React, { useState, useEffect } from "react";
import { Flex, Heading, Box, Text, useToast } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { setNewPassword } from "../redux/AuthReducer/action";

export default function SetNewPassword() {
  const [userInput, setUserInput] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [inputErrors, setInputErrors] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [searchParams] = useSearchParams();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-fill OTP if present in the URL
    const otpFromUrl = searchParams.get("otp");
    if (otpFromUrl) {
      setUserInput((prev) => ({ ...prev, otp: otpFromUrl }));
    }
  }, [searchParams]);

  const validateInputs = () => {
    const errors = {};
    if (!userInput.otp) errors.otp = "OTP is required";
    if (!userInput.password) errors.password = "New password is required";
    if (!userInput.confirmPassword)
      errors.confirmPassword = "Confirm password is required";
    if (
      userInput.password &&
      userInput.confirmPassword &&
      userInput.password !== userInput.confirmPassword
    ) {
      errors.confirmPassword = "Passwords do not match";
    }
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputSubmit = async () => {
    if (!validateInputs()) return;

    setIsProcessing(true);
    setApiError("");
    setSuccessMessage("");

    try {
      const payload = {
        otp: userInput.otp,
        password: userInput.password,
      };
      const response = await setNewPassword(payload);

      setUserInput({
        otp: "",
        password: "",
        confirmPassword: "",
      });

      toast({
        position: "top-right",
        title: response.message || "Password updated successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (error) {
      toast({
        position: "top-right",
        title: error.message || "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Flex flexWrap="wrap" bg="primary.100" color="primary.500" mt="-100px">
      {/* Left side - Image */}
      <Flex
        borderEndRadius="70px"
        flexDirection="column"
        color="secondary.50"
        w={{ base: "100%", md: "50%" }}
        h="100vh"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-b,  primary.100, primary.100)"
      >
        <img
          src={
            "http://res.cloudinary.com/dfrhy6m3m/image/upload/v1711359165/wez11lt0zponjsuzlnq6.png"
          }
          alt="Secure File Sharing"
        />
        <Text as="b" mt="4">
          Share files securely with your friends
        </Text>
      </Flex>

      {/* Right side - Form */}
      <Flex
        w={{ base: "100%", md: "50%" }}
        h="100vh"
        alignItems="center"
        justifyContent="center"
        bg="primary.50"
      >
        <Box h="fit-content" maxW="550px" w="550px" p="4">
          <Heading color="primary.500">Set Your New Password</Heading>

          {/* API error message */}
          {apiError && (
            <Text color="red.500" mb="4">
              {apiError}
            </Text>
          )}
          {successMessage && (
            <Text color="green.500" mb="4">
              {successMessage}
            </Text>
          )}

          {/* OTP input */}
          <Box mb="4">
            <CustomInput
              label="OTP"
              value={userInput.otp}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, otp: e.target.value }))
              }
              placeholder="Enter OTP"
              error={inputErrors.otp}
            />
          </Box>

          {/* New Password input */}
          <Box mb="4">
            <CustomInput
              label="New Password"
              type="password"
              value={userInput.password}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder="Enter new password"
              error={!!inputErrors.password}
            />
            {inputErrors.password && (
              <Text color="red.500">{inputErrors.password}</Text>
            )}
          </Box>

          {/* Confirm Password input */}
          <Box mb="4">
            <CustomInput
              label="Confirm Password"
              type="password"
              value={userInput.confirmPassword}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              placeholder="Confirm your password"
              error={!!inputErrors.confirmPassword}
            />
            {inputErrors.confirmPassword && (
              <Text color="red.500">{inputErrors.confirmPassword}</Text>
            )}
          </Box>

          {/* Submit button */}
          <CustomButton
            loadingText="Please Wait"
            isLoading={isProcessing}
            onClick={handleInputSubmit}
            text="Set Password"
          />

        </Box>
      </Flex>
    </Flex>
  );
}
