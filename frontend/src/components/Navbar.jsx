import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFormClose } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlinePoweroff } from 'react-icons/ai';


const Links = [
  {id:0, name: "All Files", path: "/" },
  {id:1, name: "Upload File", path: "/upload_files" },
];

export default function Navbar() {
 
  const isLogin = useSelector((store) => store.AuthReducer.isLogin)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  function handelLogout(){

    // remove token from local storage
    localStorage.removeItem("file-sharing-application-jwt")

    // reload page
    window.location.reload(true)
  }

  return (
    <>
    {/* box container */}
      <Box boxShadow="md" >

        {/* flex that contain all the links */}
        <Flex
          p="1.2rem"
          pl="2rem"
          pr="2rem"
          alignItems={"center"}
          justifyContent={"space-between"}
        >

          {/* Text & Logout   */}
          {!isLogin? 
            <Text fontSize={"2xl"} as="b"> File Sharing App </Text>:

            // logout button
            <Button
            leftIcon={<AiOutlinePoweroff />}
            variant="outline"
            colorScheme="teal"
            onClick={()=>{ handelLogout() }}>
            Logout
          </Button>

             }

          {/* hamburger & close button */}
          <IconButton
            icon={isOpen ? <GrFormClose /> : <RxHamburgerMenu />}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

{/* large screen view */}
          <HStack spacing={4} display={{ base: "none", md: "flex" }}>

            {/* map links */}
            {Links.map((el) => (
              <Link to={el.path} key={el.id} >
                <Button
                  variant={location.pathname === el.path ? "solid" : "outline"}
                  colorScheme="teal">
                  {el.name}
                </Button>
              </Link>
            ))}
          </HStack>
        </Flex>

{/* small screen view */}
        {isOpen ? (
          <Flex display={{ md: "none" }}>
            <Stack p="1rem"  spacing={4} style={{ position:"absolute" ,zIndex:"1", left:"auto", right:"auto"}} bg="inherit" float="right" >
            
            {/* map links */}
              {Links.map((el) => (
                <Link to={el.path} key={el.id}>
                  <Button
                    variant={location.pathname === el.path ? "outline" : "solid"}
                    colorScheme="teal">
                    {el.name}
                  </Button>
                </Link>
              ))}
            </Stack>
          </Flex>
        ) : null}

      </Box>
    </>
  );
}
