import { Button, Checkbox, useToast, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFile } from "../../redux/AppReducer/action";
import { useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import CustomButton from "../CustomButton";

export default function DeleteFile({ _id }) {

    // define states
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // State for modal visibility
    const isLoading = useSelector((state) => state.AppReducer.isLoading);
    const isError = useSelector((state) => state.AppReducer.isError);
    const message = useSelector((state) => state.AppReducer.message);
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();

    // udeEffect
    useEffect(() => {

        // if request fail
        if (!isLoading && isError) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }

        // if request success, redirect to home
        if (message == "File Removed.") {
            navigate("/");
        }
    }, [isLoading, isError, message]);


    // handel modal confirm button
    function handleConfirmation() {

        // dispatch delete file button
        dispatch(deleteFile(_id));

        setIsConfirmationModalOpen(false);
    }


    return (
        <VStack mt={5} spacing={4} align="flex-start">

            {/* open modal button */}
            <CustomButton loadingText="Deleting" text="Delete File" isLoading={isLoading} onClick={() => { setIsConfirmationModalOpen(true) }} />

            {/* Confirmation Modal */}
            <Modal isOpen={isConfirmationModalOpen} onClose={() => { setIsConfirmationModalOpen(false) }}>
                <ModalOverlay />

                {/* modal content */}
                <ModalContent>

                    {/* modal header and body */}
                    <ModalHeader>Confirm Deletion</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this file?
                    </ModalBody>
                    <ModalFooter>

                        {/* delete confirm button */}
                        <Button colorScheme="red" mr={3} onClick={handleConfirmation}>
                            Delete
                        </Button>

                        {/* cancel delete, close modal */}
                        <Button onClose={() => { setIsConfirmationModalOpen(false) }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
}
