import swagger from 'swagger-ui-express'
import { Application } from 'express'
import {resolve} from 'path'
import fs from 'fs'
import { isProduction } from '@utils/generals'

export default (app: Application): void => {
  if (!isProduction()) {
    const docFile: string = fs.readFileSync(resolve(__dirname, '../../doc_openapi.json')).toString()
    app.use('/docs', swagger.serve, swagger.setup(JSON.parse(docFile)))
  }
}