import { Alert, AlertIcon, Box, Button, Center, Checkbox, Flex, Heading, Input, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

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
    
      if(url){
        fetch('http://localhost:8080/api/upload',{
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
              console.log("Something went wrong!")
            }
            else{
              console.log("Success!")
            }
          }).catch(err => {
            console.log(err)
          })
      }

      setProcess(false)
  },[url])


  const postDetails = async () => {

    setProcess(true)

    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","filesharing-app")
    data.append("cloud_name","dmzzzl5jj")

      fetch("https://api.cloudinary.com/v1_1/dmzzzl5jj/image/upload",{
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
  <Input  type='file' onChange={(e) => setImage(e.target.files[0])}   />
  <Checkbox onChange={()=>{ setFileProtected(!fileProtected) }}> Set Password </Checkbox>
  <Input value={password} placeholder='Set Password' onChange={(e) => setPassword(e.target.value)} type="text" disabled={!fileProtected} />
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
