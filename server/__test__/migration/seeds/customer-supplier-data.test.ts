import {
  generateBaseSuppliers,
  generateDAndBIndexesIndexes,
  generateHiggIndexes,
  generateNews,
  generateSupplierIncomeStatements,
  generateSuppliers,
  generateTrafficLightIndexes,
  generateNotifications,
  Supplier,
  matchGroup,
  generateAlerts,
} from '../../../migrations/seeds/customer-supplier-data'
import { TrafficLightLevel } from '../../../../shared/enum/trafficLightLevel'
import { getRandomInt } from '../../../migrations/seeds/utils/utils'
import { NotificationType } from '../../../../shared/enum/notificationType'
import { EntityType } from '../../../../shared/enum/entityType'

const testData = [
  {
    name: 'A & K DESIGNS, INC.',
    logoUrl: '',
    region: 'United States of America',
    contactName: '',
    email: '',
    phone: '',
    relationshipType: '',
    financialHealth: '2',
    rating: '3.5',
    riskLevel: '2',
    tier: '2',
    address: '8564 NE ALDERWOOD ROAD',
    city: 'OREGON',
    state: 'AMERICAS',
    lat: '45.463299',
    lon: '-122.577003',
    entity: 'Facility',
    supplierName: 'ACODE SPORTING GOODS CO., LTD',
    category: 'Manufacturer',
  },
  {
    name: 'A. FIRST VINA CO. LTD.',
    logoUrl: '',
    region: 'Viet Nam',
    contactName: '',
    email: '',
    phone: '',
    relationshipType: '',
    financialHealth: '1',
    rating: '4',
    riskLevel: '2',
    tier: '1',
    address: 'TAM PHUOC INDUSTRIAL ZONE',
    city: 'ÐNG NAI',
    state: 'SE ASIA',
    lat: '10.861900',
    lon: '106.933998',
    entity: 'Facility',
    supplierName: 'A. FIRST VINA CO. LTD.',
    category: 'Manufacturer',
  },
  {
    name: 'ACODE SPORTING GOODS CO., LTD',
    logoUrl: '',
    region: 'Viet Nam',
    contactName: '',
    email: '',
    phone: '',
    relationshipType: '',
    financialHealth: '2',
    rating: '3',
    riskLevel: '3',
    tier: '6',
    address: '32 VSIIP-A DUONG31',
    city: 'BÌNH DUONG',
    state: 'SE ASIA',
    lat: '11.057700',
    lon: '106.727997',
    entity: 'Group',
    supplierName: 'Group',
    category: 'Manufacturer',
  },
  {
    name: 'ADORA FOOTWEAR LIMITED',
    logoUrl: '',
    region: 'Viet Nam',
    contactName: '',
    email: '',
    phone: '',
    relationshipType: '',
    financialHealth: '3',
    rating: '5',
    riskLevel: '1',
    tier: '2',
    address: 'TAM DIEP INDUSTRY ZONE',
    city: 'NINH BÌNH',
    state: 'SE ASIA',
    lat: '20.160500',
    lon: '105.809998',
    entity: 'Group',
    supplierName: 'Group',
    category: 'Manufacturer',
  },
  {
    name: 'AJARA 1',
    logoUrl: '',
    region: 'GEORGIA',
    contactName: '',
    email: '',
    phone: '',
    relationshipType: '',
    financialHealth: '2',
    rating: '4.5',
    riskLevel: '1',
    tier: '1',
    address: 'BOBOKVATI STREET 14, BOBOKVATI VILLAGE',
    city: 'AJARIA',
    state: 'EMEA',
    lat: '41.793301',
    lon: '41.767101',
    entity: 'Group',
    supplierName: 'Group',
    category: 'Manufacturer',
  },
  {
    name: 'A. FIRST VINA CO. LTD.',
    logoUrl: '',
    region: 'Viet Nam',
    contactName: '',
    email: '',
    phone: '',
    relationshipType: '',
    financialHealth: '1',
    rating: '4',
    riskLevel: '2',
    tier: '1',
    address: 'TAM PHUOC INDUSTRIAL ZONE',
    city: 'ÐNG NAI',
    state: 'SE ASIA',
    lat: '10.891900',
    lon: '106.963998',
    entity: 'Group',
    supplierName: 'Group',
    category: 'Manufacturer',
  },
]

const testTrafficLightData = [
  { name: 'AJARA 1', Result: 'Safe' },
  { name: 'mock', Result: 'Elevated risk' },
  { name: 'mock2', Result: 'Safe' },
]

const readJsonFileSpy = jest.spyOn(require('../../../migrations/seeds/utils/utils'), 'readJsonFile')
const getRandomIntSpy = jest.spyOn(require('../../../migrations/seeds/utils/utils'), 'getRandomInt')
const getRandomSustainabilityScoreSpy = jest.spyOn(
  require('../../../migrations/seeds/utils/utils'),
  'getRandomSustainabilityScore',
)
const getRandomKeyWithWeightSpy = jest.spyOn(require('../../../migrations/seeds/utils/utils'), 'getRandomKeyWithWeight')

describe('test inert data', () => {
  let baseSuppliers: Supplier[] = []
  beforeEach(() => {
    readJsonFileSpy.mockImplementation(() => testData)
    baseSuppliers = generateBaseSuppliers()
  })
  it('should return base supplier data', () => {
    expect(baseSuppliers).toHaveLength(6)
  })

  it('should return suppliers without tier', () => {
    const suppliers = generateSuppliers(baseSuppliers)
    expect(suppliers).toHaveLength(6)
    expect(suppliers[0]).not.toHaveProperty('tier')
  })

  it('should return 10 income statements', () => {
    const incomeStatements = generateSupplierIncomeStatements(baseSuppliers)
    expect(incomeStatements).toHaveLength(12)
    expect(incomeStatements[0]).toMatchObject({ year: 2020 })
    expect(incomeStatements[1]).toMatchObject({ year: 2019 })
  })

  it('should return 15 news', () => {
    getRandomIntSpy.mockImplementation(() => 0)
    const news = generateNews(baseSuppliers)
    expect(news).toHaveLength(18)
    expect(news[0]).toMatchObject({
      supplierId: baseSuppliers[0]._id,
      duns: baseSuppliers[0]._id.slice(15),
      title: 'Which fashion jobs are in demand right now?',
      content:
        'Brands are not utilising the potential of regular brand audits enough. The luxury experience has test and for what hello then',
      referenceUrl: 'https://www.somewebsite.com',
    })
  })

  it('should return 6 traffic light indexes', () => {
    readJsonFileSpy.mockImplementation(() => testTrafficLightData)
    const trafficLightIndexes = generateTrafficLightIndexes(baseSuppliers)
    expect(trafficLightIndexes).toHaveLength(6)
    expect(trafficLightIndexes[0]).toEqual({
      supplierId: baseSuppliers[0]._id,
      level: TrafficLightLevel.Unavailable,
    })
    expect(trafficLightIndexes[4]).toEqual({
      supplierId: baseSuppliers[4]._id,
      level: TrafficLightLevel.Safe,
    })
  })

  it('should return 5 DAndB indexes', () => {
    getRandomKeyWithWeightSpy.mockImplementation(() => 4)
    getRandomIntSpy.mockImplementation(() => 1)
    const dAndBIndexes = generateDAndBIndexesIndexes(baseSuppliers)
    expect(dAndBIndexes).toHaveLength(6)
    expect(dAndBIndexes[0]).toEqual({
      supplierId: baseSuppliers[0]._id,
      level: 4,
      rating: 'GG1',
      padex: 1,
      financialStrength: 1,
      compositeCreditAppraisal: 1,
      financialRisk: 1,
      viabilityRating: '14AA',
      viabilityScore: 1,
    })
  })

  it('should return 10 higg indexes', () => {
    getRandomIntSpy.mockImplementation(() => 80)
    getRandomSustainabilityScoreSpy.mockImplementation(() => 70)
    const higgIndexes = generateHiggIndexes(baseSuppliers)
    expect(higgIndexes).toHaveLength(4)
    expect(higgIndexes[0]).toMatchObject({
      supplierId: baseSuppliers[0]._id,
      selfAssessment: 80,
      verified: 80,
      sustainability: {
        ems: 70,
        energyEmissions: 70,
        waterUse: 70,
        wasteWaterEffluent: 70,
        emissionToAir: 70,
        wasteManagement: 70,
        chemicals: 70,
      },
    })
  })

  it('should match correct Group', () => {
    matchGroup(baseSuppliers)
    expect(baseSuppliers[0].groupId).toEqual(baseSuppliers[2]._id)
    expect(baseSuppliers[1].groupId).toEqual(baseSuppliers[5]._id)
    expect(baseSuppliers[2].groupId).toEqual(baseSuppliers[2]._id)
    expect(baseSuppliers[3].groupId).toEqual(baseSuppliers[3]._id)
    expect(baseSuppliers[4].groupId).toEqual(baseSuppliers[4]._id)
  })

  it('should generate 40 notifications', () => {
    getRandomIntSpy.mockImplementation(() => 2)
    const notifications = generateNotifications(baseSuppliers)
    expect(notifications).toHaveLength(40)
    const notification = notifications[0]
    expect(notification.supplierId).toBe(baseSuppliers[2]._id)
    expect(notification.type).toBe(NotificationType.SubmitSurvey)
  })

  it('should generate 36 alerts', () => {
    matchGroup(baseSuppliers)
    const suppliers = baseSuppliers.map(supplier => ({
      ...supplier,
      entity: EntityType.Facility,
      buyers: ['Buyer Name'],
    }))
    const dAndBIndexes = generateDAndBIndexesIndexes(baseSuppliers)
    const higgIndexes = generateHiggIndexes(baseSuppliers)
    const trafficLightIndexes = generateTrafficLightIndexes(baseSuppliers)
    const alerts = generateAlerts(suppliers, {
      dAndBIndexes,
      higgIndexes,
      trafficLightIndexes,
    })

    expect(alerts).toHaveLength(36)
  })
})
