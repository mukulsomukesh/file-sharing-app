const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fileType:{
        type:String,
        required:true
    },
    isProtected:{
        type:Boolean
    },
    password:{
        type:String
    },
    fileData:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},{
    timestamps:true
})

const File = mongoose.model('files',fileSchema)

module.exports = {File}