const express = require('express');
const {  
  deleteUserComments,adminLoginHandler,viewComment,
  makeAdmin,removeAdmin, getUser,getUsers
  } = require('../Controllers/AdminController');
const { 
  createProduct,updateProduct,deleteProduct,getProduct,getProducts, uploadImage
  } = require('../Controllers/ProductController');
const { uploadImg } = require('../Middlewares/multer');
const router = express.Router();

router.get('/',adminLoginHandler)
//product malnipulate
router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.get('/products/:id/comment', viewComment)
router.delete('/products/:id/:comment-id', deleteUserComments)
router.post('/products',createProduct)


router.post('/test-upload-image',uploadImg.array('image', 10) , uploadImage)

router.delete('products/:id',deleteProduct)
router.put('/products/:id',updateProduct)

//user malnipulate
router.get('/users', getUsers)
router.get('/users/:id',getUser)
router.patch('user/make-admin/:id',makeAdmin)
router.patch('user/remove-admin/:id',removeAdmin)


module.exports = router;
