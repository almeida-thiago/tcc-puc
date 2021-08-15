import express, { Router } from 'express'
import signIn from '@controllers/authentication/sign_in'
import renewAuthentication from '@controllers/authentication/renew'
import validateAuthentication from '@controllers/authentication/validate'

const authenticationRoutes: Router = express.Router()
const authenticationRouter: Router = express.Router()

authenticationRoutes.post('/sign-in', signIn)
authenticationRoutes.post('/renew', renewAuthentication)
authenticationRoutes.post('/validate', validateAuthentication)

authenticationRouter.use('/', authenticationRoutes)

export default authenticationRouter
