const express = require('express')
const router = express.Router()
const{
    
    loginHandler,
    signupHandler,
    inquiryFormHandler
} = require('../Controllers/HomeController')


router.post('/signup', signupHandler)
router.post('/login', loginHandler)
router.post('/about', inquiryFormHandler)
module.exports = router