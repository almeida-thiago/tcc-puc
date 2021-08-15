import express, { Router } from 'express'
import createTicketsMessages from '@controllers/tickets_messages/create'
import readTicketsMessages from '@controllers/tickets_messages/read'
import updateTicketsMessages from '@controllers/tickets_messages/update'
import deleteTicketsMessages from '@controllers/tickets_messages/delete'
import security from '@utils/security'

const ticketsMessagesRoutes: Router = express.Router()
const ticketsMessagesRouter: Router = express.Router()

ticketsMessagesRoutes.post('/', security(0), createTicketsMessages)
ticketsMessagesRoutes.get('/:id?', security(4), readTicketsMessages)
ticketsMessagesRoutes.put('/:id', security(0), updateTicketsMessages)
ticketsMessagesRoutes.delete('/:id', security(0), deleteTicketsMessages)

ticketsMessagesRouter.use('/tickets/messages', ticketsMessagesRoutes)

export default ticketsMessagesRouter
