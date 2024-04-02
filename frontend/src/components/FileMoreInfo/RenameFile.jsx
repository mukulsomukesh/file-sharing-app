import { Button, Checkbox, Input, InputGroup, VStack, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { modifyFile } from "../../redux/AppReducer/action";

export default function RenameFile({ el }) {

  // define states
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.AppReducer.isLoading);
  const isError = useSelector((state) => state.AppReducer.isError);
  const message = useSelector((state) => state.AppReducer.message);


  // useEffect
  useEffect(() => {

    // if request fail
    if (isError && !isLoading) {
      toastMessage(message, 'error');
    }
    else if (!isError && !isLoading && message.length > 2) {
      // if request success
      toastMessage(message, 'success');
    }
  }, [isError, isLoading]);


  // handel rename file
  function handelRenameFile() {

    // name length less then 30 char
    if (inputVal === '' || inputVal.length > 30) {
      toastMessage('Invalid input!', 'warning');
    }
    else {
      el.name = inputVal;

      // dispatch modify file
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
        onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
        mb={"-2"}
      >
        Rename File
      </Checkbox>

      {/* input group */}
      <InputGroup size="sm">

        {/* input to take user input */}
        <Input
          p="7"
          h="30px"
          value={inputVal}
          roundedLeft="10px"
          onChange={(e) => { setInputVal(e.target.value) }}
          rounded="0"
          placeholder="New Name"
          border="1px"
          borderColor="primary.500"
          bg="primary.100"
          disabled={!isCheckboxChecked}
        />

        {/* submit button */}
        <Button
          h="57px"
          p="7"
          colorScheme="teal"
          px={5}
          py={2}
          w="150px"
          roundedRight="10px" // Apply 10px border radius to the right
          _hover={{ bg: 'primary.400' }}
          bg="primary.500"
          isDisabled={!isCheckboxChecked || isLoading}
          onClick={handelRenameFile}
          isLoading={isLoading}
          loadingText={isLoading ? "Please Wait" : ""}
          variant={isLoading ? "outline" : "solid"}
          rounded={"0"}
        >
          Change
        </Button>
      </InputGroup>
    </VStack>
  );
}
