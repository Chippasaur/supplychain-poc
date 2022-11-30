import {
  useCompanyData,
  useCustomerData,
  useFinancialRiskCount,
  useNews,
  useNotificationContents,
  useOverallBusinessRiskCounts,
  useSuppliers,
  useUpdateNotification,
  useGroupAndFacilities,
} from './index'
import { fetchCommonData, fetchData, savedUserInfo } from '../api'
import { TrafficLightLevel } from '../../../shared/enum/trafficLightLevel'
import { DAndBLevel } from '../../../shared/enum/dAndBLevel'
import { EntityType } from '../../../shared/enum/entityType'

describe('test hook utils', () => {
  let fetchCommonData: any
  let fetcher: any
  let fetchData: any
  let useRouter: any

  beforeEach(() => {
    savedUserInfo.customerId = '22C3A992CDB'

    fetchCommonData = jest.spyOn(require('../api/index'), 'fetchCommonData')
    fetcher = jest.spyOn(require('../api/index'), 'fetcher')
    fetchData = jest.spyOn(require('../api/index'), 'fetchData')
    useRouter = jest.spyOn(require('next/router'), 'useRouter')
  })

  afterEach(() => {
    fetchCommonData.mockClear()
    fetcher.mockClear()
    fetchData.mockClear()
    useRouter.mockClear()
  })

  it('should use notification contents', () => {
    const notifications = [{ id: '112132', content: 'good good' }]
    fetchCommonData.mockImplementation((key: any) => {
      expect(key).toEqual(`/api/v1/customers/${savedUserInfo.customerId}/notification-contents`)

      return { data: notifications }
    })

    const { data: notificationContents = [] } = useNotificationContents()

    expect(notifications).toEqual(notificationContents)
  })

  it('should use update notification', async () => {
    const notificationId = 'BAD3434112ADD'
    const updateBody = {
      viewerId: 'fake viewer id',
      read: true,
    }
    fetcher.mockImplementation((key: any, config: any) => {
      expect(key).toEqual(`/api/v1/notifications/${notificationId}`)
      expect(config.body).toEqual(JSON.stringify(updateBody))
      expect(config.method).toEqual('PUT')
      return {}
    })

    await useUpdateNotification(notificationId, updateBody)

    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('should use customer data', () => {
    savedUserInfo.email = '12222'
    savedUserInfo.name = '12222'

    fetchData.mockImplementation((key: any) => {
      expect(key).toEqual(`/api/v1/customers/${savedUserInfo.customerId}`)
      return {
        data: {
          customerName: 'Amazon',
          logoUri: '/logos/amazon.png',
          datas: [],
        },
      }
    })

    const customerData = useCustomerData()

    expect(fetchData).toHaveBeenCalled()
    expect(customerData.customerId).toEqual(savedUserInfo.customerId)
  })

  it('should use company data', () => {
    savedUserInfo.email = '12222'
    savedUserInfo.name = '12222'

    const companyId = '3232LJDL323'
    const exceptedCompanyData = {
      customerName: 'Amazon',
      logoUri: '/logos/amazon.png',
      datas: [],
    }

    useRouter.mockImplementation(() => ({ query: { id: companyId } }))
    fetchData.mockImplementation((key: any) => {
      expect(key).toEqual(`/api/v1/customers/${savedUserInfo.customerId}/suppliers/${companyId}`)
      return {
        data: exceptedCompanyData,
      }
    })

    const companyData = useCompanyData()

    expect(fetchData).toHaveBeenCalledTimes(1)
    expect(companyData).toEqual(exceptedCompanyData)
  })

  it('should use suppliers', () => {
    const suppliers = [{ id: '21323assdd' }]
    fetchData.mockImplementation((key: any) => {
      expect(key).toEqual(`/api/v1/customers/${savedUserInfo.customerId}/suppliers`)
      return {
        data: suppliers,
      }
    })

    const response = useSuppliers()

    expect(fetchData).toHaveBeenCalledTimes(1)
    expect(response).toEqual(suppliers)
  })

  it('should use news', () => {
    const news = [{ id: '21323assdd' }]
    fetchData.mockImplementation((key: any) => {
      expect(key).toEqual(`/api/v1/news?customerId=${savedUserInfo.customerId}`)
      return {
        data: news,
      }
    })

    const response = useNews()

    expect(fetchData).toHaveBeenCalledTimes(1)
    expect(response).toEqual(news)
  })

  it('should use financial risk count', () => {
    const riskCount = [
      {
        level: TrafficLightLevel.Safe,
        count: 1231400,
      },
    ]
    fetchData.mockImplementation((key: any) => {
      expect(key).toEqual(`/api/v1/customers/${savedUserInfo.customerId}/financial-risk-counts`)
      return {
        data: riskCount,
      }
    })

    const response = useFinancialRiskCount()

    expect(fetchData).toHaveBeenCalledTimes(1)
    expect(response).toEqual(riskCount)
  })

  it('should use overall business risk counts', () => {
    const riskCounts = [
      {
        level: DAndBLevel.Unavailable,
        count: 302,
      },
    ]
    fetchData.mockImplementation((key: any) => {
      expect(key).toEqual(`/api/v1/customers/${savedUserInfo.customerId}/credit-risk-counts`)
      return {
        data: riskCounts,
      }
    })

    const response = useOverallBusinessRiskCounts()

    expect(fetchData).toHaveBeenCalledTimes(1)
    expect(response).toEqual(riskCounts)
  })

  it('should return group and facilities when entity type is group', () => {
    useRouter.mockImplementation(() => ({ query: { id: 'supplierId' } }))
    fetchData.mockImplementation(() => ({ data: { entity: EntityType.Group } }))
    const facilitiesData = [{ entity: EntityType.Facility }]
    fetchCommonData.mockImplementation(() => ({ data: facilitiesData }))

    const { group, facilities } = useGroupAndFacilities()

    expect(group).toEqual({ entity: EntityType.Group })
    expect(facilities).toEqual(facilitiesData)
  })

  it('should return group and group facilities when entity type is facility', () => {
    useRouter.mockImplementation(() => ({ query: { id: 'supplierId' } }))
    const supplier = { entity: EntityType.Facility, groupId: 'groupId' }
    fetchData.mockImplementation(() => ({ data: supplier }))
    const facilitiesData = [
      { entity: EntityType.Facility, id: 1 },
      { entity: EntityType.Facility, id: 2 },
    ]
    fetchCommonData.mockImplementation(() => ({ data: facilitiesData }))

    const { group, facilities } = useGroupAndFacilities()

    expect(group).toEqual(supplier)
    expect(facilities).toEqual(facilitiesData)
  })

  it('should return null and self facilities when entity type is facility and has no group', () => {
    useRouter.mockImplementation(() => ({ query: { id: 'supplierId' } }))
    const supplier = { entity: EntityType.Facility, groupId: 'supplierId' }
    fetchData.mockImplementation(() => ({ data: supplier }))

    const { group, facilities } = useGroupAndFacilities()

    expect(group).toBeNull()
    expect(facilities).toEqual([supplier])
  })

  it('should return null and self facilities when entity type is facility and group id is illegal', () => {
    useRouter.mockImplementation(() => ({ query: { id: 'supplierId' } }))
    const supplier = { entity: EntityType.Facility, groupId: '' }
    fetchData.mockImplementation(() => ({ data: supplier }))

    const { group, facilities } = useGroupAndFacilities()

    expect(group).toBeNull()
    expect(facilities).toEqual([supplier])
  })
})
