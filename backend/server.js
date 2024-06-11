require ('dotenv').config()

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
//middlewares
app.use(express.urlencoded({extends: false}))
app.use(express.json())

//Routes
app.use('/home' ,HomeRoute)
app.use('/products', ProductRoute)
app.use('/admin', AdminRoute)


//Database connect
try {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to mongo!'),
        app.listen(process.env.PORT)
        
    }
)
} catch (error) {
    console.log(error)
}
