import { createMocks } from 'node-mocks-http'
import mongoose from 'mongoose'

import { customerFinancialRiskHandler } from '../../routes'
import { TrafficLightLevel } from '../../../shared/enum/trafficLightLevel'
import { setUpCustomerDocGivenCustomerId, setUpSupplierDocUseFixSupplierId } from '../fixtures/dataPreparation'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'

describe('customer financial risk route handler', () => {
  it('should get financial risk counts given customer id', async () => {
    const customerId = mongoose.Types.ObjectId().toHexString()
    await setUpCustomerDocGivenCustomerId(customerId)
    await setUpSupplierDocUseFixSupplierId()

    const { req, res } = createMocks({
      method: 'GET',
      params: { id: customerId },
    })

    await customerFinancialRiskHandler(req, res, err => {
      console.error(err)
    })

    const financialRiskCountsResponse = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(financialRiskCountsResponse[0]).toEqual({ level: TrafficLightLevel.Safe, count: 1 })
    expect(financialRiskCountsResponse[1]).toEqual({ level: TrafficLightLevel.AverageRisk, count: 1 })
    expect(financialRiskCountsResponse[2]).toEqual({ level: TrafficLightLevel.ElevatedRisk, count: 2 })
  })
})
