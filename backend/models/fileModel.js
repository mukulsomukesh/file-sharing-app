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
    photo:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const File = mongoose.model('files',fileSchema)

module.exports = {File}