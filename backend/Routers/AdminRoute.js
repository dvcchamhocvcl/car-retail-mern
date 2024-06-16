const express = require('express');
const {  deleteComment,adminLogin, getallComments, adminSignup } = require('../Controllers/AdminController');
const {createProduct,updateProduct,deleteProduct} = require('../Controllers/ProductController');
const router = express.Router();

//Multer middleware
const { uploadImg } = require('../Middlewares/multer');

router.post('/',adminLogin)
router.post('/signup', adminSignup)
//product malnipulate
router.post('/product',uploadImg.array('image', 10),createProduct)

router.get('/comment', getallComments)
// router.post('/test-upload-image',uploadImg.array('image', 10) , createProduct)

router.put('/products/:id',updateProduct)

//user malnipulate
router.delete('/:comment-id', deleteComment)


module.exports = router;
