import { render } from 'enzyme'

import NavigationBar from './index'
import { useCustomerData } from '../../utils/hooks'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const useCustomerDataSpy = jest.spyOn(require('../../utils/hooks'), 'useCustomerData')
const useFetchUserInfoSpy = jest.spyOn(require('../../utils/api'), 'useFetchUserInfo')

describe('<NavigationBar />', () => {
  it('renders basic menus', async () => {
    useRouter.mockImplementationOnce(() => ({
      pathname: '/partners/3/test',
    }))
    const MockPath = '/logoUri'
    useCustomerDataSpy.mockImplementationOnce(() => ({
      logoUri: MockPath,
    }))
    useFetchUserInfoSpy.mockImplementationOnce(() => ({
      name: 'name',
      email: 'email',
      customerId: 'customerId',
    }))
    const component = render(<NavigationBar />)
    expect(component.find('img').last().attr()).toMatchObject({ class: 'MuiAvatar-img', src: '/logoUri' })
    const firstItem = component.find('.item').first()
    expect(firstItem.text()).toContain('Dashboard')
    expect(firstItem.hasClass('active')).toBeFalsy()
    expect(component.find('.item:nth-child(2)').hasClass('active')).toBeTruthy()
  })
})
