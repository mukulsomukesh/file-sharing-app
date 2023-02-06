import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi";


export default function FileDetails() {
  
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
<>

<IconButton onClick={onOpen} bg="transparent" _hover={{background:"transparent"}} h="20px" w="20px" icon={ <GiHamburgerMenu size="20px" />} />

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>File Details</ModalHeader>
    <ModalCloseButton />
    <ModalBody>

modal

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