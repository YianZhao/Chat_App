import express, { json } from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js'

const app = express()

dotenv.config()
const port = process.env.PORT || 5000

app.use(express.json()) // to parse the income request with json payload(from req.body)

app.use('/api/auth', authRoutes)

app.listen(port, () => {
    connectToMongoDB()
    console.log(`server is running on port ${port}`)
})
