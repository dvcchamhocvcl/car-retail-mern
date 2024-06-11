const express = require('express')
const router =  express.Router()
const {
    getProduct,
    getProducts
} = require('../Controllers/ProductController')

router.get('/', getProducts)
router.get('/:id',getProduct)
module.exports = router