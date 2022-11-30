import { NextHandler } from 'next-connect'
import mongoose from 'mongoose'
import { createMocks } from 'node-mocks-http'

import { customersHandler } from '../../routes'
import Customer from '../../models/customer'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'

describe('customers api', () => {
  it('should be able to get customer info by customer id', async () => {
    const customerDoc = await givenCustomerDoc()
    const { req, res } = createMocks({
      method: 'GET',
      params: {
        id: customerDoc._id,
      },
    })
    const next: NextHandler = err => {
      console.error(err)
    }

    await customersHandler(req, res, next)

    const customerResponse = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(customerResponse.id).toEqual(customerDoc._id)
    expect(customerResponse.name).toEqual(customerDoc.name)
    expect(customerResponse.logoUri).toEqual(customerDoc.logoUri)
  })

  async function givenCustomerDoc() {
    const customerDoc = {
      _id: mongoose.Types.ObjectId().toHexString(),
      name: 'Nike, Inc',
      logoUri: '/companies/nike.png',
      suppliers: [
        { tier: 1, suppliers: [{ supplierId: 11 }, { supplierId: 12 }, { supplierId: 13 }] },
        { tier: 2, suppliers: [{ supplierId: 21 }, { supplierId: 22 }, { supplierId: 23 }] },
        { tier: 3, suppliers: [{ supplierId: 31 }, { supplierId: 32 }, { supplierId: 33 }] },
      ],
    }

    await Customer.create(customerDoc)
    return customerDoc
  }
})
