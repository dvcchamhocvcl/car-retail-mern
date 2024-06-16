const express = require('express')
const router = express.Router()
const{login,signup,logout,inquiryFormHandler} = require('../Controllers/HomeController')

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.post('/about', inquiryFormHandler)
module.exports = router