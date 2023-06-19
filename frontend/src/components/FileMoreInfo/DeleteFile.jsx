import { Button, Checkbox, useToast, VStack, } from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFile } from "../../redux/AppReducer/action";
import { useEffect } from "react";

export default function DeleteFile({ _id }) {

    const isLoading = useSelector((state) => state.AppReducer.isLoading);
    const isError = useSelector((state) => state.AppReducer.isError);
    const message = useSelector((state) => state.AppReducer.message);
    const dispatch = useDispatch()
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

    }, [isLoading, isError, message])


    function handelDeleteFile() {
        dispatch(deleteFile(_id));
    }

    return (

        <VStack mt={5} spacing={4} align="flex-start">
            <Checkbox
                isChecked={isFileSelected}
                onChange={() => { setIsFileSelected(!isFileSelected); }}
            >
                Are you want to delete this file?
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
    )
}