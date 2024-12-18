import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async(req,res)=>{
    try {
        const {fullName,username,password,confirmPassword,gender} = req.body
        if(password !== confirmPassword){
            return res.status(400).json({error:"password do not match"})
        }

        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({error:"user already exist"})
        }

        // Hash password here
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // picture 
        // https://avatar-placeholder.iran.liara.run/#document
        const boyprofilepicture = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlprofilepicture = `https://avatar.iran.liara.run/public/girl?username=${username}`

        // when the name and assign name is the same we can use this format
        const newUser = new User({
            fullName,
            username,
            password : hashedPassword,
            gender,
            profilePic: gender === 'male'?boyprofilepicture:girlprofilepicture

        })
        if(newUser){
            //generate a token
            generateToken(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic,
            })
        }
        else{
            res.status(400).json({error:'error:Invalid user data'})
        }

        
    } catch (error) {
        console.log('error in signup controller',error.message)
        res.status(400).json({error:'Internal server error'})
    }
};

export const login = async (req,res)=>{
    try {
        const {username,password} = req.body
        const user = await User.findOne({username})
        const isPassWordCorrect = await bcrypt.compare(password,user?.password||"")
        if(!user || !isPassWordCorrect){
            return res.status(400).json({error:'user not exit or password incorrect'})
        }
        generateTokenAndSetCookie(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic,

        })

        
    } catch (error) {
        console.log('error in login controller',error.message)
        res.status(400).json({error:'Internal server error'})
    }
};

export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:'loggout suceffuly'})
    } catch (error) {
        console.log('error in logout controller',error.message)
        res.status(400).json({error:'Internal server error'})
    }
};