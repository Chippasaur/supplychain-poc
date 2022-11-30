import { isEmpty, map } from 'lodash'

import logger from '../logger'
import SupplierModel from '../models/supplier'
import DAndBIndexModel from '../models/dAndBIndex'
import { SupplierResponse } from '../../shared/response'
import { CustomizedNextApiRequest, RequestHandler } from '../types'
import HiggIndexModel from '../models/higgIndex'
import { EntityType } from '../../shared/enum/entityType'
import Supplier from '../models/supplier'
import { getAverageByFieldAndPrecision, getSupplierTier } from '../services/customer.suppliers.service'
import TrafficLightIndexModel from '../models/trafficLightIndex'

const getHiggIndexDataByEntityType = async (supplierId: string, entity: EntityType) => {
  if (entity === EntityType.Group) {
    const supplierIds = await Supplier.find({ groupId: supplierId, entity: EntityType.Facility }, { _id: 1 })
    if (!isEmpty(supplierIds)) {
      const data = await HiggIndexModel.find(
        { supplierId: { $in: map(supplierIds, '_id') } },
        { selfAssessment: 1, verified: 1, _id: 0 },
      )
      return {
        selfAssessment: getAverageByFieldAndPrecision(data, 'selfAssessment', 1),
        verified: getAverageByFieldAndPrecision(data, 'verified', 1),
      }
    }
  }
  return HiggIndexModel.findOne({ supplierId })
}

export const queryCustomerSupplierHandler: RequestHandler<SupplierResponse, CustomizedNextApiRequest> = async (
  req,
  res,
) => {
  try {
    const supplierId = req.params.supplierId
    const supplierDoc = await SupplierModel.findOne({ _id: supplierId })
    const dAndBIndex = await DAndBIndexModel.findOne({ supplierId })
    const higgIndex = await getHiggIndexDataByEntityType(supplierId, supplierDoc.entity)
    const trafficLightIndex = await TrafficLightIndexModel.findOne({ supplierId })

    const supplierTier = getSupplierTier(supplierDoc.category)

    const response: SupplierResponse = <SupplierResponse>{
      id: supplierDoc._id,
      tier: supplierTier,
      logoUri: supplierDoc.logoUri,
      name: supplierDoc.name,
      contact: {
        name: supplierDoc.contact.name,
        telephone: supplierDoc.contact.telephone,
        email: supplierDoc.contact.email,
        jobTitle: supplierDoc.contact.jobTitle,
      },
      category: supplierDoc.category,
      entity: supplierDoc.entity,
      groupId: supplierDoc.groupId,
      coordinate: {
        longitude: supplierDoc.coordinate.longitude,
        latitude: supplierDoc.coordinate.latitude,
      },
      business: {
        businessType: supplierDoc.business.businessType,
        entityType: supplierDoc.business.entityType,
      },
      location: {
        address: supplierDoc.location.address,
        postalCode: supplierDoc.location.postalCode,
        state: supplierDoc.location.state,
        city: supplierDoc.location.city,
        region: supplierDoc.location.region,
      },
      officialContact: {
        telephone: supplierDoc.contact.telephone,
        officialEmail: supplierDoc.contact.officialEmail,
        websiteUrl: supplierDoc.contact.websiteUrl,
      },
      registration: {
        registrationName: supplierDoc.registration.registrationName,
        registrationNumber: supplierDoc.registration.registrationNumber,
        registrationType: supplierDoc.registration.registrationType,
      },
      overallStatus: {
        companyStatus: supplierDoc.overallStatus.companyStatus,
        sanction: supplierDoc.overallStatus.sanction,
        ultimateOwners: supplierDoc.overallStatus.ultimateOwners.join(''),
        beneficialOwners: supplierDoc.overallStatus.beneficialOwners.join(''),
        revenue: supplierDoc.overallStatus.revenue,
        employeeNum: supplierDoc.overallStatus.employeeNum,
      },
      dAndB: {
        businessRiskLevel: dAndBIndex.level,
        rating: dAndBIndex.rating,
        padex: dAndBIndex.padex,
        financialStrength: dAndBIndex.financialStrength,
        compositeCreditAppraisal: dAndBIndex.compositeCreditAppraisal,
        financialRisk: dAndBIndex.financialRisk,
        viabilityRating: dAndBIndex.viabilityRating,
        viabilityScore: dAndBIndex.viabilityScore,
      },
      higgIndex: {
        selfAssessment: higgIndex.selfAssessment,
        verified: higgIndex.verified,
      },
      trafficLight: {
        level: trafficLightIndex.level,
      },
    }

    res.json(response)
  } catch (error) {
    logger.error('Handle customer supplier request error: ', error)
  }
}
