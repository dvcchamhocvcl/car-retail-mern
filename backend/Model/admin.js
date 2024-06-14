const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    username : {
        type: String,
        require: true,
        unique: true
    },
    passwordHash:{
        type: String,
        require: true
    }
    
})

module.exports = mongoose.model('Admin', adminSchema)