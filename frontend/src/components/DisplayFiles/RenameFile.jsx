import { Button, Checkbox, Input, InputGroup, Text, VStack } from '@chakra-ui/react';
import React from 'react'

export default function RenameFile({ _id }) {
  return (
    <VStack mt={5} spacing={4} align="flex-start">
    <Checkbox
        // isChecked={isFileSelected}
        // onChange={() => { setIsFileSelected(!isFileSelected); }}
    >
        Rename file
    </Checkbox>

    <InputGroup size="sm">
    <Input rounded="0" placeholder="mysite" />
    <Button> Submit </Button>
  </InputGroup>

</VStack>
  )
}
