import express, { Router } from 'express'
import signUpUsers from '@controllers/users/sign_up'
import createUsers from '@controllers/users/create'
import readUsers from '@controllers/users/read'
import updateUsers from '@controllers/users/update'
import deleteUsers from '@controllers/users/delete'
import security from '@utils/security'

const usersRoutes: Router = express.Router()
const usersRouter: Router = express.Router()

usersRoutes.post('/sign-up', signUpUsers)
usersRoutes.post('/', security(0), createUsers)
usersRoutes.get('/:id?', security(0), readUsers)
usersRoutes.put('/:id', security(0), updateUsers)
usersRoutes.delete('/:id', security(0), deleteUsers)

usersRouter.use('/users', usersRoutes)

export default usersRouter
