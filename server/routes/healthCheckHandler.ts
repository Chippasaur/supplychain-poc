import { NextApiRequest } from 'next'

import { HttpStatusCode } from '../infrastructure/httpStatusCode'
import { HealthCheckResponse } from '../../shared/response'
import { RequestHandler } from '../types'
import logger from '../logger'
import { version } from '../../package.json'

export const healthCheckHandler: RequestHandler<HealthCheckResponse, NextApiRequest> = async (req, res, next) => {
  try {
    const uptime = Number(process.uptime()).toFixed(2)
    const response = <HealthCheckResponse>{
      version: version,
      uptime: uptime,
      db_name: process.env.DB_NAME,
    }
    res.json(response)
  } catch (error) {
    logger.error('check app health error: ', error)
    res.status(HttpStatusCode.InternalServerError).end()
  }
}
