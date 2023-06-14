import { Button, Checkbox, Input, InputGroup, VStack, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { modifyFile } from "../../redux/AppReducer/action";

export default function ChangeFilePassword({ el }) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.AppReducer.isLoading);
  const isError = useSelector((state) => state.AppReducer.isError);
  const message = useSelector((state) => state.AppReducer.message);

  useEffect(() => {
    if (isError && !isLoading) {
      toastMessage(message, 'error');
    }
  }, [isError, isLoading]);

  function handelPasswordChange() {
    if (inputVal === '' || inputVal.length > 30) {
      toastMessage('Invalid input!', 'warning');
    }
    else{
      el.isProtected= true
      el.password = inputVal;
      dispatch(modifyFile(el));
    }


  }

  function toastMessage(msg, status) {
    toast({
      position: 'top-right',
      title: msg,
      status: status,
      duration: 9000,
      isClosable: true,
    });
  }

  return(
    <VStack mt={5} spacing={4} align="flex-start">
      <Checkbox
        colorScheme="teal"
        isChecked={isCheckboxChecked}
        onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
      >
        Set {el.isProtected? "New ":  ""}  Password
      </Checkbox>
      <InputGroup size="sm">
        <Input
        value={inputVal}
        onChange={(e)=>{ setInputVal(e.target.value) }}
          rounded="0"
          placeholder="New Password"
          border="1px"
          borderColor="gray.300"
          _focus={{ borderColor: 'teal.400' }}
          disabled={!isCheckboxChecked}
        />
        <Button
          colorScheme="teal"
          px={5}
          py={2}
          borderRadius="0"
          _hover={{ bg: 'teal.500' }}
          isDisabled={!isCheckboxChecked || isLoading}
          onClick={handelPasswordChange}
          isLoading={isLoading}
          loadingText={isLoading ? "Please Wait" : ""}
          variant={isLoading ? "outline" : "solid"}
        >
          Change
        </Button>
      </InputGroup>
    </VStack>
  );
}
