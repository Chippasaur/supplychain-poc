import { createMocks } from 'node-mocks-http'
import mongoose from 'mongoose'

import News from '../../models/news'
import { newsHandler } from '../../routes'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'
import { setUpCustomerDocGivenCustomerId, setUpSupplierDocUseFixSupplierId } from '../fixtures/dataPreparation'
import { SupplierTierLevel } from '../../../shared/enum/supplierTierLevel'

describe('supplier news test', () => {
  it('should get supplier news data given customer id', async () => {
    const customerId = mongoose.Types.ObjectId().toHexString()
    await setUpCustomerDocGivenCustomerId(customerId)
    await setUpSupplierDocUseFixSupplierId()
    const news = await setUpNewsDoc()
    const { req, res } = createMocks({
      method: 'GET',
      query: { customerId },
    })

    await newsHandler(req, res, err => {
      console.error(err)
    })

    const responses = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(responses[0].supplierId).toEqual(news[0].supplierId)
    expect(responses.length).toEqual(news.length)
    expect(responses[0].tier).toEqual(SupplierTierLevel.TierTwo)
  })

  it('should get supplier news data given customer id and supplier id', async () => {
    const customerId = mongoose.Types.ObjectId().toHexString()
    const supplierId = '6036190bfa6b9297fa86c89a'
    await setUpCustomerDocGivenCustomerId(customerId)
    await setUpSupplierDocUseFixSupplierId()
    const news = await setUpNewsDoc()
    const { req, res } = createMocks({
      method: 'GET',
      query: { customerId, supplierId },
    })

    await newsHandler(req, res, err => {
      console.error(err)
    })

    const responses = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(responses[0].supplierId).toEqual(news[0].supplierId)
    expect(responses[0].tier).toEqual(SupplierTierLevel.TierTwo)
  })

  it('should not get supplier news data when customerId and supplierId is none', async () => {
    const customerId = mongoose.Types.ObjectId().toHexString()
    const customer = await setUpCustomerDocGivenCustomerId(customerId)
    await setUpSupplierDocUseFixSupplierId()
    await setUpNewsDoc()
    const { req, res } = createMocks({
      method: 'GET',
    })

    await newsHandler(req, res, err => {
      console.error(err)
    })

    expect(res._getStatusCode()).toBe(HttpStatusCode.InternalServerError)
  })
})

async function setUpNewsDoc() {
  const categories = [
    'Executive Announcement',
    'Bankruptcy',
    'Executive Quote',
    'Management Change',
    'General Industry',
  ]
  const news = [
    {
      supplierId: '6036190bfa6b9297fa86c89a',
      duns: '7fa86c89a',
      categories,
      title: 'Rubana Huq’s five-year vision on the Bangladesh RMG history',
      content: 'The credit report of <b>FORTUNE SHOES LTD.</b> has changed from Green to Amber',
      referenceUrl: 'https://www.somewebsite.com',
      postedAt: new Date('2021-03-03T08:08:13.008Z'),
    },
    {
      supplierId: '6036190bfa6b9297fa86c89e',
      duns: '7fa86c89e',
      categories,
      title: 'Rubana Huq’s five-year vision on the Bangladesh RMG history',
      content: 'The credit report of <b>FORTUNE SHOES LTD.</b> has changed from Green to Amber',
      referenceUrl: 'https://www.somewebsite.com',
      postedAt: new Date('2021-03-03T08:08:12.008Z'),
    },
    {
      supplierId: '6036190bfa6b9297fa86c891',
      duns: '7fa86c891',
      categories,
      title: 'Rubana Huq’s five-year vision on the Bangladesh RMG history',
      content: 'The credit report of <b>FORTUNE SHOES LTD.</b> has changed from Green to Amber',
      referenceUrl: 'https://www.somewebsite.com',
      postedAt: new Date('2021-03-03T08:08:11.008Z'),
    },
    {
      supplierId: '6036190bfa6b9297fa86c892',
      duns: '7fa86c892',
      categories,
      title: 'Rubana Huq’s five-year vision on the Bangladesh RMG history',
      content: 'The credit report of <b>FORTUNE SHOES LTD.</b> has changed from Green to Amber',
      referenceUrl: 'https://www.somewebsite.com',
      postedAt: new Date('2021-03-03T08:08:10.008Z'),
    },
  ]
  await News.create(news)
  return news
}
