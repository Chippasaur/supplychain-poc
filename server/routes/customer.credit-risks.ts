import { map } from 'lodash'

import logger from '../logger'
import Customer from '../models/customer'
import Supplier from '../models/supplier'
import dAndBIndex from '../models/dAndBIndex'
import { EntityType } from '../../shared/enum/entityType'
import { CreditRiskCountResponse } from '../../shared/response'
import { HttpStatusCode } from '../infrastructure/httpStatusCode'
import { CustomizedNextApiRequest, RequestHandler } from '../types'
import { extractSupplierIds } from '../services/customer.suppliers.service'

export const customerCreditRiskHandler: RequestHandler<
  Array<CreditRiskCountResponse>,
  CustomizedNextApiRequest
> = async (req, res, next) => {
  try {
    const customerId = req.params.id
    const customerDoc = await Customer.findOne({ _id: customerId })
    const supplierIds = extractSupplierIds(customerDoc.relations)
    const facilityIds = await Supplier.find(
      { _id: { $in: supplierIds }, entity: EntityType.Facility },
      { _id: 1 },
    ).lean()

    const groupedCreditRisks = await dAndBIndex
      .aggregate()
      .match({ supplierId: { $in: map(facilityIds, '_id') } })
      .group({ _id: '$level', count: { $sum: 1 } })
      .sort({ _id: 1 })

    const creditRiskCounts = groupedCreditRisks.map(
      it =>
        <CreditRiskCountResponse>{
          level: it._id,
          count: it.count,
        },
    )
    res.json(creditRiskCounts)
  } catch (error) {
    logger.error('query customer credit risk error: ', error)
    res.status(HttpStatusCode.BadRequest).end()
  }
}
