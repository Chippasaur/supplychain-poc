import { keyInterface } from 'swr'

import { fetchData, useFetchUserInfo, savedUserInfo, fetchCommonData } from './index'

describe('test api utils', () => {
  let spiedUseSWR: any

  beforeEach(() => {
    spiedUseSWR = jest.spyOn(require('swr'), 'default')
  })

  afterEach(() => {
    spiedUseSWR.mockClear()
  })

  it('should fetch data info', () => {
    const suppliers = [{ id: '2323daf' }]
    spiedUseSWR.mockImplementation(() => ({ data: suppliers }))

    const { data } = fetchData('/api/v1/customers/1/suppliers')

    expect(spiedUseSWR).toHaveBeenCalledTimes(2)
    expect(data).toEqual(suppliers)
  })

  it('should use fetch user info', () => {
    const customer = { customerId: '323sdsf23123', name: 'Amazon', email: 'kin@amazon' }
    spiedUseSWR.mockImplementation((key: keyInterface) => {
      expect(key).toEqual('/api/v1/users/me')
      return { data: customer }
    })

    const data = useFetchUserInfo()

    expect(spiedUseSWR).toHaveBeenCalledTimes(1)
    expect(data).toEqual(customer)
    expect(savedUserInfo).toEqual(customer)
  })

  it('should fetch common data', () => {
    const exceptedUri = '/api/v1/alerts'
    const alerts = [{ id: '2324llll' }]
    spiedUseSWR.mockImplementation((key: keyInterface) => {
      expect(key).toEqual(exceptedUri)
      return { data: alerts }
    })

    const { data } = fetchCommonData(exceptedUri)

    expect(spiedUseSWR).toHaveBeenCalledTimes(1)
    expect(data).toEqual(alerts)
  })
})
