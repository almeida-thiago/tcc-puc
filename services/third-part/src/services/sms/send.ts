import axios, { AxiosResponse } from 'axios'
import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Sms } from '@models/sms'
import { Errors } from '@enums/errors'

/**
 * Send sms
 * @param {Sms} data user data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: Sms, reqInfo: RequestInfo): Promise<object> => {
  try {
    const requestData: object = {
      key: process.env.SMS_KEY_TOKEN,
      type: 9,
      number: data.to,
      msg: data.message
    }
    const response: AxiosResponse = await axios.post('https://api.smsdev.com.br/v1/send', requestData)
    if(response.data.situacao === 'ERRO'){
      throw new Error(response.data.descricao)
    }
    logger('info', `SMS sent to: ${data.to}`, reqInfo)
    return {
      id: response.data.id,
      message: response.data.descricao
    }
  } catch (error) {
    logger('error', `Error on send SMS (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ESS1',
      errorMessage: Errors.ESS1,
      errorDetails: error || error.message
    }
  }
}
