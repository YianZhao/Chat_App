import path from "path";
import express, { json } from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js'
import messageRoutes from './routes/message.routes.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.routes.js'
import {app,server} from './socket/socket.js'

//const app = express()

dotenv.config()
const port = process.env.PORT || 5000
const __dirname = path.resolve()

app.use(express.json()) // to parse the income request with json payload(from req.body)
app.use(cookieParser())// in order to get the cookie 

app.use('/api/auth', authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
    connectToMongoDB()
    console.log(`server is running on port ${port}`)
})
