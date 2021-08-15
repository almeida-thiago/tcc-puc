import express, { Router } from 'express'
import createChannels from '@controllers/channels/create'
import readChannels from '@controllers/channels/read'
import updateChannels from '@controllers/channels/update'
import deleteChannels from '@controllers/channels/delete'
import security from '@utils/security'

const channelsRoutes: Router = express.Router()
const channelsRouter: Router = express.Router()

channelsRoutes.post('/', security(1), createChannels)
channelsRoutes.get('/:id?', security(4), readChannels)
channelsRoutes.put('/:id', security(1), updateChannels)
channelsRoutes.delete('/:id', security(0), deleteChannels)

channelsRouter.use('/channels', channelsRoutes)

export default channelsRouter
