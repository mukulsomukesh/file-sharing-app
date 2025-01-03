const {User} = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');




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


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Find user by email (case-insensitive)
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Store OTP in the user's document
        user.otp = otp;
        await user.save();

        console.log(`Generated OTP for user ${user.email}: ${otp}`);

        // Configure Nodemailer with Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_SMTP_EMAIL,   // Replace with your email
                pass: process.env.GOOGLE_SMTP_PASSWORD // Replace with your app password
            }
        });

        // Email options
        const mailOptions = {
            from: process.env.GOOGLE_SMTP_EMAIL, // Replace with your email
            to: email,
            subject: 'Your OTP for Password Reset | File Sharing App',
           text: 'You requested a password reset. Click the link below to reset your password:\n\n' +
                  `${process.env.FRONTEND_URL}/reset-password?token=${otp}` // Adjust the URL
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent to your email successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
};
module.exports = { registerUser , loginUser, forgotPassword }