import mongoose from 'mongoose'
import { createMocks } from 'node-mocks-http'

import { customerSuppliersHandler } from '../../routes'
import CounterPartiesResult from '../fixtures/customer.suppliers.json'
import { setUpCustomerDocGivenCustomerId, setUpSupplierDocUseFixSupplierId } from '../fixtures/dataPreparation'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'

describe('customer suppliers api', () => {
  it('should be able to get partners info by customer id', async () => {
    const customerId = mongoose.Types.ObjectId().toHexString()
    await setUpCustomerDocGivenCustomerId(customerId)
    await setUpSupplierDocUseFixSupplierId()
    const { req, res } = createMocks({
      method: 'GET',
      params: { id: customerId },
    })

    await customerSuppliersHandler(req, res, err => {
      console.error(err)
    })

    const response = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(response).toEqual(CounterPartiesResult)
  })
})
