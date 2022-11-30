import { entries, isEmpty, map } from 'lodash'

import logger from '../logger'
import Customer from '../models/customer'
import Supplier from '../models/supplier'
import HiggIndex from '../models/higgIndex'
import {
  addSustainabilityPerformance,
  averageSustainabilityPerformance,
  divideSustainabilityPerformance,
  SustainabilityPerformance,
} from '../services/customer.higgindex.service'
import { SustainabilityResponse } from '../../shared/response'
import { HttpStatusCode } from '../infrastructure/httpStatusCode'
import { CustomizedNextApiRequest, RequestHandler } from '../types'
import { extractSupplierIds } from '../services/customer.suppliers.service'
import { EntityType } from '../../shared/enum/entityType'

const getPerformanceAverage = (currYearSustainability: SustainabilityPerformance[]) => {
  const currYearTotal = currYearSustainability.reduce(addSustainabilityPerformance)
  return divideSustainabilityPerformance(currYearTotal, currYearSustainability.length)
}

const getYearPerformance = (currYearAver: SustainabilityPerformance) => {
  const currYearPerformance = []

  currYearPerformance.push({
    sustainabilityIndex: 'totalAverage',
    score: averageSustainabilityPerformance(currYearAver).toFixed(1),
  })

  for (const entry of entries(currYearAver)) {
    currYearPerformance.push({
      sustainabilityIndex: entry[0],
      score: entry[1].toFixed(1),
    })
  }
  return currYearPerformance
}

const determineSupplierIds = async (supplierId: string, customerId: string) => {
  const idsForCustomer = !supplierId
  if (idsForCustomer) {
    const customerDoc = await Customer.findOne({ _id: customerId })
    return extractSupplierIds(customerDoc.relations)
  }

  const supplierIds = await Supplier.find({ groupId: supplierId, entity: EntityType.Facility }, { _id: 1 })
  const idsForGroup = !isEmpty(supplierIds)
  if (idsForGroup) {
    return map(supplierIds, '_id')
  }

  return supplierId
}

const getSustainabilityPerformances = async (
  customerId: string,
  supplierId: string,
  currYear: number,
  lastYear: number,
) => {
  const supplierIds = await determineSupplierIds(supplierId, customerId)
  const data = await HiggIndex.find(
    { reportTime: { $lte: currYear, $gte: lastYear }, supplierId: { $in: supplierIds } },
    { sustainability: 1, reportTime: 1, _id: 0 },
  ).lean()

  const currYearHiggDocs = data.filter(doc => doc.reportTime == currYear).map(doc => doc.sustainability)
  const lastYearHiggDocs = data.filter(doc => doc.reportTime == lastYear).map(doc => doc.sustainability)

  return [
    { doc: currYearHiggDocs, year: currYear },
    { doc: lastYearHiggDocs, year: lastYear },
  ]
}

export const customerSustainabilityPerformanceHandler: RequestHandler<
  Array<SustainabilityResponse>,
  CustomizedNextApiRequest
> = async (req, res) => {
  const customerId = req.params.id
  const { supplierId: queryId } = req.query
  const supplierId = queryId as string
  const currYear = new Date().getFullYear()
  const lastYear = currYear - 1
  const result: Array<SustainabilityResponse> = []

  try {
    const sustainabilityPerformances = await getSustainabilityPerformances(customerId, supplierId, currYear, lastYear)

    for (const performance of sustainabilityPerformances) {
      const year = performance.year
      const currYearSustainability = performance.doc

      if (currYearSustainability.length > 0) {
        const currYearAver = getPerformanceAverage(currYearSustainability)
        const currYearPerformance = getYearPerformance(currYearAver)
        const curr = <SustainabilityResponse>{ performance: currYearPerformance, reportTime: year }
        result.push(curr)
      }
    }
    res.json(result)
  } catch (error) {
    logger.error('Handle query customer sustainability error: ', error)
    res.status(HttpStatusCode.InternalServerError).end()
  }
}
