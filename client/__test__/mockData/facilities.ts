import { GroupAndFacilitiesData } from '../../utils/hooks'
import { EntityType } from '../../../shared/enum/entityType'
import { TrafficLightLevel } from '../../../shared/enum/trafficLightLevel'
import { SupplierCategory } from '../../../shared/enum/category'
import { BuyerResponse } from '../../../shared/response'

export const facilities = [
  {
    id: '60598e8cb82d854309f97f3e',
    region: 'SE ASIA',
    name: 'DEAN SHOES VIETNAM',
    coordinate: { latitude: 10.883, longitude: 106.725998 },
    location: {
      address: 'ROAD NO.3,NHON TRACH 2 INDUSTRIAL ZONE- NHON PHU',
      postalCode: '000000',
      state: 'ÐNG NAI',
      city: 'NHON TRACH DISTRICT',
      region: 'Viet Nam',
    },
  },
  {
    id: '60598e8cb82d854309f97f3f',
    region: 'SE ASIA',
    name: 'FREETREND VN INDUSTRIAL CO.LTD.',
    coordinate: { latitude: 10.8494, longitude: 106.753998 },
    location: {
      address: 'ROAD NO.3,NHON TRACH 2 INDUSTRIAL ZONE- NHON PHU',
      postalCode: '000000',
      state: 'ÐNG NAI',
      city: 'NHON TRACH DISTRICT',
      region: 'Viet Nam',
    },
  },
  {
    id: '60598e8cb82d854309f97f40',
    region: 'N ASIA',
    name: 'LONG FA SHOES INDUSTRIAL HUIZHOU CO., LTD.',
    coordinate: { latitude: 23.149099, longitude: 114.150002 },
    location: {
      address: 'ROAD NO.3,NHON TRACH 2 INDUSTRIAL ZONE- NHON PHU',
      postalCode: '000000',
      state: 'ÐNG NAI',
      city: 'NHON TRACH DISTRICT',
      region: 'Viet Nam',
    },
  },
  {
    id: '60598e8cb82d854309f97f41',
    region: 'N ASIA',
    name: 'LONG YUE SHOES INDUSTRIAL HUI ZHOU CO.,LTD.',
    coordinate: { latitude: 23.1119, longitude: 114.416 },
    location: {
      address: 'ROAD NO.3,NHON TRACH 2 INDUSTRIAL ZONE- NHON PHU',
      postalCode: '000000',
      state: 'ÐNG NAI',
      city: 'NHON TRACH DISTRICT',
      region: 'Viet Nam',
    },
  },
  {
    id: '60598e8cb82d854309f97f42',
    region: 'N ASIA',
    name: 'XINCHANG SHOES CO.,LTD',
    coordinate: { latitude: 24.132299, longitude: 115.712997 },
    location: {
      address: 'ROAD NO.3,NHON TRACH 2 INDUSTRIAL ZONE- NHON PHU',
      postalCode: '000000',
      state: 'ÐNG NAI',
      city: 'NHON TRACH DISTRICT',
      region: 'Viet Nam',
    },
  },
]

export const groupAndFacilities: GroupAndFacilitiesData = {
  group: {
    id: '60598e8cb82d854309f98144',
    tier: 3,
    logoUri: '',
    name: 'ASIAN SOURCING HEADWEAR',
    contact: {
      name: '0',
      telephone: '0',
      email: '0',
      jobTitle: 'Senior Creative Orchestrator',
    },
    category: SupplierCategory.FabricSupplier,
    entity: EntityType.Group,
    groupId: '60598e8cb82d854309f98144',
    coordinate: {
      longitude: 107.025002,
      latitude: 11.028,
    },
    business: {
      businessType: 'dummy type',
      entityType: 'dummy type',
    },
    location: {
      address: 'ROAD NO.3,NHON TRACH 2 INDUSTRIAL ZONE- NHON PHU',
      postalCode: '000000',
      state: 'ÐNG NAI',
      city: 'NHON TRACH DISTRICT',
      region: 'Viet Nam',
    },
    officialContact: {
      telephone: '888-8888-8888',
      officialEmail: 'info@dummy.com',
      websiteUrl: 'http://www.dummy.com',
    },
    registration: {
      registrationName: 'ASIAN SOURCING HEADWEAR',
      registrationNumber: '2236929',
      registrationType: 'dummy type',
    },
    overallStatus: {
      companyStatus: 0,
      sanction: 0,
      ultimateOwners: 'Will Simith',
      beneficialOwners: 'Jane Done',
      revenue: 75278481,
      employeeNum: 10000,
    },
    dAndB: {
      businessRiskLevel: 1,
      rating: 'DC1',
      padex: 19,
      financialStrength: 5,
      compositeCreditAppraisal: 1,
      financialRisk: 0,
      viabilityRating: '14AA',
      viabilityScore: 3,
    },
    higgIndex: {
      selfAssessment: 99,
      verified: 50,
    },
    trafficLight: {
      level: TrafficLightLevel.Safe,
    },
  },
  facilities: [
    {
      id: '60598e8cb82d854309f97f13',
      name: 'GREENTECH HEADGEAR CO., LTD',
      coordinate: {
        latitude: 10.528,
        longitude: 106.525002,
      },
      location: {
        address: 'ROAD NO.3,NHON TRACH 2 INDUSTRIAL ZONE- NHON PHU',
        postalCode: '000000',
        state: 'ÐNG NAI',
        city: 'NHON TRACH DISTRICT',
        region: 'Viet Nam',
      },
    },
    {
      id: '60598e8cb82d854309f97f14',
      name: 'HUAIAN YUANGTONG HEADWEAR MFG CO LTD',
      coordinate: {
        latitude: 33.786098,
        longitude: 119.281998,
      },
      location: {
        address: 'ROAD NO.3,NHON TRACH 2 INDUSTRIAL ZONE- NHON PHU',
        postalCode: '000000',
        state: 'ÐNG NAI',
        city: 'NHON TRACH DISTRICT',
        region: 'Viet Nam',
      },
    },
    {
      id: '60598e8cb82d854309f97f15',
      name: 'JIANGSU ASIAN SOURCING HEADWEAR MFG. CO., LTD',
      coordinate: {
        latitude: 33.596001,
        longitude: 119.110001,
      },
      location: {
        address: 'ROAD NO.3,NHON TRACH 2 INDUSTRIAL ZONE- NHON PHU',
        postalCode: '000000',
        state: 'ÐNG NAI',
        city: 'NHON TRACH DISTRICT',
        region: 'Viet Nam',
      },
    },
  ],
}

export const buildDataResult = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'ASIAN SOURCING HEADWEAR',
        entity: EntityType.Group,
        firstCharacter: 'A',
        id: '60598e8cb82d854309f98144',
        location: 'ROAD NO.3,NHON TRACH 2 INDUSTRIAL ZONE- NHON PHU, NHON TRACH DISTRICT, ÐNG NAI, Viet Nam',
        buyers: ['C & A BUYING GMBH & CO. K', 'ART FX - DC 1016', 'PLATAFORMA EUROPA'],
      },
      geometry: {
        type: 'Point',
        coordinates: [107.025002, 11.028],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'GREENTECH HEADGEAR CO., LTD',
        entity: EntityType.Facility,
        id: '60598e8cb82d854309f97f13',
        location: 'ROAD NO.3,NHON TRACH 2 INDUSTRIAL ZONE- NHON PHU, NHON TRACH DISTRICT, ÐNG NAI, Viet Nam',
        buyers: ['C & A BUYING GMBH & CO. K', 'ART FX - DC 1016', 'PLATAFORMA EUROPA'],
      },
      geometry: {
        type: 'Point',
        coordinates: [106.525002, 10.528],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'HUAIAN YUANGTONG HEADWEAR MFG CO LTD',
        entity: EntityType.Facility,
        id: '60598e8cb82d854309f97f14',
        location: 'ROAD NO.3,NHON TRACH 2 INDUSTRIAL ZONE- NHON PHU, NHON TRACH DISTRICT, ÐNG NAI, Viet Nam',
        buyers: ['C & A BUYING GMBH & CO. K', 'ART FX - DC 1016', 'PLATAFORMA EUROPA'],
      },
      geometry: {
        type: 'Point',
        coordinates: [119.281998, 33.786098],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'JIANGSU ASIAN SOURCING HEADWEAR MFG. CO., LTD',
        entity: EntityType.Facility,
        id: '60598e8cb82d854309f97f15',
        location: 'ROAD NO.3,NHON TRACH 2 INDUSTRIAL ZONE- NHON PHU, NHON TRACH DISTRICT, ÐNG NAI, Viet Nam',
        buyers: ['C & A BUYING GMBH & CO. K', 'ART FX - DC 1016', 'PLATAFORMA EUROPA'],
      },
      geometry: {
        type: 'Point',
        coordinates: [119.110001, 33.596001],
      },
    },
  ],
}

export const buyerList: BuyerResponse[] = [
  {
    id: '60598e8cb82d854309f98144',
    buyers: ['C & A BUYING GMBH & CO. K', 'ART FX - DC 1016', 'PLATAFORMA EUROPA'],
  },
  {
    id: '60598e8cb82d854309f97f13',
    buyers: ['C & A BUYING GMBH & CO. K', 'ART FX - DC 1016', 'PLATAFORMA EUROPA'],
  },
  {
    id: '60598e8cb82d854309f97f14',
    buyers: ['C & A BUYING GMBH & CO. K', 'ART FX - DC 1016', 'PLATAFORMA EUROPA'],
  },
  {
    id: '60598e8cb82d854309f97f15',
    buyers: ['C & A BUYING GMBH & CO. K', 'ART FX - DC 1016', 'PLATAFORMA EUROPA'],
  },
]
