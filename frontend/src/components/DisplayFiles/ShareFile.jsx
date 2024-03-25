import { IconButton, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GiShare } from "react-icons/gi";
import { RiFileCopyFill } from "react-icons/ri";

export default function ShareFile({ el }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [url, setUrl] = useState("");
  const toast = useToast();

  useEffect(() => {
    let location = window.location.href;

    // set url to input
    setUrl(`${location}Download/${el._id}`);
  }, [el]);

  // copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(url);

    return (
      toast({
        position: "top-right",
        title: "Url Copy To ClipBoard!",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    )
  };

  return (
    <>
      <Tooltip hasArrow label='Get File Sharing Link' bg='primary.500'>

        <IconButton
          bg="transparent"
          _hover={{ background: "transparent" }}
          h="20px"
          w="20px"
          icon={<GiShare size="20px" />}
          aria-label="Share File"
          onClick={onOpen}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* input for share url */}
            <InputGroup cursor="pointer" w="100%" mb="4" bg="white">
              <Input value={url} />
              <InputRightElement children={<RiFileCopyFill color="teal" />} onClick={handleCopy} />
            </InputGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
