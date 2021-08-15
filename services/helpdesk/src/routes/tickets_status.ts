import express, { Router } from 'express'
import createTicketsStatus from '@controllers/tickets_status/create'
import readTicketsStatus from '@controllers/tickets_status/read'
import updateTicketsStatus from '@controllers/tickets_status/update'
import deleteTicketsStatus from '@controllers/tickets_status/delete'
import security from '@utils/security'

const ticketsStatusRoutes: Router = express.Router()
const ticketsStatusRouter: Router = express.Router()

ticketsStatusRoutes.post('/', security(1), createTicketsStatus)
ticketsStatusRoutes.get('/:id?', security(4), readTicketsStatus)
ticketsStatusRoutes.put('/:id', security(1), updateTicketsStatus)
ticketsStatusRoutes.delete('/:id', security(0), deleteTicketsStatus)

ticketsStatusRouter.use('/tickets/status', ticketsStatusRoutes)

export default ticketsStatusRouter
