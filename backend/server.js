require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const session = require('express-session')
const cookieParser = require('cookie-parser');


const app = express()
const HomeRoute = require('./Routers/HomeRoute.js')
const ProductRoute = require('./Routers/ProductRoute.js')
const AdminRoute = require('./Routers/AdminRoute.js')

//Middlewares

app.use(session({
    secret: 'dvc-dep-trai',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false, 
        httpOnly: true,
    }
}))
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     credentials: true,
// };
// app.use(cors(corsOptions));
// app.use(cookieParser());
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8081'];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({extends: true}))
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    if(req.session.user){
        console.log(`user: ${req.session.user}`)
    }else{
        console.log('no user')
    }
    next()
})

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
