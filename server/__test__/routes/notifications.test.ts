import { NextHandler } from 'next-connect'
import { createMocks } from 'node-mocks-http'
import mongoose from 'mongoose'

import { notificationsHandler, updateNotificationsHandler } from '../../routes'
import Notification from '../../models/notification'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'

describe('notifications api', () => {
  it('should be able to get 30 or less notifications', async () => {
    await givenNotificationDoc()

    const { req, res } = createMocks({
      method: 'GET',
      query: { router: ['notifications'] },
    })
    const next: NextHandler = err => {
      console.error(err)
    }

    await notificationsHandler(req, res, next)

    const notifications = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(notifications.length).toEqual(1)
  })

  it('should update read to true', async () => {
    const doc = await givenNotificationDoc()

    const { req, res } = createMocks({
      method: 'PUT',
      params: { id: doc._id },
      body: {
        viewerId: 'fake viewer id',
        read: true,
      },
    })
    const next: NextHandler = err => {
      console.error(err)
    }

    await updateNotificationsHandler(req, res, next)

    const notifications = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(notifications.read).toEqual(true)
  })

  async function givenNotificationDoc() {
    const notificationDoc = {
      supplierId: mongoose.Types.ObjectId().toHexString(),
      supplierName: 'COOPERATIVA TEXTIL SEUCA LTDA.',
      type: 0,
      postedAt: new Date('2021-1-23 16:00:00 UTC'),
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
    }

    return await Notification.create(notificationDoc)
  }
})
