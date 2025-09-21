const User = require("../models/UserModel")
const bycrypt =  require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const JWT_SECRET="your_jwt_secret_key";

router.post("/regester",async(req,res)=>{
    try {
        const {Username,Email,Password} = req.body;
        const UserExist = await User.findOne({$or:[{Username,Email}]})
        if(UserExist) return res.status(400).json({Massege:"User Already Exist"})
            
            const hashPassword = await bycrypt.hash(Password,10)
            const NewUswr = new User({Username,Email,Password:hashPassword})
            const SaveUser = await NewUswr.save()
            res.json(SaveUser)

    } catch (error) {
                console.error('Error registering user:', error)
        res.status(500).json({ message: 'Internal server error' })
    }

})
router.post("/login",async(req,res)=>{
    try {
        const {Username,Password} = req.body;
        const ExistUser  = await User.findOne({Username});
        if(!ExistUser) return res.status(400).json({Massege:"User Not Register"})
            const IsMatch = await bycrypt.compare(Password,ExistUser.Password)
        if(!IsMatch) return res.status(400).json({message:"Invalid credentials"})
            const token = await jwt.sign({id:ExistUser._id,Username:ExistUser.Username},
            JWT_SECRET,
            {expiresIn:"1h"}
        )
        res.json({token})

    } catch (error) {
         console.error('Error logging in user:', error)
         res.status(500).json({ message: 'Internal server error' })
        
    }
})


router.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' })
})


module.exports = router