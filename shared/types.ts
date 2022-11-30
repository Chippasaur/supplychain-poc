import { CompanyStatus } from './enum/companyStatus'
import { Sanction } from './enum/sanction'
import { DAndBLevel } from './enum/dAndBLevel'
import { FinancialStrength } from './enum/financialStrength'
import { CompositeCreditAppraisal } from './enum/compositeCreditAppraisal'
import { DAndBFinancialRisk } from './enum/dAndBFinancialRisk'

export interface Registration {
  registrationName: string | undefined
  registrationNumber: string | undefined
  registrationType: string | undefined
}

export interface Business {
  businessType: string | undefined
  entityType: string | undefined
}

export interface OfficialContact {
  telephone: string | undefined
  officialEmail: string | undefined
  websiteUrl: string | undefined
}

export interface Location {
  address: string | undefined
  postalCode: string | undefined
  state: string | undefined
  city: string | undefined
  region: string | undefined
}

export interface OverallStatus {
  companyStatus: CompanyStatus | undefined
  sanction: Sanction
  ultimateOwners: string
  beneficialOwners: string
  revenue: number
  employeeNum: number
}

export interface DAndB {
  businessRiskLevel: DAndBLevel
  rating: string
  padex: number
  financialStrength: FinancialStrength
  compositeCreditAppraisal: CompositeCreditAppraisal
  financialRisk: DAndBFinancialRisk
  viabilityRating: string
  viabilityScore: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}
