import { Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { BsEyeFill } from "react-icons/bs";

export default function Preview({ fileData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getFilePreview = () => {
    const fileExtension = getFileExtension(fileData);
  
    switch (fileExtension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
      case "svg":
        return <img src={fileData.replace("http:","https:")} alt="Something Went Wrong!" />;
      case "pdf":
        return (
          <embed src={fileData.replace("http:","https:")} type="application/pdf" width="100%" height="500px" />
        );
      case "mp3":
      case "wav":
        return (
          <audio controls>
            <source src={fileData.replace("http:","https:")} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );
      case "mp4":
      case "webm":
      case "ogg":
      case "avi":
      case "mov":
      case "wmv":
      case "flv":
      case "mkv":
      case "m4v":
        return (
          <video width="100%" height="auto" controls>
            <source src={fileData.replace("http:","https:")} type={`video/${fileExtension}`} />
            Your browser does not support the video tag.
          </video>
        );
      case "txt":
        return <p>{fileData}</p>;
      case "doc":
      case "docx":
        return (
          <iframe src={`https://docs.google.com/gview?url=${fileData.replace("http:","https:")}&embedded=true`} width="100%" height="500px" frameborder="0" scrolling="no"></iframe>
        );
      // Add more cases for additional file types here
      default:
        return <p>Preview not available for this file type.</p>;
    }
  };

  const getFileExtension = (filename) => {
    return filename.split(".").pop().toLowerCase();
  };

  return (
    <>
    <Tooltip hasArrow label='File Preview' bg='primary.500'>
      <IconButton
        onClick={onOpen}
        bg="transparent"
        _hover={{ background: "transparent" }}
        h="20px"
        w="20px"
        icon={<BsEyeFill size="20px" />}
      />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{getFilePreview()}</ModalBody>
          <ModalFooter>
            <Button variant="solid" colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
