import axios from "axios"
import { RequestInfo } from '@models/request'

interface EmailSendProps {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async ({ authorization }: RequestInfo, emailData: EmailSendProps): Promise<void> => {
  try {
    await axios.post(`${process.env.THIRD_SERVICE_URL}/v1/email`, emailData, { headers: { authorization: `Bearer ${authorization}` } })
  } catch (error) {
    throw new Error(error)
  }
}
