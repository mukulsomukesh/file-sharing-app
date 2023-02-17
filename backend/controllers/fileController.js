const {File} = require('../models/fileModel')


const getFile = async(req,res) => {
    const file = await File.find({user:req.user._id})
    res.json(file)
}

const uploadFile = (req,res) => {
  const {name,fileType,isProtected,password,pic} = req.body;
  const post = new File({
    name,
    fileType,
    isProtected,
    password,
    fileData:pic,
    user:req.user._id
  })
  post.save().then(result => {
    res.json({post:result})
  })
  .catch(err => {
    console.log(err)
  })
}


const getSingleFile = (req, res) => {
  File.findById(req.params.id)
    .then(post => {
      if (!post) res.status(404).json({ message: "File not found" });
      res.json(post);
    })
    .catch(err => {
      console.log(err);
    });
};


const updateFile = async (req,res) => {
  const {name,fileType,isProtected,password, fileData} = req.body;

  const data = await File.findById(req.params.id);

  if(data) {
    data.name=name,
    data.fileType=fileType,
    data.isProtected=isProtected,
    data.password=password,
    data.fileData=fileData
    // data.user=req.user._id

      const updateData = await data.save();
// console.log(name,fileType,isProtected,password, fileData,user_id)    
      res.json({message:"File Updated.", data:data})
  } else {
      res.status(404);
      throw new Error("File not found")
  }
}


const deleteFile = async(req,res) => {
  const data = await File.findById(req.params.id);

  if(data){
      await data.remove();
      res.json({message:"File Removed."})
  } else {
      res.status(404);
      throw new Error("File not found")
  }
}



module.exports = {getFile , uploadFile, getSingleFile, deleteFile, updateFile}