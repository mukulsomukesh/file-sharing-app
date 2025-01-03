const express = require('express');

const { registerUser, loginUser, forgotPassword } = require('../controllers/userController');


const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(loginUser)
router.route('/forgot-password').post(forgotPassword)

module.exports = router