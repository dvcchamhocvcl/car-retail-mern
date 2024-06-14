const express = require('express')
const router =  express.Router()
const {getProduct, getProducts, getComments, postComment} = require('../Controllers/ProductController')

//Middlewares
const {authenticateJWT} = require('../Middlewares/jwtUser');

router.get('/', getProducts)
router.get('/:id', getProduct)
router.get('/:id/comment', getComments)
router.post('/:id', authenticateJWT ,postComment)

module.exports = router