const express = require('express')
const authController = require('../app/http/controllers/api/v1/authController');
const router = express.Router();

router.post('/login',authController.login)
router.post('register',authController.register)
module.exports = router;