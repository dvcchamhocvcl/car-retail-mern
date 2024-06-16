const express = require('express')
const router =  express.Router()
const {getProduct, getProducts, getComments, postComment} = require('../Controllers/ProductController')

router.get('/', getProducts)
router.get('/:id', getProduct)
router.get('/:id/comment', getComments)
router.post('/:id' ,postComment)

module.exports = router