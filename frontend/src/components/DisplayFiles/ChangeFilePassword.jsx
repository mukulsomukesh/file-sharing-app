import { Button, Checkbox, Input, InputGroup, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function ChangeFilePassword({ el }) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  return (
    <VStack mt={5} spacing={4} align="flex-start">
      <Checkbox
        colorScheme="teal"
        isChecked={isCheckboxChecked}
        onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
      >
        Change File Password
      </Checkbox>
      <InputGroup size="sm">
        <Input
          rounded="0"
          placeholder="mysite"
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
          isDisabled={!isCheckboxChecked}
        >
          Change
        </Button>
      </InputGroup>
    </VStack>
  );
}
