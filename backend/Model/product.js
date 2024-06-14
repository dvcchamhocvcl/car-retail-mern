const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type : String,
        require: true,
        unique: true
    },
    price:{
        type: Number,
        require: true
    },
    brand:{
        type: String,
        enum: ['Mercedes','Toyota','Porches','Huyndai','Mazda','BMW','Honda','MG','Mini'],
        require: true
    },
    model:{
        classification:{
            type: String,
            enum: ['Sedan', 'Hatchback', 'SUV', 'Crossover', 'Van',
                   'Pickup', 'Sport', 'Coupe', 'Sport', 'Convertible'],
            require: true
        },
        color:{
            type: String,
            enum: ['White', 'Black', 'Red'],
            require: true
        }
    },
    techSpec:{
        engine:{
            type: String,
            enum: ['Diesel', 'Petrol', 'EV', 'Hybrid']
        },
        driveSystem:{
            type: String,
            enum: ['FWD', 'RWD', 'AWD']
        },
        horsePowrer:{
            type: Number
        },
        fuelConsumption:{
            type: String //litter per 100km
        }
    },
    public:{
        type: Boolean,
        require: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{timeseries: true})

module.exports = mongoose.model("Product", productSchema)