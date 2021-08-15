import express, { Router } from 'express'
import whatsappStart from '@controllers/whatsapp/start'
import whatsappChats from '@controllers/whatsapp/chats'
import whatsappMessages from '@controllers/whatsapp/messages'
import whatsappSend from '@controllers/whatsapp/send'
import whatsappSendMedia from '@controllers/whatsapp/send-media'

const whatsappRoutes: Router = express.Router()
const whatsappRouter: Router = express.Router()

whatsappRoutes.get('/whatsapp/start/:id', whatsappStart)
whatsappRoutes.get('/whatsapp/chats/:id', whatsappChats)
whatsappRoutes.get('/whatsapp/messages/:id/:chatId', whatsappMessages)
whatsappRoutes.post('/whatsapp/messages/:id', whatsappSend)
whatsappRoutes.post('/whatsapp/media/:id', whatsappSendMedia)

whatsappRouter.use('/', whatsappRoutes)

export default whatsappRouter
