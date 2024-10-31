import User from "../models/user.model.js"

export const getUsersForSidebar =async(req,res)=>{
    try {
        const loggedInUserId = req.user._id

        // get all user from database without ourself and hidden the password
        const filterUsers = await User.find({_id:{$ne: loggedInUserId}}).select('-password')

        res.status(200).json(filterUsers)
        
    } catch (error) {
        console.log('error in getUserForSidebar controller',error.message)
        res.status(500).json({error:'Internal server error'})
    }
}