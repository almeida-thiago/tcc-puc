import { createLogger, transports, format, Logger } from 'winston'
import { packageInfo, logsDirectory, isProduction } from '@utils/generals'
import { RequestInfo } from '@models/request'

const logString: any = format.printf(({ metadata, level, message }): string => {
  const timestamp: string = String(metadata.timestamp)
  const module: string = `${packageInfo.productName} (v${packageInfo.version})`
  const ip: string = metadata.ip ? ` [${metadata.ip}]` : ''
  const endpoint: string = metadata.endpoint ? ` ${metadata.endpoint}` : ''

  return `${timestamp} [${level}] ${module.toUpperCase()} - ${message.toUpperCase()}${ip}${endpoint}`
})

const logger: Logger = createLogger({
  transports: [
    new transports.Console({
      level: isProduction() ? 'info' : 'debug',
      format: format.combine(format.timestamp(), format.colorize(), format.metadata(), logString)
    }),
    new transports.File({
      level: 'info',
      maxsize: 512000,
      maxFiles: 5,
      filename: `${packageInfo.name}.log`,
      dirname: logsDirectory(),
      format: format.combine(format.timestamp(), format.metadata(), logString)
    })
  ]
})

export default (
  level: 'emerg' | 'alert' | 'crit' | 'error' | 'warning' | 'notice' | 'info' | 'debug',
  message: string,
  reqInfo: RequestInfo  | null = null
): void => {
  logger[level](message, reqInfo)
}
