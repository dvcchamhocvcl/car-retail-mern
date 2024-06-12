const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const productName = req.body.name;
    console.log(`word from multer ${productName}`)
    const uploadPath = path.join(__dirname,'../Media/product_img/', productName);
    console.log(uploadPath)
    // Create the directory if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadImg = multer({ storage: storageEngine });

module.exports = {uploadImg}