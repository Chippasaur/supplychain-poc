import { createMocks } from 'node-mocks-http'
import mongoose from 'mongoose'

import SupplierModel from '../../models/supplier'
import CustomerModel from '../../models/customer'
import TrafficLightModel from '../../models/trafficLightIndex'
import DAndBModel from '../../models/dAndBIndex'
import { queryCustomerSupplierHandler } from '../../routes'
import { TrafficLightLevel } from '../../../shared/enum/trafficLightLevel'
import { DAndBLevel } from '../../../shared/enum/dAndBLevel'
import { CompanyStatus } from '../../../shared/enum/companyStatus'
import { Sanction } from '../../../shared/enum/sanction'
import HiggIndex from '../../models/higgIndex'
import TrafficLightIndex from '../../models/trafficLightIndex'
import { SupplierCategory } from '../../../shared/enum/category'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'
import { SupplierTierLevel } from '../../../shared/enum/supplierTierLevel'

describe('customer supplier route handler', () => {
  it('should get supplier info with tier given customer id and supplier id', async () => {
    const supplierId = mongoose.Types.ObjectId().toHexString()
    const customerId = mongoose.Types.ObjectId().toHexString()
    await givenSupplierDoc(supplierId)
    await givenCustomerDoc(customerId, supplierId)
    const { req, res } = createMocks({
      method: 'GET',
      params: { customerId, supplierId },
    })

    await queryCustomerSupplierHandler(req, res, err => {
      console.error(err)
    })

    const customerSupplierResponse = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(customerSupplierResponse.tier).toEqual(SupplierTierLevel.TierTwo)
    expect(customerSupplierResponse.id).toEqual(supplierId)
    expect(customerSupplierResponse.name).toEqual('Nike')
    expect(customerSupplierResponse.logoUri).toEqual('./images/nike.jpg')
    expect(customerSupplierResponse.contact).toEqual({
      email: '1078978@qq.com ',
      name: 'Mike',
      telephone: '888-8888-8888',
      jobTitle: 'Senior Creative Orchestrator',
    })
    expect(customerSupplierResponse.category).toEqual(SupplierCategory.FabricSupplier)
    expect(customerSupplierResponse.entity).toEqual(0)
    expect(customerSupplierResponse.coordinate).toEqual({
      latitude: 24.0,
      longitude: 100.0,
    })
    expect(customerSupplierResponse.dAndB).toEqual({
      businessRiskLevel: 0,
      rating: 'GG1',
      padex: 100,
      financialStrength: 1,
      compositeCreditAppraisal: 1,
      financialRisk: 1,
      viabilityRating: '14AA',
      viabilityScore: 1,
    })
    expect(customerSupplierResponse.higgIndex).toEqual({
      selfAssessment: 99,
      verified: 50,
    })
    expect(customerSupplierResponse.trafficLight).toEqual({
      level: TrafficLightLevel.Safe,
    })
  })

  async function givenCustomerDoc(customerId: string, supplierId: string) {
    const customerDoc = {
      _id: customerId,
      name: 'Nike, Inc',
      logoUri: '/companies/nike.png',
      suppliers: [{ tier: 1, suppliers: [{ supplierId }] }],
    }
    await CustomerModel.create(customerDoc)
    return customerDoc
  }

  async function givenSupplierDoc(supplierId: string) {
    const doc = {
      _id: supplierId,
      name: 'Nike',
      logoUri: './images/nike.jpg',
      contact: {
        name: 'Mike',
        email: '1078978@qq.com ',
        phone: '13678923389',
        jobTitle: 'Senior Creative Orchestrator',
        websiteUrl: 'www.dummy.com',
        telephone: '888-8888-8888',
        officialEmail: 'info@dummy.com',
      },
      rating: 1,
      category: SupplierCategory.FabricSupplier,
      coordinate: {
        latitude: 24.0,
        longitude: 100.0,
      },
      location: {
        address: 'address',
        city: 'city',
        state: 'state',
        region: 'region',
        postalCode: 'postalCode',
      },
      entity: 0,
      groupId: supplierId,
      business: {
        businessType: 'dummy type',
        entityType: 'dummy type',
      },
      registration: {
        registrationName: 'Nike',
        registrationNumber: '1234567',
        registrationType: '1234567',
      },
      overallStatus: {
        companyStatus: CompanyStatus.Active,
        sanction: Sanction.Passed,
        ultimateOwners: ['Will Simith'],
        beneficialOwners: ['Jane Done'],
        revenue: 75278481,
        employeeNum: 10000,
      },
    }
    await SupplierModel.create(doc)
    await TrafficLightModel.create([
      {
        level: TrafficLightLevel.Safe,
        supplierId: supplierId,
      },
    ])
    await DAndBModel.create([
      {
        level: DAndBLevel.Low,
        supplierId: supplierId,
        rating: 'GG1',
        padex: 100,
        financialStrength: 1,
        compositeCreditAppraisal: 1,
        financialRisk: 1,
        viabilityRating: '14AA',
        viabilityScore: 1,
      },
    ])
    await HiggIndex.create({
      selfAssessment: 99,
      verified: 50,
      supplierId: supplierId,
      sustainability: {
        ems: 50.0,
        energyEmissions: 50.0,
        waterUse: 50.0,
        wasteWaterEffluent: 50.0,
        emissionToAir: 50.0,
        wasteManagement: 50.0,
        chemicals: 50.0,
      },
      reportTime: new Date().getFullYear(),
    })
    await TrafficLightIndex.create({
      level: TrafficLightLevel.Safe,
      supplierId: supplierId,
    })
    return doc
  }
})
