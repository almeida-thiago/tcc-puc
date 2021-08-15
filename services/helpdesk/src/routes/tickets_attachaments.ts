import express, { Router } from 'express'
import createTicketsAttachaments from '@controllers/tickets_attachaments/create'
import readTicketsAttachaments from '@controllers/tickets_attachaments/read'
import updateTicketsAttachaments from '@controllers/tickets_attachaments/update'
import deleteTicketsAttachaments from '@controllers/tickets_attachaments/delete'
import security from '@utils/security'

const ticketsAttachamentsRoutes: Router = express.Router()
const ticketsAttachamentsRouter: Router = express.Router()

ticketsAttachamentsRoutes.post('/', security(9), createTicketsAttachaments)
ticketsAttachamentsRoutes.get('/:id?', security(9), readTicketsAttachaments)
ticketsAttachamentsRoutes.put('/:id', security(1), updateTicketsAttachaments)
ticketsAttachamentsRoutes.delete('/:id', security(1), deleteTicketsAttachaments)

ticketsAttachamentsRouter.use('/tickets/attachaments', ticketsAttachamentsRoutes)

export default ticketsAttachamentsRouter
