import { AlertType } from './enum/alertType'
import { EntityType } from './enum/entityType'
import { DAndBLevel } from './enum/dAndBLevel'
import { SupplierCategory } from './enum/category'
import { NotificationType } from './enum/notificationType'
import { TrafficLightLevel } from './enum/trafficLightLevel'
import { SupplierTierLevel } from './enum/supplierTierLevel'
import { NotificationContentType } from './enum/notificationContentType'
import { Business, OfficialContact, OverallStatus, Location, Registration, DAndB } from './types'

export interface HealthCheckResponse {
  version: string
  uptime: string
}

export interface NotificationResponse {
  id: string
  supplierId: string
  supplierName: string
  type: NotificationType
  postedAt: Date
  lastUpdatedAt: Date
  read: boolean
}

export interface NotificationContentResponse {
  id: string
  type: NotificationContentType
  supplierId: string
  content: string
  postedAt: Date
  lastUpdatedAt: Date
  read: boolean
}

export interface NewsResponse {
  id: string
  supplierId: string
  title: string
  content: string
  tier: SupplierTierLevel
  postedAt: Date
}

export interface AlertResponse {
  id: string
  content: string
  source: string
  supplierName: string
  level: string
  postedAt: Date
  type: AlertType
  supplierId: string
}

export interface UsersResponse {
  name: string
  email: string
  customerId: string
}

interface Relations {
  source: string
  target: string
}
export interface CustomersResponse {
  id: string
  name: string
  logoUri: string
  relations: Array<Relations>
}

export interface SupplierResponse {
  id: string
  tier: number
  name: string
  logoUri: string
  contact: {
    name: string
    email: string
    telephone: string | undefined
    jobTitle: string
  }
  category: SupplierCategory
  entity: EntityType
  groupId: string
  coordinate: {
    longitude: number
    latitude: number
  }
  business: Business
  location: Location
  officialContact: OfficialContact
  registration: Registration
  overallStatus: OverallStatus
  dAndB: DAndB
  higgIndex: {
    selfAssessment: number
    verified: number
  }
  trafficLight: {
    level: number
  }
}

export interface CustomerSuppliersResponse {
  id: string
  companyName: string
  entity: EntityType
  tier: number
  financialHealth: TrafficLightLevel
  rating: number
  riskLevel: DAndBLevel
  higgTotalScore: number
  category: SupplierCategory
  coordinate: {
    longitude: number
    latitude: number
  }
  logo: string
  location: Location | undefined
  groupId: string | undefined
}

export interface SupplierIncomeStatementResponse {
  supplierId: string
  year: number
  turnover: {
    concreteValue: number
    growthRate: number
  }
  netIncome: {
    concreteValue: number
    growthRate: number
  }
}

export interface FacilityResponse {
  id: string
  name: string
  coordinate: {
    longitude: number
    latitude: number
  }
  location: Location
}

interface SupplierRelation {
  supplierId: string
  name: string
  category: number
  nextSupplierIds: Array<string>
}
export interface PartnersResponse {
  tier: number
  suppliers: Array<SupplierRelation>
}

export interface FinancialRiskCountResponse {
  level: TrafficLightLevel
  count: number
}

export interface CreditRiskCountResponse {
  level: DAndBLevel
  count: number
}

export interface SustainabilityResponse {
  performance: [
    {
      sustainabilityIndex: string
      score: string
    },
  ]
  reportTime: number
}

export interface ShipmentRecord {
  hsCode: string
  hsDescription: string
  buyer: string
  buyerCompanyCode: string
  volume: number
  value: number
}

export interface BuyerResponse {
  id: string
  buyers: Array<string>
}

export interface MockShipmentResponse {
  shipmentDate: Date
  volume: number
}

export interface ShipmentResponse {
  totalShipments: number
  averageValue: number
  shipmentRecords: Array<ShipmentRecord>
}
