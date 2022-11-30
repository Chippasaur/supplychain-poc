import { NextHandler } from 'next-connect'
import { createMocks } from 'node-mocks-http'
import mongoose from 'mongoose'

import { customerCreditRiskHandler } from '../../routes'
import { DAndBLevel } from '../../../shared/enum/dAndBLevel'
import { setUpCustomerDocGivenCustomerId, setUpSupplierDocUseFixSupplierId } from '../fixtures/dataPreparation'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'

describe('Customer Credit Risk Handler API', () => {
  it('should return facility risk counts', async () => {
    const customerId = mongoose.Types.ObjectId().toHexString()
    await setUpCustomerDocGivenCustomerId(customerId)
    await setUpSupplierDocUseFixSupplierId()

    const { req, res } = createMocks({
      method: 'GET',
      params: { id: customerId },
    })
    const next: NextHandler = err => {
      console.error(err)
    }

    await customerCreditRiskHandler(req, res, next)

    const creditRisks = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(creditRisks.length).toEqual(3)
    expect(creditRisks[0]).toEqual({ level: DAndBLevel.Low, count: 1 })
    expect(creditRisks[1]).toEqual({ level: DAndBLevel.Moderate, count: 1 })
    expect(creditRisks[2]).toEqual({ level: DAndBLevel.High, count: 1 })
  })
})
