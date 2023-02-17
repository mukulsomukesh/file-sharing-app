const {User} = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const registerUser = async(req,res) => {

    const {name,email,password} = req.body;

    const isUser = await User.findOne({email:email})
    if(isUser)
    {
        res.send({"msg":"User already exists!"})
    }
    else 
    {
        bcrypt.hash(password,4,async function(err,hash) {
            if(err){
                res.send("Something went wrong, please try again!")
            }
            const new_user = new User({
                name,
                email,
                password:hash
            })
            try {
                await new_user.save()
                res.status(200).send({"msg":"Signup Successfully!"})
            } catch (error) {
                res.status(404).send({"msg":"Something went wrong, please try again!"})
            }
        })
    }
}

const loginUser = async(req,res) => {
    const {email,password} = req.body;
    
    if(!email || !password){
        res.status(422).json({error:"Please Provide email and password"})
    }
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or Password!"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch => {
            if(doMatch){
                // res.json({message:"Successfully Signed In!"})
                const token = jwt.sign({_id:savedUser._id},"sahilkr26244")
                const {_id,name,email} = savedUser
                res.json({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or Password!"})
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
   
}

module.exports = { registerUser , loginUser }