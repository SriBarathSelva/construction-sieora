const express = require('express');
const router = express.Router();
const {registerUser,loginUser,userData,updateUser,verifyMail} = require('../controller/authController');
const authMiddleware = require('../config/authMidddleware');

// Define the POST route for user registration
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/userdata',authMiddleware,userData)
router.post('/update', updateUser);
router.post('/verify-mail',verifyMail);
module.exports = router;
