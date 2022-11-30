import { shallow } from 'enzyme'

import Overview from './index'
import ExportOption from '../partners/exportOption'
import GroupCompany from '../groupCompany'
import NotificationBox from '../notificationBox'
import Alert from '../alert'
import PartnersSecColumn from '../partnersSecColumn'
import ItemTitle from '../partners/itemTitle'
import company from '../../__test__/mockData/supplierInfo'
import { facilities } from '../../__test__/mockData/facilities'
import notifications from '../../__test__/mockData/notifications'
import alerts from '../../__test__/mockData/alerts'

const useRouterSpy = jest.spyOn(require('next/router'), 'useRouter')

const useSupplierDataSpy = jest.spyOn(require('../../utils/hooks'), 'useSupplierData')
const useGroupDataSpy = jest.spyOn(require('../../utils/hooks'), 'useGroupData')

const income = {
  netIncome: {
    concreteValue: 100,
    growthRate: 0.3,
  },
  turnover: {
    concreteValue: 100,
    growthRate: 0.3,
  },
  year: 2021,
}

describe('Overview', () => {
  it('should render overview', () => {
    useRouterSpy.mockImplementationOnce(() => ({ query: { id: 'id' } }))
    useSupplierDataSpy.mockImplementationOnce(() => ({
      company,
      facilities,
      income,
      notifications,
      alerts,
    }))
    useGroupDataSpy.mockImplementationOnce(() => company)

    const component = shallow(<Overview />)

    expect(component.find(ItemTitle)).toHaveLength(5)
    expect(component.exists(ExportOption)).toBeTruthy()
    expect(component.exists(GroupCompany)).toBeFalsy()
    expect(component.exists(NotificationBox)).toBeTruthy()
    expect(component.exists(Alert)).toBeTruthy()
    expect(component.exists(PartnersSecColumn)).toBeTruthy()
  })

  it('should render group company', () => {
    useRouterSpy.mockImplementationOnce(() => ({ query: { id: 'id' } }))
    useSupplierDataSpy.mockImplementationOnce(() => ({
      company: { ...company, entity: 0 },
      facilities,
      income,
      notifications,
      alerts,
    }))
    useGroupDataSpy.mockImplementationOnce(() => company)

    const component = shallow(<Overview />)
    expect(component.exists(GroupCompany)).toBeTruthy()
    expect(component.find(ItemTitle)).toHaveLength(3)
  })
})
