import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET_TOKEN,{
        expiresIn:'15d'
    })
    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,//ms
        httponly:true, // prevent xss attack 
        sameSite:"strict",// csrf accack 
        secure:process.env.NODE_ENV!=="development"
    })
}

export default generateTokenAndSetCookie
