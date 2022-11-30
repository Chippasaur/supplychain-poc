import { find, eq, map, isNil } from 'lodash'

import logger from '../logger'
import News from '../models/news'
import Customer from '../models/customer'
import Supplier from '../models/supplier'
import { NewsResponse } from '../../shared/response'
import { HttpStatusCode } from '../infrastructure/httpStatusCode'
import { CustomizedNextApiRequest, RequestHandler } from '../types'
import { extractSupplierIds, getSupplierTier } from '../services/customer.suppliers.service'
import { SupplierTierLevel } from '../../shared/enum/supplierTierLevel'

export const newsHandler: RequestHandler<Array<NewsResponse>, CustomizedNextApiRequest> = async (req, res) => {
  try {
    const { customerId, supplierId } = req.query
    const customerDoc = await Customer.findOne({ _id: customerId }, { relations: 1, _id: 0 })
    const supplierIds = extractSupplierIds(customerDoc.relations)

    const isValid = find(supplierIds, item => eq(item, supplierId))
    const newsDocs = await News.find(isValid ? { supplierId } : { supplierId: { $in: supplierIds } })
      .sort({ postedAt: -1 })
      .limit(30)

    const newsSupplierIds = map(newsDocs, newsDoc => newsDoc.supplierId)
    const suppliersDocs = await Supplier.find({ _id: { $in: newsSupplierIds } })

    const news: Array<NewsResponse> = newsDocs.map(newsDoc => {
      const relativeSupplier = find(suppliersDocs, { _id: newsDoc.supplierId })
      const tier = isNil(relativeSupplier) ? SupplierTierLevel.TierOne : getSupplierTier(relativeSupplier.category)
      return <NewsResponse>{
        id: newsDoc._id,
        supplierId: newsDoc.supplierId,
        tier,
        title: newsDoc.title,
        content: newsDoc.content,
        postedAt: newsDoc.postedAt,
      }
    })
    res.json(news)
  } catch (error) {
    logger.error('Handle query news request error: ', error)
    res.status(HttpStatusCode.InternalServerError).end()
  }
}
