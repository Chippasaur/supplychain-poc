import { NextHandler } from 'next-connect'
import { createMocks } from 'node-mocks-http'
import mongoose from 'mongoose'

import { customerNotificationContentsHandler } from '../../routes'
import Notification from '../../models/notification'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'

describe('notification contents test', () => {
  it('should get notification contents given customer id', async () => {
    const supplierId = mongoose.Types.ObjectId().toHexString()
    const notificationDoc = await givenNotificationDoc(supplierId)
    const { req, res } = createMocks({
      method: 'GET',
      params: { id: 'fake id' },
    })
    const next: NextHandler = err => {
      console.error(err)
    }

    await customerNotificationContentsHandler(req, res, next)

    const response = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(response.length).toEqual(1)
    expect(response[0].supplierId).toEqual(notificationDoc.supplierId)
    expect(response[0].supplierName).toEqual(notificationDoc.supplierName)
    expect(new Date(response[0].postedAt)).toEqual(notificationDoc.postedAt)
  })
})

async function givenNotificationDoc(supplierId: string) {
  const notificationDoc = {
    supplierId,
    supplierName: 'COOPERATIVA TEXTIL SEUCA LTDA.',
    type: 0,
    postedAt: new Date('2021-1-23 16:00:00 UTC'),
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  }

  return await Notification.create(notificationDoc)
}
