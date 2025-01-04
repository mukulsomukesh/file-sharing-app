import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
  import React, { useState, useEffect } from "react";
  import CustomInput from "../CustomInput";
  import CustomButton from "../CustomButton";
  import { useSelector, useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/AuthReducer/action";
  
  export default function ForgotPasswordModal() {
    const { forgotPasswordmMssage, forgotPasswordFail, forgotPasswordProcessing } = useSelector(
      (state) => state.AuthReducer
    );
    const dispatch = useDispatch();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      setError(""); // Clear error on user input
    };
  
    const handleSubmit = () => {
      if (!email) {
        setError("Email is required.");
        return;
      }
  
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
  
      // Dispatch forgotPassword action
      dispatch(forgotPassword(email));
    };
  
    useEffect(() => {
      if (forgotPasswordmMssage && !forgotPasswordFail) {
        toast({
          title: "Success",
          description: forgotPasswordmMssage,
          status: "success",
          position:"top-right",
          duration: 3000,
          isClosable: true,
        });
        setEmail(""); // Clear email field
        onClose(); // Close modal
      }
  
      if (forgotPasswordFail && !forgotPasswordProcessing) {
        toast({
          title: "Error",
          description: forgotPasswordmMssage,
          status: "error",
          position:"top-right",
          duration: 3000,
          isClosable: true,
        });
      }
    }, [forgotPasswordmMssage, forgotPasswordFail, onClose, toast]);
  
    return (
      <>
        <Text cursor={"pointer"} as="b" onClick={onOpen}>
          Forgot Password
        </Text>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Reset Your Password</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* CustomInput for Email */}
              <CustomInput
                label="Email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                error={error}
                type="email"
                required
              />
            </ModalBody>
            <ModalFooter>
              <CustomButton
                text="Forgot Password"
                isLoading={forgotPasswordProcessing}
                loadingText="Sending OTP on email"
                onClick={handleSubmit}
                disabled={forgotPasswordProcessing}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  