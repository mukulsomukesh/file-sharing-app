const { File } = require('../models/fileModel')


// get all files
const getFile = async (req, res) => {
  try {

    // find all files
    const files = await File.find({ user: req.user._id }).select('-password');

    // response
    res.json(files);
  } catch (err) {

    // console and send error in response
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};



// upload file
const uploadFile = (req, res) => {
  const { name, fileType, isProtected, password, pic } = req.body;
  const post = new File({
    name,
    fileType,
    isProtected,
    password,
    fileData: pic,
    user: req.user._id
  })
  post.save().then(result => {
    res.json({ post: result })
  })
    .catch(err => {
      console.log(err)
    })
}


// get a single file
const getSingleFile = async (req, res) => {
  try {

    // get file
    const file = await File.findById(req.params.id).select('-password');

    // if file not found
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // return response
    return res.json(file);
  } catch (err) {

    // console and return error
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};




// modify file data
const updateFile = async (req, res) => {
  const { name, fileType, isProtected, password, fileData } = req.body;

  const data = await File.findById(req.params.id);

  if (data) {
    data.name = name,
      data.fileType = fileType,
      data.isProtected = isProtected,
      data.password = password,
      data.fileData = fileData
    // data.user=req.user._id

    const updateData = await data.save();
    // console.log(name,fileType,isProtected,password, fileData,user_id)    
    res.json({ message: "File Updated.", data: data })
  } else {
    res.status(404);
    throw new Error("File not found")
  }
}


// delete file
const deleteFile = async (req, res) => {
  const data = await File.findById(req.params.id);

  if (data) {
    await data.remove();
    res.json({ message: "File Removed." })
  } else {
    res.status(404);
    throw new Error("File not found")
  }
}



module.exports = { getFile, uploadFile, getSingleFile, deleteFile, updateFile }