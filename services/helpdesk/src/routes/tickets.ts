import express, { Router } from 'express'
import infoTickets from '@controllers/tickets/info'
import createTickets from '@controllers/tickets/create'
import readTickets from '@controllers/tickets/read'
import updateTickets from '@controllers/tickets/update'
import deleteTickets from '@controllers/tickets/delete'
import security from '@utils/security'

const ticketsRoutes: Router = express.Router()
const ticketsRouter: Router = express.Router()

ticketsRoutes.get('/info', security(9), infoTickets)
ticketsRoutes.post('/', security(9), createTickets)
ticketsRoutes.get('/:id?', security(4), readTickets)
ticketsRoutes.put('/:id', security(3), updateTickets)
ticketsRoutes.delete('/:id', security(0), deleteTickets)

ticketsRouter.use('/tickets', ticketsRoutes)

export default ticketsRouter
