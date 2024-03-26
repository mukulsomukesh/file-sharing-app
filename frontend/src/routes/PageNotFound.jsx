import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { AiOutlineWarning } from 'react-icons/ai';
import { motion } from 'framer-motion';

export default function PageNotFound() {
  return (
    <Flex
      as={motion.div}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      width="100%"
      height="95vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      color="primary.500"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      >
        <AiOutlineWarning size={50} />
      </motion.div>
      <Heading as="h1" fontSize="2xl" mt={4}>
        Oops! Page Not Found
      </Heading>
      <Text mt={2}>The page you are looking for does not exist.</Text>
    </Flex>
  );
}
