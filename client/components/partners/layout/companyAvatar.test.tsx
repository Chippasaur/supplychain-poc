import { shallow as enzymeRender } from 'enzyme'

import CompanyAvatar from './companyAvatar'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('Company Avatar', () => {
  beforeEach(() => {
    useRouter.mockImplementationOnce(() => ({
      pathname: '/partners/3/test',
    }))
  })
  it('should show corresponding header orange style', () => {
    const component = enzymeRender(<CompanyAvatar name="Lapel Group" />)
    expect(component.find('.avatarDarkOrange').exists()).toBeTruthy()
    expect(component.find('.avatarBlue').exists()).toBeFalsy()
  })
  it('should show corresponding header style', () => {
    const component = enzymeRender(<CompanyAvatar name="Rice" />)
    expect(component.find('.avatarDarkOrange').exists()).toBeFalsy()
    expect(component.find('.avatarBlue').exists()).toBeTruthy()
  })
})
