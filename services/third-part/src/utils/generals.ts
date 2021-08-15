import { Request } from 'express'
import { resolve } from 'path'
import fs from 'fs'
import { RequestInfo } from '@models/request'

export const packageInfo = JSON.parse(fs.readFileSync(resolve(__dirname, '../../', 'package.json'), 'utf8'))

/**
 * Verify if it's in production mode.
 */
 export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV?.toUpperCase() === 'DEVELOPMENT' ? true : false
}

/**
 * Verify if it's in production mode.
 */
export const isProduction = (): boolean => {
  return process.env.NODE_ENV?.toUpperCase() === 'PRODUCTION' ? true : false
}

/**
 * Verify if it's in stage mode.
 */
 export const isStage = (): boolean => {
  return process.env.NODE_ENV?.toUpperCase() === 'STAGE' ? true : false
}

/**
 * Converts first alphabetic character in a string to uppercase.
 * @param {string} string string
 */
export const toUpperCaseFirstChar = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Get informations from request
 * @param {Request} req request
 */
export const getReqInfo = (req: Request): RequestInfo => {
  const authorization: string | undefined = req ? req.headers.authorization : undefined
  const endpoint: string | undefined = req ? `(${req.method}) ${req.protocol}://${req.get('host')}${req.url}` : undefined
  const ip: any = req ? req.headers['x-forwarded-for'] || req.connection.remoteAddress : undefined
  return { authorization, endpoint, ip }
}

/**
 * Get logs directory
 */
export const logsDirectory = (): string => {
  return isProduction() ? resolve(__dirname, '../logs') : resolve(__dirname, '../../logs')
}

/**
 * Get token secret
 */
export const getTokenSecret = (): string | null => process.env.SECRET || null
