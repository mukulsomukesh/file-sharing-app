const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:false
    },
    password:{
        type:String,
        required:true
    }
})

const User = mongoose.model('user',userSchema)

module.exports = {User}