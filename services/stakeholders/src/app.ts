import express, { Express } from 'express'
import cors from 'cors'
import router from './router'
import errorHandler from '@utils/error_handler'
import healthCheck from '@utils/health_check'
import rateLimit from '@utils/rate_limit'
import documentation from '@utils/documentation'

const app: Express = express()

healthCheck(app)
documentation(app)

app.use(cors())
app.use(rateLimit(1, 100))
app.use(express.json({ limit: '50mb' }))
app.use(router)
app.use(errorHandler)

export default app
