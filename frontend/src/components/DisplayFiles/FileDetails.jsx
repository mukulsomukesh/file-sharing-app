import { Button, Checkbox, useToast, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, VStack, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { deleteFile } from "../../redux/AppReducer/action";
import { useEffect } from "react";

export default function FileDetails({ _id }) {

  const isLoading = useSelector((state) => state.AppReducer.isLoading);
  const isError = useSelector((state) => state.AppReducer.isError);
  const message = useSelector((state) => state.AppReducer.message);
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isFileSelected, setIsFileSelected] = useState(false);
  const toast = useToast()

  useEffect(() => {

    if (!isLoading && isError) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    
    if (message=="File Removed.") {
      window.location.reload();
    }

  }, [isLoading, isError, message])


  function handelDeleteFile() {
    dispatch(deleteFile(_id));
  }

  return (

    <>
      <IconButton onClick={onOpen} bg="transparent" _hover={{ background: "transparent" }} h="20px" w="20px" icon={<GiHamburgerMenu size="20px" />} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>File Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <VStack spacing={4} align="flex-start">
              <Checkbox
                isChecked={isFileSelected}
                onChange={() => { setIsFileSelected(!isFileSelected); }}
              >
                Select file for deletion
              </Checkbox>
              <Button
                isDisabled={!isFileSelected || isLoading}
                mt="1rem" color="white" bg="teal" w="full"
                colorScheme="teal"
                isLoading={isLoading}
                loadingText={isLoading ? "Please Wait" : ""}
                variant={isLoading ? "outline" : "solid"}
                onClick={handelDeleteFile}
                h="40px">
                  Delete File
              </Button>
            </VStack>

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