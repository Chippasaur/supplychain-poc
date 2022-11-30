import mongoose from 'mongoose'
import { NextHandler } from 'next-connect'
import { createMocks } from 'node-mocks-http'

import { usersHandler } from '../../routes'
import User from '../../models/user'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'

describe('users api', () => {
  const email = 'example@example.com'

  beforeEach(async () => {
    process.env.USER_EMAIL = email
  })

  it('should be able to get info of the fake user', async () => {
    const userDoc = await givenUserDoc()
    const { req, res } = createMocks({ method: 'GET' })
    const next: NextHandler = err => {
      console.error(err)
    }

    await usersHandler(req, res, next)

    const userResponse = res._getJSONData()

    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(userResponse.name).toEqual(userDoc.name)
    expect(userResponse.email).toEqual(userDoc.email)
    expect(userResponse.customerId).toEqual(userDoc.customerId)
  })

  async function givenUserDoc() {
    const doc = {
      name: 'Matt',
      email: email,
      customerId: mongoose.Types.ObjectId().toHexString(),
    }
    await User.create(doc)
    return doc
  }
})
