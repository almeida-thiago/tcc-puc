import express, { Router } from 'express'
import departaments from '@routes/departaments'
import channels from '@routes/channels'
import ticketsAttachaments from '@routes/tickets_attachaments'
import ticketsMessages from '@routes/tickets_messages'
import ticketsStatus from '@routes/tickets_status'
import ticketsTypes from '@routes/tickets_types'
import tickets from '@routes/tickets'

const router: Router = express.Router()

router.use('/v1', channels)
router.use('/v1', departaments)
router.use('/v1', ticketsAttachaments)
router.use('/v1', ticketsMessages)
router.use('/v1', ticketsStatus)
router.use('/v1', ticketsTypes)
router.use('/v1', tickets)

export default router
