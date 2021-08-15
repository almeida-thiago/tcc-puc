import express, { Router } from 'express'
import createTicketsTypes from '@controllers/tickets_types/create'
import readTicketsTypes from '@controllers/tickets_types/read'
import updateTicketsTypes from '@controllers/tickets_types/update'
import deleteTicketsTypes from '@controllers/tickets_types/delete'
import security from '@utils/security'

const ticketsTypesRoutes: Router = express.Router()
const ticketsTypesRouter: Router = express.Router()

ticketsTypesRoutes.post('/', security(1), createTicketsTypes)
ticketsTypesRoutes.get('/:id?', security(4), readTicketsTypes)
ticketsTypesRoutes.put('/:id', security(1), updateTicketsTypes)
ticketsTypesRoutes.delete('/:id', security(0), deleteTicketsTypes)

ticketsTypesRouter.use('/tickets/types', ticketsTypesRoutes)

export default ticketsTypesRouter
