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
            enum: ['Sendan', 'Hatchback', 'SUV', 'Crossover', 'Van',
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
            type: Number
        }
    },
    viewmode:{
        type: Boolean,
        require: true
    },
    comment:{
        
    }
},{timeseries: true})

module.exports = mongoose.model("Product", productSchema)