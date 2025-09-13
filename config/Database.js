const { mod } = require("@tensorflow/tfjs");
const mongoose = require("mongoose");


const DbConnection =async ()=>{
    return  await mongoose.connect("mongodb://localhost:27017/UrlShortner").
    then(()=>{
        console.log("Database connected");
    }).catch((err)=>{
        console.log(err);
    })
}


module.exports = DbConnection;