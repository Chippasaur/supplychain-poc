import { createMocks } from 'node-mocks-http'

import { setUpShipmentDocUseFixedSupplierId } from '../fixtures/dataPreparation'
import groupBuyersResult from '../fixtures/supplier.group.buyers.json'
import groupBuyersFromContributorsResult from '../fixtures/supplier.group.buyersFromContributors.json'
import facilityBuyersFromContributorsResult from '../fixtures/supplier.facility.buyersFromContributors.json'
import { supplierBuyersHandler } from '../../routes'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'

describe('Supplier Buyers Handler Test', () => {
  it('should not get buyers data given a nonexistent id', async () => {
    await setUpShipmentDocUseFixedSupplierId()
    const { req, res } = createMocks({
      method: 'GET',
      params: { supplierId: '6036190bfa6b9297fa86c00a' },
      query: { source: 'shipments' },
    })

    await supplierBuyersHandler(req, res, err => {
      console.log(err)
    })

    expect(res._getStatusCode()).toBe(HttpStatusCode.InternalServerError)
  })

  it('should be able to get buyers with facility id', async () => {
    await setUpShipmentDocUseFixedSupplierId()
    const facilityId = '6036190bfa6b9297fa86c89e'
    const { req, res } = createMocks({
      method: 'GET',
      params: { supplierId: facilityId },
      query: { source: 'shipments' },
    })

    await supplierBuyersHandler(req, res, err => {
      console.log(err)
    })

    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
  })

  it('should get related facility buyers data sort by value given a group supplier id', async () => {
    await setUpShipmentDocUseFixedSupplierId()
    const { req, res } = createMocks({
      method: 'GET',
      params: { supplierId: '6036190bfa6b9297fa86c891' },
      query: { source: 'shipments' },
    })

    await supplierBuyersHandler(req, res, err => {
      console.log(err)
    })

    const response = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)

    expect(response).toContainEqual(groupBuyersResult[0])
    expect(response).toContainEqual(groupBuyersResult[1])
    expect(response).toContainEqual(groupBuyersResult[2])
  })

  it('should get related facility buyers data from contributors given a group supplier id', async () => {
    await setUpShipmentDocUseFixedSupplierId()
    const { req, res } = createMocks({
      method: 'GET',
      params: { supplierId: '6036190bfa6b9297fa86c891' },
      query: { source: 'contributors' },
    })

    await supplierBuyersHandler(req, res, err => {
      console.log(err)
    })

    const response = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(response).toEqual(groupBuyersFromContributorsResult)
  })

  it('should get related buyers data from contributors given a facility supplier id', async () => {
    await setUpShipmentDocUseFixedSupplierId()
    const { req, res } = createMocks({
      method: 'GET',
      params: { supplierId: '6036190bfa6b9297fa86c89a' },
      query: { source: 'contributors' },
    })

    await supplierBuyersHandler(req, res, err => {
      console.log(err)
    })

    const response = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(response).toEqual(facilityBuyersFromContributorsResult)
  })
})
