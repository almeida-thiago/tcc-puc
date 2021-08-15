import { packageInfo } from '@utils/generals'
import app from './app'

const port: string | number = process.env.PORT || 9000
const mode: string | undefined = process.env.NODE_ENV || undefined

app.listen(port, (): void => {
  console.info(`[online|${mode}] ${packageInfo.productName} - version ${packageInfo.version} - port ${port}`.toLowerCase())
})
