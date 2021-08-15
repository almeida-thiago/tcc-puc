import express, { Router } from 'express'
import smsSend from '@controllers/sms/send'

const smsRoutes: Router = express.Router()
const smsRouter: Router = express.Router()

smsRoutes.post('/sms', smsSend)

smsRouter.use('/', smsRoutes)

export default smsRouter
