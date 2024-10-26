import express from 'express'
import { sendMessage,getMessage } from '../controllers/message.controller.js'
import protectRoutes from '../middelware/protectRoute.js'

const router = express.Router()

router.post('/send/:id',protectRoutes,sendMessage)
router.get('/:id',protectRoutes,getMessage)





export default router