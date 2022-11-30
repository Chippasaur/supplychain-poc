import { NextApiRequest } from 'next'

import { AlertResponse } from '../../shared/response'
import { RequestHandler } from '../types'
import Alert from '../models/alert'
import logger from '../logger'
import { HttpStatusCode } from '../infrastructure/httpStatusCode'

export const alertsHandler: RequestHandler<Array<AlertResponse>, NextApiRequest> = async (req, res, next) => {
  try {
    const alertsDocs = await Alert.find().sort({ postedAt: -1 }).limit(30)

    const alerts = alertsDocs.map(alertsDoc => {
      return {
        id: alertsDoc._id,
        content: alertsDoc.content,
        source: alertsDoc.source,
        supplierName: alertsDoc.supplierName,
        postedAt: alertsDoc.postedAt,
        level: alertsDoc.level,
        supplierId: alertsDoc.supplierId,
        type: alertsDoc.type,
      }
    })
    res.json(alerts)
  } catch (error) {
    logger.error('Handle query alerts request error: ', error)
    res.status(HttpStatusCode.InternalServerError).end()
  }
}
