import express, { Router } from 'express'
import people from '@routes/people'
import peopleEmails from '@routes/people_emails'
import peoplePhoneNumbers from '@routes/people_phone_numbers'

const router: Router = express.Router()

router.use('/v1', peoplePhoneNumbers)
router.use('/v1', peopleEmails)
router.use('/v1', people)

export default router
