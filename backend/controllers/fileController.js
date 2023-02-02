const {File} = require('../models/fileModel')
const multer  = require('multer')
const upload = multer({ dest: "../upload" })

const getFile = (req,res) => {
    res.send("all files")
    
}

const uploadFile = (req,res) => {
  
    
  
    // const payload = req.body
    // const post = new File({
    //     name:payload.name,
    //     fileType:payload.fileType,
    //     isProtected:payload.isProtected,
    //     password:payload.password
    // })
    // post.save().then(result => {
    //     res.json({post:result})
    // })
    // .catch(err => {
    //     console.log(err)
    // })
}



module.exports = {getFile , uploadFile}