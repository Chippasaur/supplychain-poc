import {
  createFacilitiesAndGroupsRelations,
  createRelations,
  getFacilityAcceptableIndexes,
  getTier1GroupIdsAndFacilities,
  UsedFacilityIndexMap,
} from '../../../migrations/seeds/customer-data'
import { Supplier } from '../../../migrations/seeds/customer-supplier-data'

const getRandomIntSpy = jest.spyOn(require('../../../migrations/seeds/utils/utils'), 'getRandomInt')

describe('test insert customer data', () => {
  let suppliers: Supplier[] = []
  beforeEach(() => {
    suppliers = [
      {
        _id: 'Tier1Group',
        name: 'A & K DESIGNS, INC.',
        logoUri: '',
        contact: {
          name: 'Dummy',
          email: 'dummy@email.com',
          websiteUrl: 'http://www.dummy.com',
          telephone: '888-8888-8888',
          officialEmail: 'info@dummy.com',
        },
        financialHealth: 4,
        rating: 4,
        category: 0,
        coordinate: {
          latitude: 45.463299,
          longitude: -122.577003,
        },
        location: {
          address: '8564 NE ALDERWOOD ROAD',
          city: 'PORTLAND',
          state: 'OREGON',
          region: 'United States of America',
          postalCode: '97220',
        },
        tier: 2,
        entity: 1,
        groupId: 'Tier1Group',
        business: {
          businessType: 'dummy type',
          entityType: 'dummy type',
        },
        registration: {
          registrationName: 'A & K DESIGNS, INC.',
          registrationNumber: 'dummy number',
          registrationType: 'dummy type',
        },
        overallStatus: {
          companyStatus: 0,
          sanction: 0,
          ultimateOwners: ['Will Simith'],
          beneficialOwners: ['Jane Done'],
          revenue: 75278481,
          employeeNum: 10000,
        },
        buyers: [],
      },
      {
        _id: 'Tier2Group',
        name: 'ZHANGJIAJIE EXCELLENCE SPORT PRODUCTS CO., LTD.',
        logoUri: '',
        contact: {
          name: 'Dummy',
          email: 'dummy@email.com',
          websiteUrl: 'http://www.dummy.com',
          telephone: '888-8888-8888',
          officialEmail: 'info@dummy.com',
        },
        financialHealth: 4,
        rating: 0.5,
        category: 1,
        coordinate: {
          latitude: 29.428801,
          longitude: 111.138,
        },
        location: {
          address: 'BUILDING NO1.2.3 QILONGGANG INDUSTRIAL ZONE',
          city: 'ZHANGJIAJIE',
          state: 'HUNAN',
          region: 'China Mainland',
          postalCode: '427200',
        },
        tier: 2,
        entity: 1,
        groupId: 'Tier2Group',
        business: {
          businessType: 'dummy type',
          entityType: 'dummy type',
        },
        registration: {
          registrationName: 'ZHANGJIAJIE EXCELLENCE SPORT PRODUCTS CO., LTD.',
          registrationNumber: 'dummy number',
          registrationType: 'dummy type',
        },
        overallStatus: {
          companyStatus: 0,
          sanction: 0,
          ultimateOwners: ['Will Simith'],
          beneficialOwners: ['Jane Done'],
          revenue: 75278481,
          employeeNum: 10000,
        },
        buyers: [],
      },
      {
        _id: 'Tier1Facility',
        name: 'ANHUI COSMO SPORTING GOODS COMPANY LIMITED',
        logoUri: '',
        contact: {
          name: 'Dummy',
          email: 'dummy@email.com',
          websiteUrl: 'http://www.dummy.com',
          telephone: '888-8888-8888',
          officialEmail: 'info@dummy.com',
        },
        financialHealth: 4,
        rating: 4,
        category: 0,
        coordinate: {
          latitude: 31.7484,
          longitude: 115.933998,
        },
        location: {
          address: 'ECONOMIC DEVELOPMENT ZONE, JINZHAI COUNTY',
          city: "LU'AN CITY",
          state: 'ANHUI',
          region: 'China Mainland',
          postalCode: '237321',
        },
        tier: 2,
        entity: 0,
        groupId: 'Tier1Group',
        business: {
          businessType: 'dummy type',
          entityType: 'dummy type',
        },
        registration: {
          registrationName: 'ANHUI COSMO SPORTING GOODS COMPANY LIMITED',
          registrationNumber: 'dummy number',
          registrationType: 'dummy type',
        },
        overallStatus: {
          companyStatus: 0,
          sanction: 0,
          ultimateOwners: ['Will Simith'],
          beneficialOwners: ['Jane Done'],
          revenue: 75278481,
          employeeNum: 10000,
        },
        buyers: [],
      },
      {
        _id: 'Tier2Facility',
        name: 'ANIGER CALCADOS SUPRIMENTOS E EMPREENDIMENTOS LTDA',
        logoUri: '',
        contact: {
          name: 'Dummy',
          email: 'dummy@email.com',
          websiteUrl: 'http://www.dummy.com',
          telephone: '888-8888-8888',
          officialEmail: 'info@dummy.com',
        },
        financialHealth: 1,
        rating: 3,
        category: 2,
        coordinate: {
          latitude: -29.6609,
          longitude: -51.028301,
        },
        location: {
          address: 'RUA ARMINDO ELTZ, 51 - QUATRO COLONIAS',
          city: 'CAMPO BOM – RS',
          state: 'RIO GRANDE DO SUL',
          region: 'BRAZIL',
          postalCode: '93700-000',
        },
        tier: 6,
        entity: 0,
        groupId: 'Tier2Group',
        business: {
          businessType: 'dummy type',
          entityType: 'dummy type',
        },
        registration: {
          registrationName: 'ANIGER CALCADOS SUPRIMENTOS E EMPREENDIMENTOS LTDA',
          registrationNumber: 'dummy number',
          registrationType: 'dummy type',
        },
        overallStatus: {
          companyStatus: 0,
          sanction: 0,
          ultimateOwners: ['Will Simith'],
          beneficialOwners: ['Jane Done'],
          revenue: 75278481,
          employeeNum: 10000,
        },
        buyers: [],
      },
    ]
  })

  it('should get empty list given less than 12 facility', () => {
    const { facilitiesRelations, facilitiesGroupsRelations } = createFacilitiesAndGroupsRelations(suppliers.slice(2))

    expect(facilitiesGroupsRelations.length).toEqual(0)
    expect(facilitiesRelations.length).toEqual(0)
  })

  it('should get one facilities relation and one facility group relation given 12 facilities', () => {
    const facilities = suppliers.slice(2)

    const newFacilities = []
    for (let i = 0; i < 6; i++) {
      facilities[0]._id += i
      facilities[0].groupId! += i
      facilities[1]._id += i
      facilities[1].groupId! += i
      newFacilities.push(...facilities)
    }

    const { facilitiesRelations, facilitiesGroupsRelations } = createFacilitiesAndGroupsRelations(newFacilities)

    expect(facilitiesGroupsRelations.length).toEqual(1)
    expect(facilitiesRelations.length).toEqual(1)
  })

  it('should get all tier1 group id and all facilities', () => {
    const { tier1GroupIds, facilities } = getTier1GroupIdsAndFacilities(suppliers)

    expect(tier1GroupIds.length).toEqual(1)
    expect(tier1GroupIds[0]).toEqual('Tier1Group')
    expect(facilities.length).toEqual(2)
    expect(facilities).toEqual(suppliers.slice(2))
  })

  it('should get relations  ', () => {
    const { tier1GroupIds } = getTier1GroupIdsAndFacilities(suppliers)

    const {
      tier1GroupToCustomerRelations,
      tier2GroupToTier1GroupRelations,
      facilityToGroupRelations,
    } = createRelations(suppliers, tier1GroupIds)
    expect(tier1GroupToCustomerRelations.length).toEqual(1)
    expect(tier1GroupToCustomerRelations[0].source).toEqual('Tier1Group')
    expect(tier2GroupToTier1GroupRelations.length).toEqual(1)
    expect(tier2GroupToTier1GroupRelations[0]).toEqual({ source: 'Tier2Group', target: 'Tier1Group' })
    expect(facilityToGroupRelations.length).toEqual(2)
    expect(facilityToGroupRelations[0]).toEqual({ source: 'Tier1Facility', target: 'Tier1Group' })
    expect(facilityToGroupRelations[1]).toEqual({ source: 'Tier2Facility', target: 'Tier2Group' })
  })

  it('should get facility index 0 use once', () => {
    getRandomIntSpy.mockImplementation(() => 0)
    const usedFacilityMaps: UsedFacilityIndexMap[] = []

    const facilityIndex = getFacilityAcceptableIndexes(suppliers.slice(2).length, usedFacilityMaps)

    expect(facilityIndex).toEqual(0)
    expect(usedFacilityMaps[0].facilityIndex).toEqual(0)
    expect(usedFacilityMaps[0].numberOfUse).toEqual(1)
  })

  it('should get facility index 0 use twice', () => {
    getRandomIntSpy.mockImplementation(() => 0)
    const usedFacilityMaps: UsedFacilityIndexMap[] = [
      {
        facilityIndex: 0,
        numberOfUse: 1,
      },
    ]

    const facilityIndex = getFacilityAcceptableIndexes(suppliers.slice(2).length, usedFacilityMaps)

    expect(facilityIndex).toEqual(0)
    expect(usedFacilityMaps[0].facilityIndex).toEqual(0)
    expect(usedFacilityMaps[0].numberOfUse).toEqual(2)
  })
})
