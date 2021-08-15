import express, { Router } from 'express'
import infoPeople from '@controllers/people/info'
import createPeople from '@controllers/people/create'
import readPeople from '@controllers/people/read'
import updatePeople from '@controllers/people/update'
import deletePeople from '@controllers/people/delete'
import security from '@utils/security'

const peopleRoutes: Router = express.Router()
const peopleRouter: Router = express.Router()

peopleRoutes.get('/info', security(9), infoPeople)
peopleRoutes.post('/', security(9), createPeople)
peopleRoutes.get('/:id?', security(9), readPeople)
peopleRoutes.put('/:id', security(9), updatePeople)
peopleRoutes.delete('/:id', security(3), deletePeople)

peopleRouter.use('/people', peopleRoutes)

export default peopleRouter
