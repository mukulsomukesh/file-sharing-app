import { Button, Checkbox, Input, InputGroup, VStack } from '@chakra-ui/react';
import React from 'react'

export default function ChangeFilePassword({ _id }) {
    return (
        <VStack mt={5} spacing={4} align="flex-start">
            <Checkbox
            // isChecked={isFileSelected}
            // onChange={() => { setIsFileSelected(!isFileSelected); }}
            >
                Change file password
            </Checkbox>
            <InputGroup size="sm">
                <Input rounded="0" placeholder="mysite" />
                <Button> Submit </Button>
            </InputGroup>
        </VStack>
    )
}
