import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protectRoutes = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({error:'unauthorize, No token provide '})
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET_TOKEN)
        if(!decode){
            return res.status(401).json({error:'unauthorize, No token provide '})
        }

        // it is call userId because when we generate the jwt it call userId
        const user = await User.findById(decode.userId).select('-password')

        if(!user){
            return res.status(400).json({error:'user not found'})
        }

        req.user = user

        next()
    } catch (error) {
        console.log('protectRoute error: ',error.message)
        res.status(500).json({error:'internal server error'})
    }
}


export default protectRoutes