import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    VisuallyHidden,
  } from '@chakra-ui/react';
  import { FaGithub,FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
  
  const SocialButton = ({
    children,
    label,
    href,
  }) => {
    return (
      <chakra.button
        bg={"primary.500"}
        color="primary.50"
        rounded={'full'}
        border="2px"
        borderColor={"primary.500"}
        w={10}
        h={10}
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.5s ease'}
        target="_blank" 
      rel="noopener noreferrer" 
        _hover={{
          bg: "primary.50",
          color:"primary.500"
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
      borderColor="primary.500"
      bg="#f4f5f7"
        color="primary.500">
        <Container
          as={Stack}
          maxW={'8xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify='space-between'
          align='center'>
          <Text fontSize={"lg"} as="b">Designed And Developed By Mukul Jatav</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Linkedin'}  href={'https://www.linkedin.com/in/mukul-jatav/'}>
              <FaLinkedinIn size={"24"} />
            </SocialButton>
            <SocialButton label={'Github'} href={'https://github.com/mukulsomukesh'}>
              <FaGithub size={"24"}/>
            </SocialButton>
            <SocialButton label={'Instagram'} href={'https://www.instagram.com/mukul_mukesh_jatav/'}>
              <FaInstagram size={"24"}/>
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    );
  }