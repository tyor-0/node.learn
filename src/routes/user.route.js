  const express = require('express');
const { registerUser, loginUser, getUser } = require('../controller/user.controller');
const { verifyToken } = require('../middleware/verify-token');
const router = express.Router();


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/get-user', verifyToken, getUser)


module.exports = router;