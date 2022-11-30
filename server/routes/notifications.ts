import { NextApiRequest, NextApiResponse } from 'next'

import { NotificationResponse } from '../../shared/response'
import { CustomizedNextApiRequest, RequestHandler } from '../types'
import Notification from '../models/notification'
import logger from '../logger'

export const updateNotificationsHandler: RequestHandler<NotificationResponse, CustomizedNextApiRequest> = async (
  req,
  res,
  next,
) => {
  try {
    const id = req.params.id
    const { viewerId, ...updates } = req.body
    const options = { new: true, useFindAndModify: false }

    const notificationDoc = await Notification.findByIdAndUpdate(id, updates, options)

    const updatedDoc = <NotificationResponse>{
      id: notificationDoc._id,
      supplierId: notificationDoc.supplierId,
      supplierName: notificationDoc.supplierName,
      type: notificationDoc.type,
      postedAt: notificationDoc.postedAt,
      lastUpdatedAt: notificationDoc.lastUpdatedAt,
      read: notificationDoc.read,
    }
    res.json(updatedDoc)
  } catch (error) {
    logger.error('Handle update notification request error: ', error)
    res.status(500).end()
  }
}

export const notificationsHandler: RequestHandler<Array<NotificationResponse>, NextApiRequest> = async (
  req,
  res,
  next,
) => {
  try {
    const notificationDocs = await Notification.find({}).sort({ postedAt: -1 }).limit(30)

    const notifications: Array<NotificationResponse> = notificationDocs.map(notificationDoc => {
      return <NotificationResponse>{
        id: notificationDoc._id,
        supplierId: notificationDoc.supplierId,
        supplierName: notificationDoc.supplierName,
        type: notificationDoc.type,
        postedAt: notificationDoc.postedAt,
        lastUpdatedAt: notificationDoc.lastUpdatedAt,
        read: notificationDoc.read,
      }
    })
    res.json(notifications)
  } catch (error) {
    logger.error('Handle notification request error: ', error)
    res.json([])
  }
}
