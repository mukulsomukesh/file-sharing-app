import { Box, Center, CircularProgress, Text } from '@chakra-ui/react'
import React from 'react'

export default function Loader() {
  return (
<>

<Center h="90vh" >

<Box align="center" as="b">
<CircularProgress isIndeterminate color='teal' />
<Text mt="1rem" > Please Wait! </Text>
</Box>

</Center>
</>
  )
}
