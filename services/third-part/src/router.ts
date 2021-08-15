import express, { Router } from 'express'
import email from '@routes/email'
import sms from '@routes/sms'
import whatsapp from '@routes/whatsapp'

const router: Router = express.Router()

router.use('/v1', email)
router.use('/v1', sms)
router.use('/v1', whatsapp)

export default router
