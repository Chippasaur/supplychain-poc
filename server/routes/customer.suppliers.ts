import { find } from 'lodash'

import logger from '../logger'
import Customer from '../models/customer'
import Supplier from '../models/supplier'
import { HttpStatusCode } from '../infrastructure/httpStatusCode'
import { CustomerSuppliersResponse } from '../../shared/response'
import { CustomizedNextApiRequest, RequestHandler } from '../types'
import { extractSupplierIds, getSupplierTier } from '../services/customer.suppliers.service'
import { averageSustainabilityPerformance } from '../services/customer.higgindex.service'

const getHiggCurrentYearTotalScore = (higgIndexesDoc: any, currYear: number) => {
  let higgScore = -1
  if (higgIndexesDoc.length) {
    const currYearHiggDoc = find(higgIndexesDoc, { reportTime: currYear })
    const sustainabilityPerformance = currYearHiggDoc ? currYearHiggDoc.sustainability : null
    higgScore = sustainabilityPerformance ? averageSustainabilityPerformance(sustainabilityPerformance) : -1
  }
  return higgScore
}

export const customerSuppliersHandler: RequestHandler<
  Array<CustomerSuppliersResponse>,
  CustomizedNextApiRequest
> = async (req, res, next) => {
  try {
    const id = req.params.id
    const customerDoc = await Customer.findOne({ _id: id }, { relations: 1, _id: 0 })
    const supplierIds = extractSupplierIds(customerDoc.relations)

    const supplierDocs = await Supplier.aggregate()
      .match({ _id: { $in: supplierIds } })
      .lookup({
        from: 'traffic_light_indexes',
        localField: '_id',
        foreignField: 'supplierId',
        as: 'supplier.traffic_light_index',
      })
      .lookup({
        from: 'd_and_b_indexes',
        localField: '_id',
        foreignField: 'supplierId',
        as: 'supplier.d_and_b_indexes',
      })
      .lookup({
        from: 'higg_indexes',
        localField: '_id',
        foreignField: 'supplierId',
        as: 'supplier.higg_indexes',
      })
      .sort({ name: 1 })

    const currYear = new Date().getFullYear()
    const response = supplierDocs.map(supplierDoc => {
      supplierDoc.tier = getSupplierTier(supplierDoc.category)
      const higgTotalScore = getHiggCurrentYearTotalScore(supplierDoc.supplier.higg_indexes, currYear)
      return <CustomerSuppliersResponse>{
        id: supplierDoc._id,
        companyName: supplierDoc.name,
        entity: supplierDoc.entity,
        tier: supplierDoc.tier,
        financialHealth: supplierDoc.supplier.traffic_light_index[0].level,
        rating: supplierDoc.rating,
        riskLevel: supplierDoc.supplier.d_and_b_indexes[0].level,
        higgTotalScore,
        category: supplierDoc.category,
        coordinate: {
          latitude: supplierDoc.coordinate.latitude,
          longitude: supplierDoc.coordinate.longitude,
        },
        location: supplierDoc.location,
        logo: supplierDoc.logoUri,
        groupId: supplierDoc.groupId,
      }
    })
    res.json(response)
  } catch (error) {
    logger.error('Handle query customer supplier request error: ', error)
    res.status(HttpStatusCode.InternalServerError).end()
  }
}
