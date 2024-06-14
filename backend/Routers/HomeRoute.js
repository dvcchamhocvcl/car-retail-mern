const express = require('express')
const router = express.Router()
const{login,signup,inquiryFormHandler} = require('../Controllers/HomeController')
const {authenticateJWT} = require('../Middlewares/jwtUser')

router.post('/signup', signup)
router.post('/login', login)
router.post('/about',authenticateJWT, inquiryFormHandler)
module.exports = router