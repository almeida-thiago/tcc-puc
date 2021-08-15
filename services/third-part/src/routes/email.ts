import express, { Router } from 'express'
import emailSend from '@controllers/email/send'
import emailInbox from '@controllers/email/inbox'
import emailDelete from '@controllers/email/delete'
import readSettings from '@controllers/email/read_settings'
import updateSettings from '@controllers/email/update_settings'
import getUnseen from '@controllers/email/inbox_unseen'
import security from '@utils/security'

const emailRoutes: Router = express.Router()
const emailRouter: Router = express.Router()

emailRoutes.get('/email', security(5), emailInbox)
emailRoutes.post('/email', security(5), emailSend)
emailRoutes.delete('/email/:id', security(5), emailDelete)
emailRoutes.get('/email/settings', security(5), readSettings)
emailRoutes.put('/email/settings', security(5), updateSettings)
emailRoutes.get('/email/unseen', security(5), getUnseen)

emailRouter.use('/', emailRoutes)

export default emailRouter
