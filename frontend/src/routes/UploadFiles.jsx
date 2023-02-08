import { Alert, AlertIcon, Box, Button, Center, Checkbox, Flex, Heading, Input, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ImUpload } from "react-icons/im";
import axios from "axios"

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


//       fetch('https://file-sharing-app-ioyi.onrender.com/api/upload',{
//       method:"post",
//       headers:{
//         "Content-Type":"application/json",
//         "Authorization":"Bearer "+localStorage.getItem('jwt')
//       },
//       body:JSON.stringify({
//         name,
//         fileType,
//         isProtected:protect,
//         password,
//         pic:url
//       })
//       }).then(res => res.json())
//       .then(data => {
//         console.log(data)
//         if(data.error){
// console.log("success")
//         }
//         else{
//           console.log("fail")
//         }
//       }).catch(err => {
//         console.log(err)
//       })

      setProcess(false)
  },[url])


  const uploadToMongodb = async () =>{
    console.log("token ", typeof localStorage.getItem('jwt'), localStorage.getItem('jwt'))

    let config = {
      headers: {
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      }
    }

    let obj = {
        name:"ex",
        fileType:"ex",
        isProtected:protect,
        password:"",
        photo:url      
    }

    // make get request
axios.post(`https://file-sharing-app-ioyi.onrender.com/api/upload/`, obj, config)
.then((res)=>{
  // if we get response
console.log("res = ", res)
})
.catch((err)=>{
  // 
  console.log("error = ",err)
})

console.log("over  = ")
setProcess(false)
  }



  const postDetails = async () => {

    setProcess(true)

    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","filesharing-app")
    data.append("cloud_name","dmzzzl5jj")

   let ans;
      ans = await fetch("https://api.cloudinary.com/v1_1/dmzzzl5jj/image/upload",{
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
console.log("send to cloudnary ")

uploadToMongodb()

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
