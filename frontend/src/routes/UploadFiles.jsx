import { Alert, AlertIcon, Box, Button, Center, Checkbox, Flex, Heading, Input, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ImUpload } from "react-icons/im";

export default function UploadFiles() {

  const [name,setName] = useState("");
  const [fileType,setFiletype] = useState("");
  const [protect,setProtect] = useState(false);
  const [password,setPassword] = useState("");
  const [image,setImage] = useState("");
  const [url,setUrl] = useState("");
  const [fileProtected, setFileProtected] = useState(false)
  const [process, setProcess] = useState(false)


  useEffect(()=>{
    console.log("token ", typeof localStorage.getItem('jwt'), localStorage.getItem('jwt'))
      fetch('https://file-sharing-app-ioyi.onrender.com/api/upload',{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        name,
        fileType,
        isProtected:protect,
        password,
        pic:url
      })
      }).then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.error){
console.log("success")
        }
        else{
          console.log("fail")
        }
      }).catch(err => {
        console.log(err)
      })

      setProcess(false)
  },[url])


  const postDetails = async () => {

    setProcess(true)

    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","filesharing-app")
    data.append("cloud_name","dmzzzl5jj")

   let ans;
return ans = await fetch("https://api.cloudinary.com/v1_1/dmzzzl5jj/image/upload",{
      method:"post",
      body:data
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setUrl(data.url)
    })
    .catch(err => {
      console.log(err)
    })

  }


  return (
    <>

<Flex h="85vh" align="center" justify="center" flexDirection="column" gap="1rem" >


<Heading> Upload File </Heading>

<Box w="20rem" display="flex" flexDirection="column" gap="1rem" boxShadow="dark-lg" p="1.5rem" borderRadius="1rem" >
  
  {/* fine input */}
  <Input  type='file' onChange={(e) => setImage(e.target.files[0])}   />



{/* set password checkbox */}
  <Checkbox onChange={()=>{ setFileProtected(!fileProtected) }}> Set Password </Checkbox>
  
  {/* enter password box */}
  <Input value={password} placeholder='Set Password' onChange={(e) => setPassword(e.target.value)} type="text" disabled={!fileProtected} />

{/* upload button */}
  <Button bg="teal" color="white" onClick={postDetails}
             colorScheme="teal"
             isLoading={process}
             loadingText={process ? "Please Wait" : ""}
             variant={process ? "outline" : "solid"}
  > Upload File </Button>

</Box>
</Flex>
    </>
  )
}
