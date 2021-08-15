import express, { Router } from 'express'
import createPeoplePhoneNumbers from '@controllers/people_phone_numbers/create'
import readPhoneNumbers from '@controllers/people_phone_numbers/read'
import updatePhoneNumbers from '@controllers/people_phone_numbers/update'
import deletePhoneNumbers from '@controllers/people_phone_numbers/delete'
import security from '@utils/security'

const peoplePhoneNumbersRoutes: Router = express.Router()
const peoplePhoneNumbersRouter: Router = express.Router()

peoplePhoneNumbersRoutes.post('/', security(9), createPeoplePhoneNumbers)
peoplePhoneNumbersRoutes.get('/:id?', security(9), readPhoneNumbers)
peoplePhoneNumbersRoutes.put('/:id', security(9), updatePhoneNumbers)
peoplePhoneNumbersRoutes.delete('/:id', security(3), deletePhoneNumbers)

peoplePhoneNumbersRouter.use('/people/phone-numbers', peoplePhoneNumbersRoutes)

export default peoplePhoneNumbersRouter
