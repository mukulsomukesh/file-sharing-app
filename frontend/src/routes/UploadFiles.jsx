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


  const toast = useToast()

  useEffect(()=>{
    console.log(url)
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
console.log("success")
        }
        else{
          console.log("fail")
        }
      }).catch(err => {
        console.log(err)
      })
  },[url])


  const postDetails = async () => {
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
  <Input  type='file' onChange={(e) => setImage(e.target.files[0])}   />
  <Checkbox onChange={()=>{ setFileProtected(!fileProtected) }}> Set Password </Checkbox>
  <Input placeholder='Enter Password' type="text" variant={"outline"}  disabled={!fileProtected} />
  <Button bg="teal" color="white" onClick={postDetails}> Upload File </Button>

</Box>
</Flex>

    {/* <div>UploadFiles</div>

    <div>
      <input type='text' value={name} placeholder='name' onChange={(e) => setName(e.target.value)} />
      <input type='text' value={fileType} placeholder='file-type' onChange={(e) => setFiletype(e.target.value)} />
      <input type='checkbox' value={protect} placeholder='isProtected' onChange={(e) => setProtect(e.target.value)} />
      <input type='text' value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
      <input type='file' onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={postDetails} >
        Submit Post
      </button>
    </div> */}
    </>
  )
}
