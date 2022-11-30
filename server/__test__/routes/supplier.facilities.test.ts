import { createMocks } from 'node-mocks-http'
import mongoose from 'mongoose'

import { queryCustomerSupplierFacilitiesHandler } from '../../routes/supplier.facilities'
import SupplierModel from '../../models/supplier'
import { CompanyStatus } from '../../../shared/enum/companyStatus'
import { Sanction } from '../../../shared/enum/sanction'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'

describe('facilities api test', () => {
  it('should get facilities data given supplier id', async () => {
    const supplierId = mongoose.Types.ObjectId().toHexString()
    await setUpSupplierDoc(supplierId)
    const { req, res } = createMocks({
      method: 'GET',
      params: { supplierId },
    })

    await queryCustomerSupplierFacilitiesHandler(req, res, err => {
      console.error(err)
    })

    const facilitiesResponse = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(facilitiesResponse.length).toEqual(1)
    expect(facilitiesResponse[0].id).toEqual('fake id 1')
    expect(facilitiesResponse[0].name).toEqual('MV SHOES')
    expect(facilitiesResponse[0].coordinate.latitude).toEqual(24)
    expect(facilitiesResponse[0].coordinate.longitude).toEqual(100)
  })
})

export const setUpSupplierDoc = async (supplierId: string) => {
  await SupplierModel.create([
    {
      _id: supplierId,
      name: 'COOPERSHOES',
      logoUri: '',
      region: 'AMERICAS',
      contact: {
        name: 'Accaphon  Chudankura',
        email: 'accaphon.c_nk@niceapparelgroup.com',
        telephone: '66-43-387192-5',
        jobTitle: 'Senior Creative Orchestrator',
      },
      affiliationTypes: ['Buyer'],
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
      entity: 1,
      groupId: supplierId,
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
    },
    {
      _id: 'fake id 1',
      name: 'MV SHOES',
      logoUri: '',
      region: 'AMERICAS',
      contact: {
        name: 'Accaphon  Chudankura',
        email: 'accaphon.c_nk@niceapparelgroup.com',
        phone: '66-43-387192-5',
        jobTitle: 'Senior Creative Orchestrator',
      },
      affiliationTypes: ['Supplier'],
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
      groupId: supplierId,
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
    },
  ])
}
