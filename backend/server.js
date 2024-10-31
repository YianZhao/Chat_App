import express, { json } from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js'
import messageRoutes from './routes/message.routes.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.routes.js'

const app = express()

dotenv.config()
const port = process.env.PORT || 5000

app.use(express.json()) // to parse the income request with json payload(from req.body)
app.use(cookieParser())// in order to get the cookie 

app.use('/api/auth', authRoutes)
app.use('/api/message',messageRoutes)
app.use('/api/users',userRoutes)

app.listen(port, () => {
    connectToMongoDB()
    console.log(`server is running on port ${port}`)
})
