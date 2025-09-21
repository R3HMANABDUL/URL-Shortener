const jwt =  require("jsonwebtoken")
const UserModel =  require("../models/UserModel")
const JWT_SECRET="your_jwt_secret_key";

const auth = async(req,res,next)=>{

    try {
        const bearrar = req.headers["authorization"]
        if(typeof bearrar !== "undefined"){
            const token = bearrar.split(" ")[1]
            const user  = jwt.verify(token,JWT_SECRET)
                if(!user) return res.status(401).json({message:"Unauthorized"})
                req.user = user
                next()
        }
            
        
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"})
    }

}

module.exports = auth;