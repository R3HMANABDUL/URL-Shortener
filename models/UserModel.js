
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    Username:{
        type:"String",
        required:true,
    },
    Email:{
        type:"String",
        required:true,
        unique:true,
    },
    Password:{
        type:"String",
        required:true,
    },
    CreatedAt:{
        type:Date,
        default:Date.now()
    },
})


const User = mongoose.model("User",UserSchema)


module.exports = User;