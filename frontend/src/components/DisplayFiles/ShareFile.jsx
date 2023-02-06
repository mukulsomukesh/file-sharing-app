import { Button, IconButton, Input, InputGroup, InputRightElement, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import { GiHamburgerMenu, GiShare } from "react-icons/gi";
import { RiFileCopyFill } from "react-icons/ri";

export default function ShareFile() {
  
    return (
<>

<Popover>
  <PopoverTrigger>
  <IconButton bg="transparent" _hover={{background:"transparent"}} h="20px" w="20px" icon={ <GiShare size="20px" />} />
    {/* <Button>Trigger</Button> */}
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Share File</PopoverHeader>
    <PopoverBody p="1rem">

    <InputGroup>
      <Input value={"www.google.co.in"} /> 
    <InputRightElement  children={<RiFileCopyFill color="teal" />} />
  </InputGroup>
    </PopoverBody>
  </PopoverContent>
</Popover>
</>
    )
  }
  