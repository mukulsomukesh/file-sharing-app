const express = require('express');

const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controllers/userController');


const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(loginUser)
router.route('/forgot-password').post(forgotPassword)
router.route('/update-password').post(resetPassword)

module.exports = router