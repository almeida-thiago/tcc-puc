import express, { Router } from 'express'
import forgotPassword from '@controllers/recovery/forgot_password'
import changePassword from '@controllers/recovery/change_password'

const retrieveRoutes: Router = express.Router()
const retrieveRouter: Router = express.Router()

retrieveRoutes.post('/forgot-password', forgotPassword)
retrieveRoutes.post('/change-password', changePassword)

retrieveRouter.use('/', retrieveRoutes)

export default retrieveRouter
