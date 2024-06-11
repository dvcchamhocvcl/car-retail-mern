const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {   
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
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }]
        
    },{timestamps: true}
)
module.exports = mongoose.model("User", userSchema)