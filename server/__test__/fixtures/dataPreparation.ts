import { ObjectId } from 'mongodb'

import CustomerModel from '../../models/customer'
import DAndBModel from '../../models/dAndBIndex'
import SupplierModel from '../../models/supplier'
import TrafficLightModel from '../../models/trafficLightIndex'
import HiggIndexModel from '../../models/higgIndex'
import { TrafficLightLevel } from '../../../shared/enum/trafficLightLevel'
import { DAndBLevel } from '../../../shared/enum/dAndBLevel'
import { CompanyStatus } from '../../../shared/enum/companyStatus'
import { Sanction } from '../../../shared/enum/sanction'
import Shipment from '../../models/shippment'
import MockShipment from '../../models/mockShipment'

export const setUpCustomerDocGivenCustomerId = async (customerId: string) => {
  await CustomerModel.create({
    _id: customerId,
    name: 'Nike, Inc',
    logoUri: '/companies/nike.png',
    relations: [
      { source: '6036190bfa6b9297fa86c89a', target: 'xxx' },
      { source: '6036190bfa6b9297fa86c89e', target: 'xxx' },
      { source: '6036190bfa6b9297fa86c891', target: 'xxx' },
      { source: '6036190bfa6b9297fa86c892', target: 'xxx' },
    ],
  })
}

export const setUpTrafficLightDocUseFixSupplierId = async () => {
  await TrafficLightModel.create([
    {
      level: TrafficLightLevel.Safe,
      supplierId: '6036190bfa6b9297fa86c89a',
    },
    {
      level: TrafficLightLevel.AverageRisk,
      supplierId: '6036190bfa6b9297fa86c89e',
    },
    {
      level: TrafficLightLevel.ElevatedRisk,
      supplierId: '6036190bfa6b9297fa86c891',
    },
    {
      level: TrafficLightLevel.ElevatedRisk,
      supplierId: '6036190bfa6b9297fa86c892',
    },
  ])
}

export const setUpDAndBDocUseFixSupplierId = async () => {
  await DAndBModel.create([
    {
      level: DAndBLevel.Low,
      supplierId: '6036190bfa6b9297fa86c89a',
    },
    {
      level: DAndBLevel.Moderate,
      supplierId: '6036190bfa6b9297fa86c89e',
    },
    {
      level: DAndBLevel.High,
      supplierId: '6036190bfa6b9297fa86c891',
    },
    {
      level: DAndBLevel.High,
      supplierId: '6036190bfa6b9297fa86c892',
    },
  ])
}

export const setUpHiggIndexDocUseFixSupplierId = async () => {
  await HiggIndexModel.create([
    {
      selfAssessment: 90,
      verified: 100,
      supplierId: '6036190bfa6b9297fa86c89a',
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
    },
    {
      selfAssessment: 90,
      verified: 100,
      supplierId: '6036190bfa6b9297fa86c89a',
      sustainability: {
        ems: 70.0,
        energyEmissions: 70.0,
        waterUse: 70.0,
        wasteWaterEffluent: 70.0,
        emissionToAir: 70.0,
        wasteManagement: 70.0,
        chemicals: 70.0,
      },
      reportTime: new Date().getFullYear() - 1,
    },
    {
      selfAssessment: 90,
      verified: 100,
      supplierId: '6036190bfa6b9297fa86c89e',
      sustainability: {
        ems: 30.0,
        energyEmissions: 30.0,
        waterUse: 30.0,
        wasteWaterEffluent: 30.0,
        emissionToAir: 30.0,
        wasteManagement: 30.0,
        chemicals: 30.0,
      },
      reportTime: new Date().getFullYear(),
    },
    {
      selfAssessment: 90,
      verified: 100,
      supplierId: '6036190bfa6b9297fa86c89e',
      sustainability: {
        ems: 40.0,
        energyEmissions: 40.0,
        waterUse: 40.0,
        wasteWaterEffluent: 40.0,
        emissionToAir: 40.0,
        wasteManagement: 40.0,
        chemicals: 40.0,
      },
      reportTime: new Date().getFullYear() - 1,
    },
    {
      selfAssessment: 90,
      verified: 100,
      supplierId: '6036190bfa6b9297fa86c892',
      sustainability: {
        ems: 30.0,
        energyEmissions: 30.0,
        waterUse: 60.0,
        wasteWaterEffluent: 60.0,
        emissionToAir: 15.0,
        wasteManagement: 15.0,
        chemicals: 0.0,
      },
      reportTime: new Date().getFullYear(),
    },
    {
      selfAssessment: 90,
      verified: 100,
      supplierId: '6036190bfa6b9297fa86c892',
      sustainability: {
        ems: 80.0,
        energyEmissions: 70.0,
        waterUse: 50.0,
        wasteWaterEffluent: 40.0,
        emissionToAir: 55.0,
        wasteManagement: 35.0,
        chemicals: 20.0,
      },
      reportTime: new Date().getFullYear() - 1,
    },
  ])
}

export const setUpSupplierDocUseFixSupplierId = async () => {
  await SupplierModel.create([
    {
      _id: '6036190bfa6b9297fa86c89a',
      name: 'COOPERSHOES',
      logoUri: '',
      region: 'AMERICAS',
      contact: {
        name: 'Accaphon  Chudankura',
        email: 'accaphon.c_nk@niceapparelgroup.com',
        jobTitle: 'Senior Creative Orchestrator',
        websiteUrl: 'www.dummy.com',
        telephone: '888-8888-8888',
        officialEmail: 'info@dummy.com',
      },
      rating: 0,
      category: 1,
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
      groupId: '6036190bfa6b9297fa86c891',
      business: {
        businessType: 'dummy type',
        entityType: 'dummy type',
      },
      registration: {
        registrationName: 'COOPERSHOES',
        registrationNumber: '1234567',
        registrationType: 'dummy type',
      },
      overallStatus: {
        companyStatus: CompanyStatus.Active,
        sanction: Sanction.Passed,
        ultimateOwners: ['Will Simith'],
        beneficialOwners: ['Jane Done'],
        revenue: 75278481,
        employeeNum: 10000,
      },
      buyers: [
        'Fair Factories Clearinghouse (FFC FactoryList Apr 19)',
        'New Balance (New Balance T1 Supplier List October 2020)',
      ],
    },
    {
      _id: '6036190bfa6b9297fa86c89e',
      name: 'MV SHOES',
      logoUri: '',
      region: 'AMERICAS',
      contact: {
        name: 'Accaphon  Chudankura',
        email: 'accaphon.c_nk@niceapparelgroup.com',
        jobTitle: 'Senior Creative Orchestrator',
        websiteUrl: 'www.dummy.com',
        telephone: '888-8888-8888',
        officialEmail: 'info@dummy.com',
      },
      rating: 2,
      category: 2,
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
      groupId: '6036190bfa6b9297fa86c891',
      business: {
        businessType: 'dummy type',
        entityType: 'dummy type',
      },
      registration: {
        registrationName: 'COOPERSHOES',
        registrationNumber: '1234567',
        registrationType: 'dummy type',
      },
      overallStatus: {
        companyStatus: CompanyStatus.Active,
        sanction: Sanction.Passed,
        ultimateOwners: ['Will Simith'],
        beneficialOwners: ['Jane Done'],
        revenue: 75278481,
        employeeNum: 10000,
      },
      buyers: [
        'Partnership for Sustainable Textiles (PST) (PST Nov 2020)',
        'Under Armour [Public List] (Under Armour Facility List December 2019)',
      ],
    },
    {
      _id: '6036190bfa6b9297fa86c891',
      name: 'SAN FANG',
      logoUri: '',
      region: 'SAN FANG',
      contact: {
        name: 'Accaphon  Chudankura',
        email: 'accaphon.c_nk@niceapparelgroup.com',
        jobTitle: 'Senior Creative Orchestrator',
        websiteUrl: 'www.dummy.com',
        telephone: '888-8888-8888',
        officialEmail: 'info@dummy.com',
      },
      rating: 3.5,
      category: 3,
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
      entity: 1,
      groupId: '6036190bfa6b9297fa86c891',
      business: {
        businessType: 'dummy type',
        entityType: 'dummy type',
      },
      registration: {
        registrationName: 'COOPERSHOES',
        registrationNumber: '1234567',
        registrationType: 'dummy type',
      },
      overallStatus: {
        companyStatus: CompanyStatus.Active,
        sanction: Sanction.Passed,
        ultimateOwners: ['Will Simith'],
        beneficialOwners: ['Jane Done'],
        revenue: 75278481,
        employeeNum: 10000,
      },
      buyers: [],
    },
    {
      _id: '6036190bfa6b9297fa86c892',
      name: 'SAN FANG',
      logoUri: '',
      region: 'SAN FANG',
      contact: {
        name: 'Accaphon  Chudankura',
        email: 'accaphon.c_nk@niceapparelgroup.com',
        jobTitle: 'Senior Creative Orchestrator',
        websiteUrl: 'www.dummy.com',
        telephone: '888-8888-8888',
        officialEmail: 'info@dummy.com',
      },
      rating: 3.5,
      category: 3,
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
      groupId: '6036190bfa6b9297fa86c893',
      business: {
        businessType: 'dummy type',
        entityType: 'dummy type',
      },
      registration: {
        registrationName: 'COOPERSHOES',
        registrationNumber: '1234567',
        registrationType: 'dummy type',
      },
      overallStatus: {
        companyStatus: CompanyStatus.Active,
        sanction: Sanction.Passed,
        ultimateOwners: ['Will Simith'],
        beneficialOwners: ['Jane Done'],
        revenue: 75278481,
        employeeNum: 10000,
      },
      buyers: ['adidas (adidas Factory List - January 2020)'],
    },
  ])
  await setUpTrafficLightDocUseFixSupplierId()
  await setUpDAndBDocUseFixSupplierId()
  await setUpHiggIndexDocUseFixSupplierId()
}

export const setUpShipmentDocUseFixedSupplierId = async () => {
  await setUpSupplierDocUseFixSupplierId()

  await Shipment.create([
    {
      _id: new ObjectId().toHexString(),
      sellerName: 'COOPERSHOES',
      sellerId: '6036190bfa6b9297fa86c89a',
      buyerName: 'Nike',
      buyerCompanyCode: 'nike',
      hsCode: '610000',
      hsDescription: 'XinJiang Cotton',
      value: 1000,
      shipmentDate: '2018/10/20',
    },
    {
      _id: new ObjectId().toHexString(),
      sellerName: 'COOPERSHOES',
      sellerId: '6036190bfa6b9297fa86c89a',
      buyerName: 'Nike',
      buyerCompanyCode: 'nike',
      hsCode: '610000',
      hsDescription: 'XinJiang Cotton',
      value: 1000,
      shipmentDate: '2018/10/20',
    },
    {
      _id: new ObjectId().toHexString(),
      sellerName: 'COOPERSHOES',
      sellerId: '6036190bfa6b9297fa86c89a',
      buyerName: 'GAP',
      buyerCompanyCode: 'gap',
      hsCode: '610001',
      hsDescription: 'Fabric',
      value: 500,
      shipmentDate: '2018/10/20',
    },
    {
      _id: new ObjectId().toHexString(),
      sellerName: 'COOPERSHOES',
      sellerId: '6036190bfa6b9297fa86c89a',
      buyerName: 'GAP',
      buyerCompanyCode: 'gap',
      hsCode: '610001',
      hsDescription: 'Fabric',
      value: 500,
      shipmentDate: '2018/10/20',
    },
    {
      _id: new ObjectId().toHexString(),
      sellerName: 'MV SHOES',
      sellerId: '6036190bfa6b9297fa86c89e',
      buyerName: 'Nike',
      buyerCompanyCode: 'nike',
      hsCode: '610000',
      hsDescription: 'XinJiang Cotton',
      value: 1000,
      shipmentDate: '2018/10/20',
    },
    {
      _id: new ObjectId().toHexString(),
      sellerName: 'MV SHOES',
      sellerId: '6036190bfa6b9297fa86c89e',
      buyerName: 'GAP',
      buyerCompanyCode: 'gap',
      hsCode: '610001',
      hsDescription: 'Fabric',
      value: 500,
      shipmentDate: '2018/10/20',
    },
    {
      _id: new ObjectId().toHexString(),
      sellerName: 'MV SHOES',
      sellerId: '6036190bfa6b9297fa86c89e',
      buyerName: 'GAP',
      buyerCompanyCode: 'gap',
      hsCode: '610001',
      hsDescription: 'Fabric',
      value: 600,
      shipmentDate: '2018/10/20',
    },
  ])
}

export const setUpMockShipmentDocUseFixedSupplierId = async () => {
  await setUpSupplierDocUseFixSupplierId()

  await MockShipment.create([
    {
      _id: new ObjectId().toHexString(),
      facilityName: 'COOPERSHOES',
      facilityId: '6036190bfa6b9297fa86c89a',
      shipmentDate: '2021/01/01',
      volume: 20,
    },
    {
      _id: new ObjectId().toHexString(),
      facilityName: 'COOPERSHOES',
      facilityId: '6036190bfa6b9297fa86c89a',
      shipmentDate: '2021/01/02',
      volume: 30,
    },
    {
      _id: new ObjectId().toHexString(),
      facilityName: 'MV SHOES',
      facilityId: '6036190bfa6b9297fa86c89e',
      shipmentDate: '2021/01/01',
      volume: 40,
    },
    {
      _id: new ObjectId().toHexString(),
      facilityName: 'MV SHOES',
      facilityId: '6036190bfa6b9297fa86c89e',
      shipmentDate: '2021/01/02',
      volume: 50,
    },
  ])
}
