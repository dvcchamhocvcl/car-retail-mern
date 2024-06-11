const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        require: true
    },
    
})