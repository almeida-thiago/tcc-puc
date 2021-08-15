import express, { Router } from 'express'
import createDepartaments from '@controllers/departaments/create'
import readDepartaments from '@controllers/departaments/read'
import updateDepartaments from '@controllers/departaments/update'
import deleteDepartaments from '@controllers/departaments/delete'
import security from '@utils/security'

const departamentsRoutes: Router = express.Router()
const departamentsRouter: Router = express.Router()

departamentsRoutes.post('/', security(1), createDepartaments)
departamentsRoutes.get('/:id?', security(4), readDepartaments)
departamentsRoutes.put('/:id', security(1), updateDepartaments)
departamentsRoutes.delete('/:id', security(0), deleteDepartaments)

departamentsRouter.use('/departaments', departamentsRoutes)

export default departamentsRouter
