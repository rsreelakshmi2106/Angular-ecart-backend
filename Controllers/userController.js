const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    console.log("Inside register method");
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(401).json("User Already exists")
        }
        else{
            const newuser = new users({username,email,password})
            await newuser.save()
            res.status(200).json(newuser)
        }
    }
    catch(err){
        res.status(404).json("Registration Failed : "+err)
    }
}


exports.login = async(req,res)=>{
    console.log("Inside login method");
    const { email, password } = req.body
    // console.log(email,password);
    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWTKEY)
            // console.log(token);
            res.status(200).json({ existingUser, token })
            // console.log({ existingUser, token });
            // res.status(200).json(existingUser)
        }
        else {
            res.status(404).json("Invalid email or password")
        }
    }
    catch (err) {
        res.status(500).json("Login Failed..." + err)
    }
}