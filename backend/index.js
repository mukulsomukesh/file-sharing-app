const express = require('express');
require('dotenv').config()
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const authentication = require('./middlewares/authentication');
const cors = require('cors')

const app = express();
app.use(cors())

connectDB();
app.use(express.json());

app.get('/',(req,res) => {
    res.send("Welcome!")
})

app.use('/user' , userRoutes);
app.use('/api',authentication, fileRoutes);


const PORT = process.env.PORT || 8080

app.listen(PORT,() => {
    console.log("Server is running now!")
})
