import express, { Router } from 'express'
import createPermissions from '@controllers/permissions/create'
import readPermissions from '@controllers/permissions/read'
import updatePermissions from '@controllers/permissions/update'
import deletePermissions from '@controllers/permissions/delete'
import security from '@utils/security'

const permissionsRoutes: Router = express.Router()
const permissionsRouter: Router = express.Router()

permissionsRoutes.post('/', security(0), createPermissions)
permissionsRoutes.get('/:id?', security(0), readPermissions)
permissionsRoutes.put('/:id', security(0), updatePermissions)
permissionsRoutes.delete('/:id', security(0), deletePermissions)

permissionsRouter.use('/users/permissions', permissionsRoutes)

export default permissionsRouter
