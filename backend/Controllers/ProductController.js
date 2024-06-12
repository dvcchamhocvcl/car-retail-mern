require('dotenv')
const mongoose = require('mongoose')
const productModel = require('../Model/product')

async function getProduct(req,res){
    const id = req.params.id
    try {
        const document = await productModel.findById(id)
        if (document) {
            res.status(200).json(document)
        } else {
            res.status(404).json({error: "Can find that product"})
        }
    } catch (error) {
        res.status(500).json({error: "Internal sever error"})
    }
}

async function getProducts(req,res){
   try {
        const documents = await MyModel.find({});
        if(documents){

        }else{
            res.status(404).json({error: "There's no product to be displayed"})
        }
   } catch (error) {
        res.status(500).json({error: "Internal sever error"}) 
   }
}
function uploadImage (req,res){
    const productName = req.body.name;
    if (req.files) {
        console.log('Gotcha!')
        console.log(productName)
        console.log(req.files)
        res.send('noice!')
    } else {
      res.send('No images were uploaded.');
      console.log(productName)
    }
}
async function createProduct (req, res) {
    try {
        const name = req.body.name
        const image = req.files.images
        const price = req.body.price
        const brand = req.body.brand
        const classification = req.body.classification
        const color = req.body.color
        const engine= req.body.engine
        const driveSystem = req.body.driveSystem
        const horsePowrer = req.body.horsePowrer
        const fuelConsumption= req.body.fuelConsumption
        const viewmode = req.body.viewmode
    
        await new productModel({
            
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
                viewmode:viewmode
            
        }).save()
    } catch (error) {
        console.log(error)
    }
}
async function updateProduct(req,res){
    const id = req.params.id
    const name = req.body.name
    const image = req.body.image
    const price = req.body.price
    const brand = req.body.brand
    const classification = req.body.classification
    const color = req.body.color
    const engine= req.body.engine
    const driveSystem = req.body.driveSystem
    const horsePowrer = req.body.horsePowrer
    const fuelConsumption= req.body.fuelConsumption
    const viewmode = req.body.viewmode
    
}
async function deleteProduct(req,res){
    try {
        const document = productModel.findById(req.body.id)
        if(document){
            await productModel.deleteOne({_id: req.body.id})
        }else{
            res.status(404).json({error: "The product might not exist"})
        }
    } catch (error) {
        res.status(500).json({error:"Internal Sever Error"})
    }
}

module.exports = { createProduct,updateProduct,deleteProduct,getProduct,getProducts, uploadImage}