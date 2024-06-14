const express = require('express');
const {  deleteUserComments,adminLogin, makeAdmin,removeAdmin, getUser,getUsers, adminSignup } = require('../Controllers/AdminController');
const {createProduct,updateProduct,deleteProduct} = require('../Controllers/ProductController');
const router = express.Router();

//Multer middleware
const { uploadImg } = require('../Middlewares/multer');

router.get('/',adminLogin)
router.get('/signup', adminSignup)
//product malnipulate
router.delete('/products/:id/:comment-id', deleteUserComments)
router.post('/product',uploadImg.array('image', 10),createProduct)


// router.post('/test-upload-image',uploadImg.array('image', 10) , createProduct)

router.delete('products/:id',deleteProduct)
router.put('/products/:id',uploadImg.array('image', 10),updateProduct)

//user malnipulate
router.get('/users', getUsers)
router.get('/users/:id',getUser)


module.exports = router;
