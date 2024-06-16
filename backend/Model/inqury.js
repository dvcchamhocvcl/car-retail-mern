const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        phoneNumber:{
            type: Number,
            require: true
        },
        email:{
            type: String,
            require: true
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);