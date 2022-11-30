import { createMocks } from 'node-mocks-http'

import { supplierShipmentHandler, getTotalShipments, getAverageValue } from '../../routes/supplier.shipments'
import { setUpShipmentDocUseFixedSupplierId } from '../fixtures/dataPreparation'
import facilityShipmentResult from '../fixtures/supplier.facility.shipment.json'
import groupShipmentResult from '../fixtures/supplier.group.shipment.json'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'
import { ShipmentRecord } from '../../../shared/response'

const shipments: Array<ShipmentRecord> = [
  {
    hsCode: 'xxx',
    hsDescription: 'xxx',
    buyer: 'buyer1',
    buyerCompanyCode: 'buyer1',
    volume: 20,
    value: 2000,
  },
  {
    hsCode: 'xxx',
    hsDescription: 'xxx',
    buyer: 'buyer1',
    buyerCompanyCode: 'buyer1',
    volume: 30,
    value: 4000,
  },
  {
    hsCode: 'xxx',
    hsDescription: 'xxx',
    buyer: 'buyer2',
    buyerCompanyCode: 'buyer2',
    volume: 80,
    value: 8000,
  },
  {
    hsCode: 'xxx',
    hsDescription: 'xxx',
    buyer: 'buyer2',
    buyerCompanyCode: 'buyer2',
    volume: 50,
    value: 6000,
  },
  {
    hsCode: 'xxx',
    hsDescription: 'xxx',
    buyer: 'buyer3',
    buyerCompanyCode: 'buyer3',
    volume: 20,
    value: 1000,
  },
]

describe('supplier shipment api test', () => {
  it('should get no shipment data given a non-exist id', async () => {
    await setUpShipmentDocUseFixedSupplierId()
    const { req, res } = createMocks({
      method: 'GET',
      params: { supplierId: '6036190bfa6b9297fa86c00a' },
    })

    await supplierShipmentHandler(req, res, err => {
      console.log(err)
    })

    const response = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(response.totalShipments).toEqual(0)
    expect(response.averageValue).toEqual(0)
    expect(response.shipmentRecords).toHaveLength(0)
  })

  it('should get all shipment data given a facility', async () => {
    await setUpShipmentDocUseFixedSupplierId()
    const { req, res } = createMocks({
      method: 'GET',
      params: { supplierId: '6036190bfa6b9297fa86c89a' },
    })

    await supplierShipmentHandler(req, res, err => {
      console.log(err)
    })

    const response = res._getJSONData()
    expect(response.totalShipments).toEqual(4)
    expect(response.averageValue).toEqual(1500)
    expect(response.shipmentRecords).toEqual(facilityShipmentResult)
  })

  it('should get all facilities shipment data given a group', async () => {
    await setUpShipmentDocUseFixedSupplierId()
    const { req, res } = createMocks({
      method: 'GET',
      params: { supplierId: '6036190bfa6b9297fa86c891' },
    })

    await supplierShipmentHandler(req, res, err => {
      console.log(err)
    })

    const response = res._getJSONData()
    expect(response.totalShipments).toEqual(7)
    expect(response.averageValue).toEqual(2550)
    expect(response.shipmentRecords).toEqual(groupShipmentResult)
  })

  it('should get total shipments', () => {
    const totalShipments = getTotalShipments(shipments)
    expect(totalShipments).toEqual(200)
  })

  it('should get average shipments', () => {
    const averageValue = getAverageValue(shipments)
    expect(averageValue).toEqual(7000)
  })
})
