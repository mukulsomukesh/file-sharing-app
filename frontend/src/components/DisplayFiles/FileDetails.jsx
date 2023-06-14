import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, VStack, useDisclosure, HStack, Text } from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi";
import DeleteFile from "./DeleteFile";
import RenameFile from "./RenameFile";
import ChangeFilePassword from "./ChangeFilePassword";

export default function FileDetails({ el }) {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (

    <>
      <IconButton onClick={onOpen} bg="transparent" _hover={{ background: "transparent" }} h="20px" w="20px" icon={<GiHamburgerMenu size="20px" />} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>File Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <HStack> <Text as='b'> Name: </Text><Text> {el.name} </Text> </HStack>
            <HStack mt={2}> <Text as='b'> File Status: </Text> <Text> {el.isProtected ? "Password Protected" : "Not Password Protected"} </Text> </HStack>
            <HStack mt={2}> <Text as='b'> Upload Date: </Text><Text> {new Date(el.createdAt).toLocaleString()} </Text> </HStack>
            <HStack mt={2}> <Text as='b'> Last Update Date: </Text><Text> {new Date(el.updatedAt).toLocaleString()} </Text> </HStack>

            <RenameFile el={el} />
            <ChangeFilePassword el={el} />

            <DeleteFile _id={el._id} />

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}