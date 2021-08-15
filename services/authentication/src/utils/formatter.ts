import { Error } from '@models/error'

const success = (payload: any): any => {
  const returnObject: any = {
    success: true,
    payload
  }
  if (!payload) {
    delete returnObject.payload
  }
  return returnObject
}

const error = (error: Error): any => ({
  success: false,
  error: {
    code: error.errorCode.toUpperCase(),
    message: error.errorMessage.toUpperCase(),
    details: error.errorDetails ? String(error.errorDetails).toUpperCase() : null
  }
})

export default { success, error }
