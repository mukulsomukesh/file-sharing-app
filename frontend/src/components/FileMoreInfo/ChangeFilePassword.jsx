import { Button, Checkbox, Input, InputGroup, VStack, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { modifyFile } from "../../redux/AppReducer/action";

export default function ChangeFilePassword({ el }) {

  // define states
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.AppReducer.isLoading);
  const isError = useSelector((state) => state.AppReducer.isError);
  const message = useSelector((state) => state.AppReducer.message);


  // use effect
  useEffect(() => {

    // if change password fail
    if (isError && !isLoading) {
      toastMessage(message, 'error');
    }
    else if (!isError && !isLoading && message.length > 2) {
      // change password success
      toastMessage(message, 'success');
    }

  }, [isError, isLoading]);


  // handel change password
  function handelPasswordChange() {

    // passsword length lessthen 30
    if (inputVal === '' || inputVal.length > 30) {
      toastMessage('Invalid input!', 'warning');
    }
    else {
      el.isProtected = true
      el.password = inputVal;
      dispatch(modifyFile(el));
      setInputVal("")
      setIsCheckboxChecked(false)
    }
  }


  // toast message
  function toastMessage(msg, status) {
    toast({
      position: 'top-right',
      title: msg,
      status: status,
      duration: 2500,
      isClosable: true,
    });
  }

  return (
    <VStack mt={5} spacing={4} align="flex-start">

      {/* checkbox to enable or disable input */}
      <Checkbox
        colorScheme="teal"
        isChecked={isCheckboxChecked}
        mb={-2}
        onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
      >
        Set {el.isProtected ? "New " : ""}  Password
      </Checkbox>

      {/* input group */}
      <InputGroup size="sm">

        {/* change password input */}
        <Input
          p="7"
          h="30px"
          value={inputVal}
          onChange={(e) => { setInputVal(e.target.value) }}
          roundedLeft="10px" // Apply 10px border radius to the left
          rounded="0"
          border="1px"
          borderColor="primary.500"
          placeholder="New Password"
          disabled={!isCheckboxChecked}
          bg="primary.100"
        />

        {/* submit button */}
        <Button
          h="58px"
          p="7"
          colorScheme="teal"
          px={5}
          py={2}
          w="150px"
          roundedRight="10px" 
          _hover={{ bg: 'primary.400' }}
          isDisabled={!isCheckboxChecked || isLoading}
          onClick={handelPasswordChange}
          isLoading={isLoading}
          loadingText={isLoading ? "Please Wait" : ""}
          variant={isLoading ? "outline" : "solid"}
          rounded={"0"}
          bg="primary.500"
        >
          Change
        </Button>

      </InputGroup>
    </VStack>
  );
}
