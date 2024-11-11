import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'

export const sendMessage=async(req,res)=>{
    //in this function is doing that get the recerid through the param 
    //and get the senderid and message throuth the req.body
    try {
        const {message} = req.body
        const {id:receiverId} = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        //it because this is the first time they talk
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],

            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
            
        }

        // socket io functionality will be here 

        // await newMessage.save()
        // await conversation.save()
        await Promise.all([newMessage.save(),conversation.save()])
        res.status(201).json(newMessage)
        
    } catch (error) {
        console.log('error in sending controller message',error.message)
        res.status(500).json({error:"internal error"})
    }
}

export const getMessage = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate('messages')// not reference but meesage itself

        if(!conversation){
            return res.status(200).json([])
        }

        res.status(200).json({ messages: conversation.messages });


        
    } catch (error) {
        console.log('error in sending controller message',error.message)
        res.status(500).json({error:"internal error"})
    }
}