require('dotenv')
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');

//Models
const Product = require('../Model/product'); 
const User = require('../Model/user'); 
const Comment = require('../Model/comment'); 

//Controllers
async function updateProduct(req, res) {
    const id = req.params.id;
    console.log(req.body)
    try {
        const {  price, brand, classification, color, engine, driveSystem, horsePowrer, fuelConsumption, public } = req.body;
        const updatedFields = {
             
            price,
            brand,
            model: {
                classification,
                color,
            },
            techSpec: {
                engine,
                driveSystem,
                horsePowrer,
                fuelConsumption,
            },
            public,
        };
        

        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: false });
            console.log('product updated')
            res.status(200).json({ product: updatedProduct });
        } catch (error) {
            console.log(error)           
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function deleteProduct(req,res){
    console.log('hello')
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        if(product){
            await Product.findByIdAndDelete(id)
            res.json({msg:'alo'})
        }else{
            res.status(404).json({error: "The product might not exist"})
        }
    } catch (error) {
        res.status(500).json({error:"Internal Sever Error"})
    }
}    
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        default:
            return 'application/octet-stream'; // Default MIME type if unknown
    }
}                  
async function getProduct(req,res){
    const id = req.params.id
    console.log(id)
    try {
        const product = await Product.findById(id)
            if (product && product.public) {
            var productWithImages
                const productFolder = path.join(__dirname, '../Media/product_img', product.name);
                let imagesBase64 = [];

                if (fs.existsSync(productFolder)) {
                    const files = fs.readdirSync(productFolder);
                    imagesBase64 = files.map(file => {
                        const imagePath = path.join(productFolder, file);
                        const imageBuffer = fs.readFileSync(imagePath);
                        return {data:imageBuffer.toString('base64'),
                                mime:getMimeType(imagePath)
                        };
                    });
                productWithImages = {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    brand: product.brand,
                    color: product.model.color,
                    engine: product.techSpec.engine,
                    driveSystem: product.techSpec.driveSystem,
                    horsePowrer: product.techSpec.horsePowrer,
                    fuelConsumption: product.techSpec.fuelConsumption,
                    comments: product.comments,
                    image: imagesBase64
                };
            };

            res.status(200).json(productWithImages);

        } else {
            res.status(404).json({ message: "There's no product to be displayed" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal sever error"})
    }
}
async function getProducts(req, res) {
    try {
        const products = await Product.find({});
        if (products) {
            const productsWithImage = await Promise.all(
                products
                .filter(product => product.public)
                .map(async (product) => {
                const productFolder = path.join(__dirname, '../Media/product_img', product.name);
                let imgdata 
                let imgmime

                if (fs.existsSync(productFolder)) {
                    const files = fs.readdirSync(productFolder);
                    if (files.length > 0) {
                        const imagePath = path.join(productFolder, files[0]); // Take only the first image
                        const imageBuffer = fs.readFileSync(imagePath);
                        imgdata = imageBuffer.toString('base64');
                        imgmime = getMimeType(imagePath); // Adjust MIME type based on your image type
                    }
                }

                return {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    imagedata: imgdata,
                    imagemime: imgmime
                };
            }));

            res.status(200).json(productsWithImage);
        } else {
            res.status(404).json({ message: "There's no product to be displayed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function createProduct (req, res) {
    try {
        const name = req.body.name
        // const image = req.files
        const price = req.body.price
        const brand = req.body.brand
        const classification = req.body.classification
        const color = req.body.color
        const engine= req.body.engine
        const driveSystem = req.body.driveSystem
        const horsePowrer = req.body.horsePowrer
        const fuelConsumption= req.body.fuelConsumption
        const public = req.body.public
    
        await new Product({
            
                name: name,
                price:price,
                brand:brand,
                model:{
                    classification:classification,
                    color:color
                },
                techSpec:{
                    engine:engine,  
                    driveSystem:driveSystem,
                    horsePowrer:horsePowrer,
                    fuelConsumption:fuelConsumption
                },
                public:public
            
        }).save() 
        res.status(200).json({status : 'ok'})
    } catch (error) {
        console.log(error)
        res.status(502).json({error:'Internal Server Error'})
    }
}
//Comments
async function postComment(req, res) {
    if(req.session.user){
        try {
            const { id } = req.params; 
            const { content, rating } = req.body;
            const userId = req.session.user.id; 

            if (!mongoose.Types.ObjectId.isValid(id)) {
                res.status(400).json({ message: 'Invalid product ID' });
                console.log('Invalid product ID')
            }

            const product = await Product.findById(id);
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                console.log('Product not found')
            }

            const comment = new Comment({
                user: userId,
                product: id,
                content,
                rating,
            });

            await comment.save();

            product.comments.push(comment._id);
            await product.save();

            res.status(201).json({ message: 'Comment added successfully', comment });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }else{
        res.status(401).json({message:'You need to login first'})
        console.log('user has not logged in')
    }
}
async function getComments(req, res) {
    try {
        const id  = req.params.id;

        const product = await Product.findById(id).populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: 'username',
            },
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).send(product.comments);
        console.log(product.comments)
        console.log('Comment sent successfully')
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { createProduct,updateProduct,deleteProduct,getProduct,getProducts
                    , getComments, postComment}