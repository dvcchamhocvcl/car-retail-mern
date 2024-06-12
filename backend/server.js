require ('dotenv').config()
const fileUpload = require('express-fileupload');
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const HomeRoute = require('./Routers/HomeRoute.js')
const ProductRoute = require('./Routers/ProductRoute.js')
const AdminRoute = require('./Routers/AdminRoute.js')
//Middlewares
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})
// app.use(fileUpload())
app.use(express.urlencoded({extends: true}))
app.use(express.json())

//Routes
app.use('/home' ,HomeRoute)
app.use('/products', ProductRoute)
app.use('/admin' ,AdminRoute)


//Database connect
try {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to mongo!')
        console.log(`listening of ${process.env.PORT}`)
        app.listen(process.env.PORT)
        
    }
)
} catch (error) {
    console.log(error)
}
