import { CustomizedNextApiRequest, RequestHandler } from '../types'
import { NotificationResponse } from '../../shared/response'
import Notification from '../models/notification'
import { HttpStatusCode } from '../infrastructure/httpStatusCode'
import logger from '../logger'
import { NotificationType } from '../../shared/enum/notificationType'

interface Notification {
  _id: string
  supplierId: string
  supplierName: string
  type: NotificationType
  postedAt: Date
  lastUpdatedAt: Date
  read: boolean
}

export const customerNotificationContentsHandler: RequestHandler<
  Array<NotificationResponse>,
  CustomizedNextApiRequest
> = async (req, res, next) => {
  try {
    const notificationDocs: Notification[] = await Notification.find({}).sort({ postedAt: -1 }).limit(30)
    const notifications = notificationDocs.map(notification => ({
      id: notification._id,
      supplierId: notification.supplierId,
      supplierName: notification.supplierName,
      type: notification.type,
      postedAt: notification.postedAt,
      lastUpdatedAt: notification.lastUpdatedAt,
      read: notification.read,
    }))
    res.json(notifications)
  } catch (error) {
    logger.error('Handle get customer notification contents error: ', error)
    res.status(HttpStatusCode.InternalServerError).end()
  }
}
