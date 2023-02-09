import { Button, IconButton, Input, InputGroup, InputRightElement, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GiHamburgerMenu, GiShare } from "react-icons/gi";
import { RiFileCopyFill } from "react-icons/ri";

export default function ShareFile({el}) {
  
  const [url, setUrl] = useState("");

  useEffect(() => {
    let location = window.location.href;

    // set url to input
    setUrl(`${location}Download/${el._id}`);
  }, []);

  // copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };


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

{/* input for share url */}
<InputGroup cursor="pointer" w="fit-content" bg="white">
        <Input value={url} />
        <InputRightElement children={<RiFileCopyFill color="teal" />} onClick={handleCopy} />
      </InputGroup>
    </PopoverBody>
  </PopoverContent>
</Popover>
</>
    )
  }
  