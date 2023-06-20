import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
  } from '@chakra-ui/react';
  import { FaGithub,FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
  import { ReactNode } from 'react';
  
  const SocialButton = ({
    children,
    label,
    href,
  }) => {
    return (
      <chakra.button
        bg={"#f4f5f7"}
        color="teal"
        rounded={'full'}
        w={8}
        h={8}
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: "teal",
          color:"white"
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };
  
  export default function Footer() {
    return (
      <Box
      borderTop="1px"
      borderColor="teal"
      bg="#f4f5f7"
        color="teal">
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify='space-between'
          align='center'>
          <Text as="b">© Mukul Jatav. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Linkedin'} href={'https://www.linkedin.com/in/mukul-jatav/'}>
              <FaLinkedinIn />
            </SocialButton>
            <SocialButton label={'Github'} href={'https://github.com/mukulsomukesh'}>
              <FaGithub />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'https://www.instagram.com/mukul_mukesh_jatav/'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    );
  }