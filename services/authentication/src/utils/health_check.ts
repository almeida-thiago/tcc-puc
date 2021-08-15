import { cpu, mem, drive, os } from 'node-os-utils'
import express, { Application, Request, Response } from 'express'
import { packageInfo, logsDirectory } from '@utils/generals'
import database from '@utils/database'
import fs from 'fs'

const logFiles = (req: Request): string[] =>
  fs.readdirSync(logsDirectory())
    .map(item => `${req.protocol}://${req.get('host')}/logs/${item}`)

const serviceEnviroment = (): string => {
  switch (process.env.NODE_ENV?.toUpperCase()) {
    case 'DEVELOPMENT':
      return 'development'
    case 'PRODUCTION':
      return 'production'
    default:
      return 'stage'
  }
}

const secondsToHms = (seconds: number): string => {
  const day = Math.floor(seconds / 3600 / 24)
  const hour = Math.floor(seconds / 3600)
  const minute = Math.floor(seconds % 3600 / 60)
  const second = Math.floor(seconds % 3600 % 60)
  const dayDisplay = day > 0 ? day + (day == 1 ? ' day ' : ' days ') : ''
  const hourDisplay = hour > 0 ? hour + (hour == 1 ? ' hour ' : ' hours ') : ''
  const minuteDisplay = minute + (minute == 1 ? ' minute ' : ' minutes ')
  const secondDisplay = second + (second == 1 ? ' second' : ' seconds')
  return `${dayDisplay}${hourDisplay}${minuteDisplay}${secondDisplay}`;
}

const databaseCheck = async (): Promise<string> => {
  try {
    const query = await database.query({ query: 'SELECT VERSION() as `version`;' })
    return query[0].version
  } catch (error) {
    return error
  }
}

const machineStatus = async (): Promise<object> => {
  const memory = await mem.used()
  const disk = await drive.used()
  return {
    arch: await os.arch(),
    os: await os.oos(),
    platform: await os.platform(),
    uptime: secondsToHms(await os.uptime()),
    cpu: {
      count: await cpu.count(),
      model: await cpu.model(),
      usedPercentage: await cpu.usage(),
    },
    memory: {
      ...memory,
      usedPercentage: parseFloat(((100 * memory.usedMemMb) / memory.totalMemMb).toFixed(2))
    },
    disk: {
      totalGb: parseFloat(disk.totalGb),
      usedGb: parseFloat(disk.usedGb),
      usedPercentage: parseFloat(disk.usedPercentage)
    }
  }
}

export default (app: Application): void => {
  app.use('/logs/', express.static(logsDirectory()))
  app.get('/', async (req: Request, res: Response) => {
    res.status(200).send({
      online: true,
      enviroment: serviceEnviroment(),
      name: packageInfo.productName,
      service: packageInfo.name,
      version: packageInfo.version,
      database: await databaseCheck(),
      server: await machineStatus(),
      logs: logFiles(req)
    })
  })
}