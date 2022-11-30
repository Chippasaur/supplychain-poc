import { createMocks } from 'node-mocks-http'

import { supplierMockShipmentHandler } from '../../routes/supplier.mockShipments'
import { setUpMockShipmentDocUseFixedSupplierId } from '../fixtures/dataPreparation'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'

describe('supplier mockShipment api test', () => {
  it('should get no shipment data given a non-exist id', async () => {
    await setUpMockShipmentDocUseFixedSupplierId()
    const { req, res } = createMocks({
      method: 'GET',
      params: { supplierId: '6036190bfa6b9297fa86c00a' },
    })

    await supplierMockShipmentHandler(req, res, err => {
      console.log(err)
    })

    const response = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(response).toHaveLength(0)
  })

  it('should get all shipment data given a facility', async () => {
    await setUpMockShipmentDocUseFixedSupplierId()
    const { req, res } = createMocks({
      method: 'GET',
      params: { supplierId: '6036190bfa6b9297fa86c89a' },
    })

    await supplierMockShipmentHandler(req, res, err => {
      console.log(err)
    })

    const response = res._getJSONData()
    expect(response).toHaveLength(2)
    expect(response[0].volume).toEqual(20)
    expect(response[1].volume).toEqual(30)
  })

  it('should get all facilities shipment data given a group', async () => {
    await setUpMockShipmentDocUseFixedSupplierId()
    const { req, res } = createMocks({
      method: 'GET',
      params: { supplierId: '6036190bfa6b9297fa86c891' },
    })

    await supplierMockShipmentHandler(req, res, err => {
      console.log(err)
    })

    const response = res._getJSONData()
    expect(response).toHaveLength(2)
    expect(response[0].volume).toEqual(60)
    expect(response[1].volume).toEqual(80)
  })
})
