import { get, isEmpty } from 'lodash'
import { useRouter } from 'next/router'

import {
  AlertResponse,
  BuyerResponse,
  CustomerSuppliersResponse,
  FacilityResponse,
  SupplierIncomeStatementResponse,
  SupplierResponse,
  ShipmentResponse,
  MockShipmentResponse,
  NotificationResponse,
  NewsResponse,
} from '../../../shared/response'
import { fetchCommonData, fetchData, fetcher, savedUserInfo } from '../api'
import { EntityType } from '../../../shared/enum/entityType'

export const SupplierPreView = {
  id: '',
  tier: 1,
  logoUri: '',
  name: '',
  region: '',
  contact: {
    name: '',
    email: '',
    telephone: '',
  },
  entity: EntityType.Facility,
  groupId: undefined,
  coordinate: {
    longitude: 0,
    latitude: 0,
  },
  business: {
    businessType: '',
    entityType: '',
  },
  location: {
    address: '',
    postalCode: '',
    state: '',
    city: '',
    region: '',
  },
  officialContact: {
    telephone: '',
    officialEmail: '',
    websiteUrl: '',
  },
  registration: {
    registrationName: '',
    registrationNumber: '',
    registrationType: '',
  },
  overallStatus: {
    companyStatus: 0,
    sanction: 0,
    ultimateOwners: '',
    beneficialOwners: '',
    revenue: '',
    employeeNum: '',
  },
}

export const useCustomerData = () => {
  const { data: { logoUri, name: customerName, relations, ...datas } = {} } = fetchData(
    `/api/v1/customers/${savedUserInfo.customerId}`,
  )

  return { ...savedUserInfo, customerName, logoUri, relations, datas }
}

interface SupplierData {
  company: SupplierResponse
  facilities: Array<FacilityResponse>
  income: SupplierIncomeStatementResponse
  news: Array<NewsResponse>
  notifications: Array<NotificationResponse>
  alerts: Array<AlertResponse>
}

export const useCompanyData = (): SupplierResponse => {
  const id = get(useRouter(), 'query.id')

  const { data } = fetchData(`/api/v1/customers/${savedUserInfo.customerId}/suppliers/${id}`)

  return data || SupplierPreView
}

export const useSupplierData = (): SupplierData => {
  const id = get(useRouter(), 'query.id')
  const company = useCompanyData()
  const { data: notifications = [] } = useNotificationContents()
  const { data: alerts = [] } = useAlerts()

  const { data: facilities = [] } = fetchCommonData(`/api/v1/suppliers/${id}/facilities`)
  const { data: income = {} } = fetchCommonData(`/api/v1/suppliers/${id}/income-statements/latest`)

  const { data: news = [] } = fetchCommonData(`/api/v1/news?customerId=${savedUserInfo.customerId}&supplierId=${id}`)
  return {
    company,
    facilities,
    income,
    news,
    notifications,
    alerts,
  }
}

export const useShipmentsData = (): ShipmentResponse => {
  const id = get(useRouter(), 'query.id')

  const { data = { shipmentRecords: [] } } = fetchCommonData(`/api/v1/suppliers/${id}/shipments`)
  return data
}
export const useShipmentsChartData = (): Array<MockShipmentResponse> => {
  const id = get(useRouter(), 'query.id')

  const { data = [] } = fetchCommonData(`/api/v1/suppliers/${id}/mock-shipments`)
  return data
}

export const useSuppliers = (): CustomerSuppliersResponse[] => {
  const { data = [] } = fetchData(`/api/v1/customers/${savedUserInfo.customerId}/suppliers`)

  return data
}

export const useNews = () => {
  const { data = [] } = fetchData(`/api/v1/news?customerId=${savedUserInfo.customerId}`)
  return data
}

export const useFinancialRiskCount = () => {
  const { data = [] } = fetchData(`/api/v1/customers/${savedUserInfo.customerId}/financial-risk-counts`)
  return data
}

export const useOverallBusinessRiskCounts = () => {
  const { data = [] } = fetchData(`/api/v1/customers/${savedUserInfo.customerId}/credit-risk-counts`)
  return data
}

export const useUpdateNotification = async (id: string, body: any) => {
  const config = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
  }
  return await fetcher(`/api/v1/notifications/${id}`, config)
}

export const useSustainability = () => {
  const supplierId = get(useRouter(), 'query.id')
  let uri = `/api/v1/customers/${savedUserInfo.customerId}/sustainability-performance-scores`
  if (supplierId) {
    uri = `/api/v1/customers/${savedUserInfo.customerId}/sustainability-performance-scores?supplierId=${supplierId}`
  }
  const { data } = fetchData(uri)
  return data
}

export interface GroupAndFacilitiesData {
  group: SupplierResponse | null
  facilities: Array<FacilityResponse>
}

export const useGroupAndFacilities = (): GroupAndFacilitiesData => {
  const id = get(useRouter(), 'query.id')
  const supplier = useCompanyData()
  if (supplier.entity === EntityType.Group) {
    const { data: facilities = [] } = fetchCommonData(`/api/v1/suppliers/${id}/facilities`)
    return { group: supplier, facilities }
  }
  if (supplier.entity === EntityType.Facility && !isEmpty(supplier.groupId) && supplier.groupId !== id) {
    const group = useGroupData(supplier.groupId)
    const { data: facilities = [] } = fetchCommonData(`/api/v1/suppliers/${supplier.groupId}/facilities`)
    return { group, facilities }
  }
  return { group: null, facilities: [supplier] }
}

export const useNotificationContents = () => {
  return fetchCommonData(`/api/v1/customers/${savedUserInfo.customerId}/notification-contents`)
}

export const useAlerts = () => {
  return fetchCommonData('/api/v1/alerts')
}

export const useBuyers = (source: string): BuyerResponse[] => {
  const id = get(useRouter(), 'query.id')
  const { data = [] } = fetchCommonData(`/api/v1/suppliers/${id}/buyers?source=${source}`)
  return data
}

export const useGroupData = (groupId: string): SupplierResponse => {
  const { data } = fetchData(`/api/v1/customers/${savedUserInfo.customerId}/suppliers/${groupId}`)
  return data || SupplierPreView
}
