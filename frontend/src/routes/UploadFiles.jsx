import React, { useEffect, useState } from 'react';
import M from 'materialize-css';

export default function UploadFiles() {
  const [name,setName] = useState("");
  const [fileType,setFiletype] = useState("");
  const [protect,setProtect] = useState(false);
  const [password,setPassword] = useState("");
  const [image,setImage] = useState("");
  const [url,setUrl] = useState("");

  useEffect(()=>{
    if(url)
    {
      fetch('http://localhost:5000/api/upload',{
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
          M.toast({html: data.error,classes:'#d50000 red accent-4'})
        }
        else{
          M.toast({html:'Created Post Succesfully!',classes:'#1de9b6 teal accent-3'})
          // navigate('/')
        }
      }).catch(err => {
        console.log(err)
      })
    }
    
  },[url])

  const postDetails = () => {
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
      // console.log(data)
      setUrl(data.url)
    })
    .catch(err => {
      console.log(err)
    })

  }


  return (
    <>
    <div>UploadFiles</div>

    <div>
      <input type='text' value={name} placeholder='name' onChange={(e) => setName(e.target.value)} />
      <input type='text' value={fileType} placeholder='file-type' onChange={(e) => setFiletype(e.target.value)} />
      <input type='checkbox' value={protect} placeholder='isProtected' onChange={(e) => setProtect(e.target.value)} />
      <input type='text' value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
      <input type='file' onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={postDetails} >
        Submit Post
      </button>
    </div>
    </>
    

  )
}
