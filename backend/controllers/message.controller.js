export const sendMessage=(req,res)=>{
    try {
        const {message} = req.body
        const {id} = req.params
        
    } catch (error) {
        console.log('error in sending controller message',error.message)
        res.status(500).json({error:"internal error"})
    }
}