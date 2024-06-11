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
    },
    profileImage: {
        type: String
        
    },
    authorOf:[{
        type: Schema.Types.ObjectId,
        ref : 'Post'   
    }]
    
})

module.exports = mongoose.model('Admin', adminSchema)