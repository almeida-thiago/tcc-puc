import express, { Router } from 'express'
import createPeopleEmails from '@controllers/people_emails/create'
import readPeopleEmails from '@controllers/people_emails/read'
import updatePeopleEmails from '@controllers/people_emails/update'
import deletePeopleEmails from '@controllers/people_emails/delete'
import security from '@utils/security'

const peopleEmailsRoutes: Router = express.Router()
const peopleEmailsRouter: Router = express.Router()

peopleEmailsRoutes.post('/', security(9), createPeopleEmails)
peopleEmailsRoutes.get('/:id?', security(9), readPeopleEmails)
peopleEmailsRoutes.put('/:id', security(9), updatePeopleEmails)
peopleEmailsRoutes.delete('/:id', security(3), deletePeopleEmails)

peopleEmailsRouter.use('/people/emails', peopleEmailsRoutes)

export default peopleEmailsRouter
