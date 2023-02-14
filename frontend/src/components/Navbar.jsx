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

const Links = [
  { name: "All Files", path: "/" },
  { name: "Upload File", path: "/UploadFiles" },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

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

          {/* user Name text  */}
          <Text fontSize={"2xl"} as="b"> File Sharing App </Text>

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
              <Link to={el.path}>
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
                <Link to={el.path}>
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
