const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statistic = new Schema({
    count: {
        type: Number,
        default: 0
    }  
})

module.exports = mongoose.model('Statistic', statistic)