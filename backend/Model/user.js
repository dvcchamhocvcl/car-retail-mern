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
        realname:{
            firstname:{
                type: String,
                require: true
            },
            lastname:{
                type: String,
                require: true
            }
        },
        email:{
            type:String,
            require: true
        },
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }],
        
    },{timestamps: true}
)
module.exports = mongoose.model("User", userSchema)