import { NextHandler } from 'next-connect'
import { createMocks } from 'node-mocks-http'
import mongoose from 'mongoose'

import { alertsHandler } from '../../routes'
import Alert from '../../models/alert'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'

describe('alerts api', () => {
  it('should be able to get all alerts', async () => {
    const alertDoc = await getAlertDoc()

    const { req, res } = createMocks({
      method: 'GET',
    })
    const next: NextHandler = err => {
      console.error(err)
    }

    await alertsHandler(req, res, next)

    const alerts = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(alerts.length).toEqual(1)
    expect(alertDoc._id.toHexString()).toEqual(alerts[0].id)
    expect(alertDoc.supplierName).toEqual(alerts[0].supplierName)
    expect(alertDoc.content).toEqual(alerts[0].content)
    expect(alertDoc.source).toEqual(alerts[0].source)
    expect(alertDoc.level).toEqual(alerts[0].level)
  })

  async function getAlertDoc() {
    const alertDoc = {
      supplierId: mongoose.Types.ObjectId().toHexString(),
      supplierName: 'Intel',
      content: 'chip',
      source: 'Bloomberg',
      postedAt: Date.now(),
      level: 'Low',
      type: 0,
    }
    return await Alert.create(alertDoc)
  }
})
