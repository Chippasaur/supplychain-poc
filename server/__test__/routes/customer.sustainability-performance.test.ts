import { NextHandler } from 'next-connect'
import { createMocks } from 'node-mocks-http'
import mongoose from 'mongoose'

import { customerSustainabilityPerformanceHandler } from '../../routes'
import sustainabilityResult from '../fixtures/customer.sustainability.json'
import groupSustainabilityResult from '../fixtures/customer.group.sustainability.json'
import facilitySustainabilityResult from '../fixtures/customer.facility.sustainability.json'
import { setUpCustomerDocGivenCustomerId, setUpSupplierDocUseFixSupplierId } from '../fixtures/dataPreparation'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'

describe('sustainability performance handler api test', () => {
  it('should get empty sustainability performance', async () => {
    const customerId = mongoose.Types.ObjectId().toHexString()
    await setUpCustomerDocGivenCustomerId(customerId)

    const { req, res } = createMocks({
      method: 'GET',
      params: { id: customerId },
    })
    const next: NextHandler = err => {
      console.error(err)
    }

    await customerSustainabilityPerformanceHandler(req, res, next)

    const sustainability = res._getJSONData()

    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(sustainability.length).toEqual(0)
  })

  it('should get curr year and prev year sustainability performance', async () => {
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

    await customerSustainabilityPerformanceHandler(req, res, next)

    const sustainability = res._getJSONData()

    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(sustainability.length).toEqual(2)
    expect(sustainability).toEqual(sustainabilityResult)
  })

  it('should get all facility sustainability performance data by group supplier id', async () => {
    const customerId = mongoose.Types.ObjectId().toHexString()
    await setUpCustomerDocGivenCustomerId(customerId)
    await setUpSupplierDocUseFixSupplierId()

    const { req, res } = createMocks({
      method: 'GET',
      params: { id: customerId },
      query: { supplierId: '6036190bfa6b9297fa86c891' },
    })

    await customerSustainabilityPerformanceHandler(req, res, err => {
      console.error(err)
    })

    const sustainability = res._getJSONData()

    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(sustainability.length).toEqual(2)
    expect(sustainability).toEqual(groupSustainabilityResult)
  })

  it('should get only one facility sustainability performance data by facility supplier id', async () => {
    const customerId = mongoose.Types.ObjectId().toHexString()
    await setUpCustomerDocGivenCustomerId(customerId)
    await setUpSupplierDocUseFixSupplierId()

    const { req, res } = createMocks({
      method: 'GET',
      params: { id: customerId },
      query: { supplierId: '6036190bfa6b9297fa86c89a' },
    })

    await customerSustainabilityPerformanceHandler(req, res, err => {
      console.error(err)
    })

    const sustainability = res._getJSONData()

    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(sustainability.length).toEqual(2)
    expect(sustainability).toEqual(facilitySustainabilityResult)
  })
})
