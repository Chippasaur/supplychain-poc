import { ObjectId } from 'mongodb'
import { filter, find, forEach, get, isEmpty, map, omit, shuffle, isUndefined } from 'lodash'

import {
  generateJobTitle,
  generateRating,
  getRandomDate,
  getRandomDateByUnit,
  getRandomInt,
  getRandomKeyWithWeight,
  getRandomSustainabilityScore,
  mapToCategory,
  readJsonFile,
  removeCommaAtTheEnd,
  sliceArrayAveragely,
} from './utils/utils'
import { newsContentList, newsTitleList } from './fixtures/customer-suppliers-fix-data'
import { CompanyStatus } from '../../../shared/enum/companyStatus'
import { Sanction } from '../../../shared/enum/sanction'
import { FinancialStrength } from '../../../shared/enum/financialStrength'
import { EntityType } from '../../../shared/enum/entityType'
import { TrafficLightLevel } from '../../../shared/enum/trafficLightLevel';
import { NotificationType } from '../../../shared/enum/notificationType'
import { DAndBLevel } from '../../../shared/enum/dAndBLevel'
import { AlertLevel } from '../../../shared/enum/alertLevel'
import { AlertType } from '../../../shared/enum/alertType'
import { PerformanceCategory } from '../../../shared/enum/performanceCategory'

export const customerId = new ObjectId().toHexString()

export interface Supplier {
  _id: string
  name: string
  logoUri: string
  contact: {
    name: string
    email: string | undefined
    telephone: string | undefined
    websiteUrl: string | undefined
    officialEmail: string
  }
  financialHealth: number
  rating: number
  category: number
  coordinate: {
    latitude: number
    longitude: number
  }
  location: {
    address: string | undefined
    city: string | undefined
    state: string | undefined
    region: string | undefined
    postalCode: string | undefined
  }
  tier: number
  entity: number
  groupId?: string
  business: {
    businessType: string | undefined
    entityType: string | undefined
  }
  registration: {
    registrationName: string | undefined
    registrationNumber: string | undefined
    registrationType: string | undefined
  }
  overallStatus: {
    companyStatus: CompanyStatus | undefined
    sanction: Sanction
    ultimateOwners: string[]
    beneficialOwners: string[]
    revenue: number
    employeeNum: number
  }
  buyers: string[]
}

interface SupplierIncomeStatement {
  supplierId: string
  year: number
  turnover: number
  netIncome: number
}

interface News {
  supplierId: string
  duns: string
  categories: string[]
  title: string
  content: string
  referenceUrl: string
  postedAt: Date
}

interface HiggIndex {
  supplierId: string
  verified: number
  selfAssessment: number
  sustainability: {
    ems: number
    energyEmissions: number
    waterUse: number
    wasteWaterEffluent: number
    emissionToAir: number
    wasteManagement: number
    chemicals: number
  }
  reportTime: number
}

interface Notification {
  supplierId: string
  supplierName: string
  type: NotificationType
  postedAt: Date
  read?: boolean
}

interface DAndBIndex {
  supplierId: string
  level: DAndBLevel
  rating: string
  padex: number
  financialStrength: number
  compositeCreditAppraisal: number
  financialRisk: number
  viabilityRating: string
  viabilityScore: number
}

interface TrafficLightIndex {
  supplierId: string
  level: TrafficLightLevel
}

interface SupplierIndexes {
  dAndBIndexes: DAndBIndex[]
  higgIndexes: HiggIndex[]
  trafficLightIndexes: TrafficLightIndex[]
}

interface Alert {
  supplierId: string
  supplierName: string
  content: string
  source: string
  postedAt: Date
  level: AlertLevel
  type: AlertType
}

export const user = {
  name: 'Matt',
  email: 'example@example.com',
  customerId: customerId,
}

export const generateBaseSuppliers = () => {
  const customerSuppliersData = readJsonFile('./server/migrations/seeds/supplier-data-0421.json')
  const customerSuppliersDAndBData = readJsonFile('./server/migrations/seeds/supplier-dnb-data-0423.json')

  return map(customerSuppliersData, supplier => {
    const dAndBData = find(customerSuppliersDAndBData, {name: supplier.name})
    return {
      _id: new ObjectId().toHexString(),
      name: supplier.name,
      logoUri: '',
      contact: {
        name: isEmpty(supplier.contactName) ? 'Dummy' : supplier.contactName,
        jobTitle: generateJobTitle(),
        officialEmail: isEmpty(dAndBData?.officialEmail) ? undefined : dAndBData.officialEmail,
        email: isEmpty(supplier.email) ? 'dummy@email.com' : supplier.email,
        telephone: isEmpty(dAndBData?.telephone) ? undefined : dAndBData.telephone,
        websiteUrl: isEmpty(dAndBData?.websiteUrl) ? undefined : dAndBData.websiteUrl,
      },
      financialHealth: getRandomInt(0, 4),
      rating: supplier.rating ? Number(supplier.rating) : generateRating(),
      category: mapToCategory(supplier.category),
      coordinate: {
        latitude: Number(supplier.lat),
        longitude: Number(supplier.lon),
      },
      location: {
        address: isEmpty(dAndBData?.address) ? undefined : removeCommaAtTheEnd(dAndBData.address),
        city: isEmpty(dAndBData?.city) ? undefined : dAndBData.city,
        state: isEmpty(dAndBData?.state) ? undefined : dAndBData.state,
        region: isEmpty(dAndBData?.region) ? undefined : dAndBData.region,
        postalCode: isEmpty(dAndBData?.postalCode) ? undefined : dAndBData.postalCode,
      },
      tier: getRandomInt(1, 6),
      entity: supplier.entity === 'Facility' ? EntityType.Facility : EntityType.Group,
      groupId: supplier.supplierName,
      business: {
        businessType: isEmpty(dAndBData?.businessType) ? undefined : dAndBData.businessType,
        entityType: isEmpty(dAndBData?.entityType) ? undefined : dAndBData.entityType,
      },
      registration: {
        registrationName: isEmpty(dAndBData?.registrationName) ? undefined : dAndBData.registrationName,
        registrationNumber: isEmpty(dAndBData?.registrationNumber) ? undefined : dAndBData.registrationNumber,
        registrationType: isEmpty(dAndBData?.registrationType) ? undefined : dAndBData.registrationType,
      },
      overallStatus: {
        companyStatus: isUndefined(dAndBData?.companyStatus) ? undefined : dAndBData.companyStatus,
        sanction: Sanction.Passed,
        ultimateOwners: ['Will Simith'],
        beneficialOwners: ['Jane Done'],
        revenue: 75278481,
        employeeNum: 10000,
      },
      buyers: [],
    }
  })
}

export const generateSuppliers = (suppliers: Supplier[]) => {
  return map(suppliers, supplier => omit(supplier, ['tier', 'financialHealth']))
}

export const generateSupplierIncomeStatements = (suppliers: Supplier[]) => {
  const supplierIncomeStatements: SupplierIncomeStatement[] = []
  suppliers.forEach(({ _id }) => {
    supplierIncomeStatements.push(
      {
        supplierId: _id,
        year: 2020,
        turnover: getRandomInt(1000000, 100000000),
        netIncome: getRandomInt(1000, 1000000),
      },
      {
        supplierId: _id,
        year: 2019,
        turnover: getRandomInt(1000000, 100000000),
        netIncome: getRandomInt(1000, 1000000),
      },
    )
  })
  return supplierIncomeStatements
}

export const generateNews = (suppliers: Supplier[]) => {
  const news: News[] = []
  const slicedNewsTitleList = sliceArrayAveragely(newsTitleList, 3)
  const slicedNewsContentList = sliceArrayAveragely(newsContentList, 3)
  const categories = ['Executive Announcement', 'Bankruptcy', 'Executive Quote', 'Management Change', 'General Industry']
  suppliers.forEach(({ _id }) => {
    for (let i = 0; i < 3; i++) {
      const oneMonth = 1000 * 60 * 60 * 24 * 30
      const date = new Date(+getRandomDateByUnit('year') - oneMonth)

      news.push({
        supplierId: _id,
        duns: _id.slice(15),
        categories: shuffle(categories).slice(getRandomInt(0, 4)),
        title: slicedNewsTitleList[i][getRandomInt(0, slicedNewsTitleList[i].length - 1)],
        content: slicedNewsContentList[i][getRandomInt(0, slicedNewsContentList[i].length - 1)],
        referenceUrl: 'https://www.somewebsite.com',
        postedAt: date,
      })
    }
  })

  return news
}

const trafficLightMap= {
  "Safe": TrafficLightLevel.Safe,
  "Elevated risk": TrafficLightLevel.ElevatedRisk,
  "Average risk": TrafficLightLevel.AverageRisk,
  "Average Risk": TrafficLightLevel.AverageRisk,
  "Caution": TrafficLightLevel.Caution,
}

interface trafficLightDataSchema {
  name: string
  Result: "Safe" | "Elevated risk" | "Average risk" | "Average Risk" | "Caution"
}

export const generateTrafficLightIndexes = (suppliers: Supplier[]) => {
  const trafficLightJson = readJsonFile('./server/migrations/seeds/traffic-light-real-data.json')
  const trafficLightIndexes: { supplierId: string; level: TrafficLightLevel }[] = []
  suppliers.forEach(supplier => {
    const trafficLightData: trafficLightDataSchema = find(trafficLightJson, {name: supplier.name})
    const trafficLightLevel = trafficLightData ? trafficLightMap[trafficLightData.Result]: TrafficLightLevel.Unavailable
    trafficLightIndexes.push({
      supplierId: supplier._id,
      level: trafficLightLevel,
    })
  })
  return trafficLightIndexes
}

export const generateDAndBIndexesIndexes = (suppliers: Supplier[]) => {
  const riskLevelWeights = { 0: 0.45, 1: 0.45, 2: 0.001, 3: 0.001, 4: 0.07, 5: 0.014, 6: 0.014 }
  return map(suppliers, ({ _id }) => {
    const financialStrength = getRandomInt(0, 14)
    const compositeCreditAppraisal = getRandomInt(1, 4)
    return {
      supplierId: _id,
      level: getRandomKeyWithWeight(riskLevelWeights),
      rating: `${FinancialStrength[financialStrength]}${compositeCreditAppraisal}`,
      padex: getRandomInt(0, 100),
      financialStrength,
      compositeCreditAppraisal,
      financialRisk: getRandomInt(0, 3),
      viabilityRating: '14AA',
      viabilityScore: getRandomInt(1, 9),
    }
  })
}

export const generateHiggIndexes = (suppliers: Supplier[]) => {
  const higgIndexes: HiggIndex[] = []
  const filterSuppliers = filter(suppliers, { entity: EntityType.Facility })
  const currentYear = new Date().getFullYear()
  filterSuppliers.forEach(({ _id }) => {
    higgIndexes.push(generateHiggIndex(_id, currentYear), generateHiggIndex(_id, currentYear - 1))
  })
  return higgIndexes
}

const generateHiggIndex = (supplierId: string, reportTime: number) => {
  return {
    supplierId: supplierId,
    selfAssessment: getRandomInt(0, 100),
    verified: getRandomInt(0, 100),
    sustainability: {
      ems: getRandomSustainabilityScore(),
      energyEmissions: getRandomSustainabilityScore(),
      waterUse: getRandomSustainabilityScore(),
      wasteWaterEffluent: getRandomSustainabilityScore(),
      emissionToAir: getRandomSustainabilityScore(),
      wasteManagement: getRandomSustainabilityScore(),
      chemicals: getRandomSustainabilityScore(),
    },
    reportTime: reportTime,
  }
}

export const matchGroup = (suppliers: Supplier[]) => {
  const facilities: Supplier[] = suppliers.filter(supplier => supplier.entity === 0)
  const groups: Supplier[] = suppliers.filter(supplier => supplier.entity === 1)

  let isolatedDataNum = 0
  facilities.forEach(facility => {
    const groupName: string | undefined = facility.groupId

    const group = groups.find(supplier => supplier.name === groupName)

    if (group) {
      facility.groupId = group._id
    } else {
      facility.groupId = undefined
      isolatedDataNum += 1
    }
  })

  console.log('isolated data number ', isolatedDataNum)

  groups.forEach(group => {
    group.groupId = group._id
  })
}

export const generateNotifications = (suppliers: Supplier[]) => {
  return [
    ...generateNotificationsByType(suppliers, NotificationType.SubmitSurvey),
    ...generateNotificationsByType(suppliers, NotificationType.UploadCertification),
    ...generateNotificationsByType(suppliers, NotificationType.JoinedNetwork),
    ...generateNotificationsByType(suppliers, NotificationType.JoinedSerai),
  ]
}

const generateNotificationsByType = (suppliers: Supplier[], type: NotificationType) => {
  const notifications: Notification[] = []
  for (let i = 0; i < 10; i++) {
    const supplier = suppliers[getRandomInt(0, suppliers.length - 1)]
    notifications.push({
      supplierId: supplier._id,
      supplierName: supplier.name,
      type,
      postedAt: getRandomDate(),
    })
  }
  return notifications
}

export const generateAlerts = (suppliers: Supplier[], { dAndBIndexes, higgIndexes, trafficLightIndexes }: SupplierIndexes ) => {
  return [
    ...generateDAndBAlerts(suppliers, dAndBIndexes),
    ...generateHiggAlerts(suppliers, higgIndexes),
    ...generateEHAlerts(suppliers, trafficLightIndexes),
    ...generateOARAlerts(suppliers)
  ]
}

const dAndBLevelMap = {
  [DAndBLevel.Low]: 'Low',
  [DAndBLevel.Moderate]: 'Moderate',
  [DAndBLevel.High]: 'High',
  [DAndBLevel.Severe]: 'Severe',
  [DAndBLevel.OutOfBusiness]: 'Out of Business',
  [DAndBLevel.Undetermined]: 'Undetermined',
  [DAndBLevel.Unavailable]: 'Unavailable',
}

const generateDAndBAlerts = (suppliers: Supplier[], dAndBIndexes: DAndBIndex[]) => {
  const alerts: Alert[] = []
  for(let i = 0; i < 3; i++) {
    const supplier = suppliers[getRandomInt(0, suppliers.length - 1)]
    const dAndBIndexLevel: DAndBLevel = Number(get(find(dAndBIndexes, {supplierId: supplier._id}), 'level'))
    let prevLevel: DAndBLevel = getRandomInt(0, 5)
    prevLevel = prevLevel === dAndBIndexLevel ? prevLevel + 1 : prevLevel
    alerts.push({
      supplierId: supplier._id,
      supplierName: supplier.name,
      content: `<strong>${supplier.name}</strong> overall business risk has changed from ${dAndBLevelMap[prevLevel]} to ${dAndBLevelMap[dAndBIndexLevel]}`,
      source: 'D&B',
      postedAt: getRandomDate(),
      level: dAndBIndexLevel > prevLevel ? AlertLevel.HIGH : AlertLevel.MEDIUM,
      type: AlertType.OverallBusinessRiskChanged
    })
  }
  return alerts
}

const generateOARAlerts = (suppliers: Supplier[]) => {
  const alerts: Alert[] = []
  const facilities = suppliers.filter(supplier => supplier.entity === EntityType.Facility && !isEmpty(supplier.buyers) && !isEmpty(supplier.groupId))
  for(let i = 0; i < 3; i++) {
    const supplier = facilities[getRandomInt(0, facilities.length - 1)]
    alerts.push({
      supplierId: supplier.groupId!,
      supplierName: supplier.name,
      content: `<strong>${supplier.name}</strong> has been added to the list of facilities in your supply chain`,
      source: 'OAR',
      postedAt: getRandomDate(),
      level: AlertLevel.MEDIUM,
      type: AlertType.SupplyChainChanged
    })
  }

  for(let i = 0; i < 3; i++) {
    const supplier = facilities[getRandomInt(0, facilities.length - 1)]
    alerts.push({
      supplierId: supplier.groupId!,
      supplierName: supplier.name,
      content: `<strong>${supplier.name}</strong> is now partners with ${supplier.buyers[0]}`,
      source: 'OAR',
      postedAt: getRandomDate(),
      level: AlertLevel.LOW,
      type: AlertType.ContributorChanged
    })
  }
  return alerts
}

const generateHiggAlerts = (suppliers: Supplier[], higgIndexes: HiggIndex[]) => {
  const alerts: Alert[] = []
  const facilities = suppliers.filter(supplier => supplier.entity === EntityType.Facility)

  for (let i = 0; i < 3; i++) {
    const supplier = facilities[getRandomInt(0, facilities.length - 1)]
    const currentYear = new Date().getFullYear()
    const higgIndex = find(higgIndexes, {supplierId: supplier._id, reportTime: currentYear})
    const prevHiggIndex = find(higgIndexes, {supplierId: supplier._id, reportTime: currentYear - 1})
    const higgIndexTotalScore = (Number(get(higgIndex, 'sustainability.emissionToAir'))
      + Number(get(higgIndex, 'sustainability.energyEmissions'))
      + Number(get(higgIndex, 'sustainability.waterUse'))
      + Number(get(higgIndex, 'sustainability.wasteWaterEffluent'))
      + Number(get(higgIndex, 'sustainability.wasteManagement'))
      + Number(get(higgIndex, 'sustainability.ems'))
      + Number(get(higgIndex, 'sustainability.chemicals'))) / 7
    const prevScore = (Number(get(prevHiggIndex, 'sustainability.emissionToAir'))
      + Number(get(prevHiggIndex, 'sustainability.energyEmissions'))
      + Number(get(prevHiggIndex, 'sustainability.waterUse'))
      + Number(get(prevHiggIndex, 'sustainability.wasteWaterEffluent'))
      + Number(get(prevHiggIndex, 'sustainability.wasteManagement'))
      + Number(get(prevHiggIndex, 'sustainability.ems'))
      + Number(get(prevHiggIndex, 'sustainability.chemicals'))) / 7
    const operation = prevScore > higgIndexTotalScore ? 'decreased' : 'increased'
    alerts.push({
      supplierId: supplier._id,
      supplierName: supplier.name,
      content: `The total FEM score for <strong>${supplier.name}</strong> has ${operation} from ${prevScore.toFixed(1)} to ${higgIndexTotalScore.toFixed(1)}`,
      source: 'Higg',
      postedAt: getRandomDate(),
      level: prevScore > higgIndexTotalScore ? AlertLevel.MEDIUM : AlertLevel.LOW,
      type: AlertType.FEMScoreChanged
    })
  }

  const scoreMaps = [
    {
      alertType: AlertType.EmissionsToAirScoreChanged,
      scoreKey: PerformanceCategory.emissionsToAir,
      contentPrefix: 'The Emissions to Air',
    },
    {
      alertType: AlertType.EnergyAndGHGEmissionsScoreChanged,
      scoreKey: PerformanceCategory.energyAndGHGEmissions,
      contentPrefix: 'The Energy Use & Green House Gas Emissions',
    },
    {
      alertType: AlertType.WaterUseScoreChanged,
      scoreKey: PerformanceCategory.waterUse,
      contentPrefix: 'The Water Use',
    },
    {
      alertType: AlertType.WasteWaterScoreChanged,
      scoreKey: PerformanceCategory.wastewaterEffluent,
      contentPrefix: 'The Waste Water',
    },
    {
      alertType: AlertType.WasteScoreChanged,
      scoreKey: PerformanceCategory.wasteManagement,
      contentPrefix: 'The Waste',
    },
    {
      alertType: AlertType.EMSScoreChanged,
      scoreKey: PerformanceCategory.ems,
      contentPrefix: 'The Environmental Management System',
    },
    {
      alertType: AlertType.ChemicalManagementScoreChanged,
      scoreKey: PerformanceCategory.chemicals,
      contentPrefix: 'The Chemical Management',
    },
  ]

  forEach(scoreMaps, ({ alertType, scoreKey, contentPrefix }) => {
    for (let i = 0; i < 3; i++) {
      const supplier = facilities[getRandomInt(0, facilities.length - 1)]
      const currentYear = new Date().getFullYear()
      const higgIndexScore = Number(get(find(higgIndexes, {supplierId: supplier._id, reportTime: currentYear}), `sustainability.${scoreKey}`))
      const prevScore = Number(get(find(higgIndexes, {supplierId: supplier._id, reportTime: currentYear - 1}), `sustainability.${scoreKey}`))
      const operation = prevScore > higgIndexScore ? 'decreased' : 'increased'
      alerts.push({
        supplierId: supplier._id,
        supplierName: supplier.name,
        content: `${contentPrefix} score for <strong>${supplier.name}</strong> has ${operation} from ${prevScore.toFixed(1)} to ${higgIndexScore.toFixed(1)}`,
        source: 'Higg',
        postedAt: getRandomDate(),
        level: prevScore > higgIndexScore ? AlertLevel.MEDIUM : AlertLevel.LOW,
        type: alertType
      })
    }
  })
  return alerts
}

const trafficLightString = {
  [TrafficLightLevel.Safe]: 'Safe',
  [TrafficLightLevel.AverageRisk]: 'Average Risk',
  [TrafficLightLevel.ElevatedRisk]: 'Elevated Risk',
  [TrafficLightLevel.Caution]: 'Caution',
  [TrafficLightLevel.Unavailable]: 'Data Unavailable',
}

const generateEHAlerts = (suppliers: Supplier[], trafficLightIndexes: TrafficLightIndex[]) => {
  const alerts: Alert[] = []
  for(let i = 0; i < 3; i++) {
    const supplier = suppliers[getRandomInt(0, suppliers.length - 1)]
    const trafficLightLevel: TrafficLightLevel = Number(get(find(trafficLightIndexes, {supplierId: supplier._id}), 'level'))
    let prevLevel: TrafficLightLevel = getRandomInt(0, 3)
    prevLevel = prevLevel === trafficLightLevel ? prevLevel + 1 : prevLevel
    alerts.push({
      supplierId: supplier._id,
      supplierName: supplier.name,
      content: `The credit rating for <strong>${supplier.name}</strong> has changed from ${trafficLightString[prevLevel]} to ${trafficLightString[trafficLightLevel]}`,
      source: 'TrafficLight',
      postedAt: getRandomDate(),
      level: trafficLightLevel > prevLevel ? AlertLevel.HIGH : AlertLevel.MEDIUM,
      type: AlertType.CreditScoreChanged
    })
  }

  return alerts
}
