const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    try{
        const token = req.headers['authorization'].slice(7)
        console.log(token);
        const jwtVerification = jwt.verify(token,process.env.JWTKEY)
        req.payload = jwtVerification.userId
        console.log(jwtVerification);
        next()
    }
    catch(err){
        res.status(402).json("AuthorizationError : "+err)
    }
}

module.exports = jwtMiddleware