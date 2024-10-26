import express from 'express'
import { sendMessage } from '../controllers/message.controller.js'
import protectRoutes from '../middelware/protectRoute.js'

const router = express.Router()

router.post('/send/:id',protectRoutes,sendMessage)





export default router