import { Button, Checkbox, useToast, VStack, } from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyFile } from "../../redux/AppReducer/action";
import { useEffect } from "react";

export default function RemoveFilePassword({ el }) {

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


    }, [isLoading, isError])


    function handelDeleteFile() {
        el.isProtected= false
        el.password = "";
        dispatch(modifyFile(el));
      }

    return (

        <VStack mt={5} spacing={4} align="flex-start">
            <Checkbox
                isChecked={isFileSelected}
                onChange={() => { setIsFileSelected(!isFileSelected); }}
            >
                Remove Password from file
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
                Remove password
            </Button>
        </VStack>
    )
}