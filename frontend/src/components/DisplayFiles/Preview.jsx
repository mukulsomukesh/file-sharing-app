import { Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { BsEyeFill } from "react-icons/bs";

export default function Preview({fileData}) {
  
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
<>
<IconButton onClick={onOpen} bg="transparent" _hover={{background:"transparent"}} h="20px" w="20px" icon={ <BsEyeFill size="20px" />} />

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>File Details</ModalHeader>
    <ModalCloseButton />
    <ModalBody>

    <img
    src={fileData}
    alt="Somthing Went Wrong!"
  />

    </ModalBody>

    <ModalFooter>
      <Button  mr={3} onClick={onClose}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

</>
)}