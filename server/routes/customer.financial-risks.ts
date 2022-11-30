import logger from '../logger'
import Customer from '../models/customer'
import TrafficLightIndex from '../models/trafficLightIndex'
import { HttpStatusCode } from '../infrastructure/httpStatusCode'
import { FinancialRiskCountResponse } from '../../shared/response'
import { CustomizedNextApiRequest, RequestHandler } from '../types'
import { extractSupplierIds } from '../../server/services/customer.suppliers.service'

export const customerFinancialRiskHandler: RequestHandler<
  Array<FinancialRiskCountResponse>,
  CustomizedNextApiRequest
> = async (req, res, next) => {
  const customerId = req.params.id
  const customerDoc = await Customer.findOne({ _id: customerId })
  const supplierIds = extractSupplierIds(customerDoc.relations)

  try {
    const groupedFinancialRisks = await TrafficLightIndex.aggregate()
      .match({ supplierId: { $in: supplierIds } })
      .group({ _id: '$level', count: { $sum: 1 } })
      .sort({ _id: 1 })

    const financialRiskCounts = groupedFinancialRisks.map(
      it =>
        <FinancialRiskCountResponse>{
          level: it._id,
          count: it.count,
        },
    )

    res.json(financialRiskCounts)
  } catch (error) {
    logger.error('Handle query financial risk request error: ', error)
    res.status(HttpStatusCode.InternalServerError).end()
  }
}
