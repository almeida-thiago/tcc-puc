import express, { Router } from 'express'
import authentication from '@routes/authentication'
import permissions from '@routes/permissions'
import retrieve from '@routes/retrieve'
import users from '@routes/users'

const router: Router = express.Router()

router.use('/v1', authentication)
router.use('/v1', permissions)
router.use('/v1', retrieve)
router.use('/v1', users)

export default router
