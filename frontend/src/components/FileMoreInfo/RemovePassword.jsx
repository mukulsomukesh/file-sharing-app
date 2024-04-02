import { Button, Checkbox, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, VStack, } from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyFile } from "../../redux/AppReducer/action";
import { useEffect } from "react";
import CustomButton from "../CustomButton";

export default function RemoveFilePassword({ el }) {

    // define states
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const isLoading = useSelector((state) => state.AppReducer.isLoading);
    const isError = useSelector((state) => state.AppReducer.isError);
    const message = useSelector((state) => state.AppReducer.message);
    const dispatch = useDispatch()
    const toast = useToast()

    useEffect(() => {

        // if remove password fail
        if (!isLoading && isError) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }

    }, [isLoading, isError])


    // handel remove password confirm, modal confirm button
    function handleConfirmation() {
        el.isProtected = false
        el.password = "";

        // dispatch modify file button
        dispatch(modifyFile(el));

        setIsConfirmationModalOpen(false);
    }

    // close modal, handel cancell
    function handleCancellation() {
        setIsConfirmationModalOpen(false);
    }


    return (

        <VStack mt={5} spacing={4} align="flex-start">

            {/* remove password button, open modal on click */}
            <CustomButton loadingText="Remove Password" text="Remove Password" isLoading={isLoading} onClick={() => { setIsConfirmationModalOpen(true) }} />

            {/* Confirmation Modal */}
            <Modal isOpen={isConfirmationModalOpen} onClose={handleCancellation}>
                <ModalOverlay />
                <ModalContent>

                    {/* modaal header and content */}
                    <ModalHeader>Confirm Deletion</ModalHeader>
                    <ModalBody>
                        Are you sure you want to remove this password?
                    </ModalBody>

                    <ModalFooter>

                        {/* confirm remove passsword */}
                        <Button colorScheme="red" mr={3} onClick={handleConfirmation}>
                            Remove Password
                        </Button>

                        {/* cancel request */}
                        <Button onClick={handleCancellation}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    )
}