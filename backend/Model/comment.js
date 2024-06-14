const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        require: true,
        min: 1,
        max: 5
    }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
