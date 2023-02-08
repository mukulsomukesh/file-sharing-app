const {File} = require('../models/fileModel')


const getFile = (req,res) => {
    File.find().then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
    
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

module.exports = {getFile , uploadFile, getSingleFile}