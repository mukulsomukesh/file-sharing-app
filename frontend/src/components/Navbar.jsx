import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


const Links = [
  { id: 0, name: "All Files", path: "/" },
  { id: 1, name: "Upload File", path: "/upload_files" },
];

export default function Navbar() {

  const isLogin = useSelector((store) => store.AuthReducer.isLogin)
  const location = useLocation();
  const userFullName = localStorage.getItem('file-sharing-application-user-name')


  function handelLogout() {

    // remove token from local storage
    localStorage.removeItem("file-sharing-application-jwt")

    // reload page
    window.location.reload(true)
  }

  return (
    <>
      {/* box container */}
      <Box boxShadow="md" w="100%" bg="white" h="80px" display={!isLogin ? "none" : ""}   zIndex="999"  position="fixed">

        {/* flex that contain all the links */}
        <Flex
        h="100%"
          p="1.2rem"
          pl="2rem"
          pr="2rem"
          alignItems={"center"}
          justifyContent={"space-between"}
        >

          {/* app name */}
          <Text fontSize={"2xl"} color={"primary.500"} as="b">Secure File Sharing </Text>

          {/* menu display only when user login   */}
          {isLogin && (

            <Menu>

              {/* menu button */}
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
                border={"2px"}
                borderColor={"primary.500"}
              >
                <Avatar
                  size={'md'}
                  src={'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.387038565.1711396958&semt=ais'}
                />
              </MenuButton>

              {/* menu list */}
              <MenuList alignItems={'center'}>
                <br />

                {/* profile image */}
                <Center>
                  <Avatar
                    size={'2xl'}
                    src={'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.387038565.1711396958&semt=ais'}
                  />
                </Center>
                <br />
                <Center fontWeight={"bold"} >
                  <p>{userFullName}</p>
                </Center>
                <br />
                <MenuDivider />

                {/* map items */}
                {Links.map((el) => (
                  <Link to={el.path} key={el.id} >
                    <MenuItem
                      py="2"
                      as={location.pathname === el.path ? "b" : ""}
                      _hover={{ background: "primary.500", color: "primary.50" }}
                    >
                      {el.name}
                    </MenuItem>
                  </Link>
                ))}

                {/* logout button */}
                <MenuItem _hover={{ background: "primary.500", color: "primary.50" }} borderTop={"2px"} borderColor={"primary.500"} onClick={() => { handelLogout() }}> LOGOUT </MenuItem>

              </MenuList>
            </Menu>
          )}
        </Flex>
      </Box>
    </>
  );
}
