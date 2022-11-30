import { shallow as enzymeRender } from 'enzyme'

import { CustomerLinearProgress } from './index'

describe('<CustomerLinearProgress/>', () => {
  it('should show four part linear progress', () => {
    const component = enzymeRender(<CustomerLinearProgress level={1} />)
    expect(component.find('.progress').length).toBe(4)
  })

  it('should show high level style', () => {
    const component = enzymeRender(<CustomerLinearProgress level={2} />)
    expect(component.find('.high').exists()).toBeTruthy()
  })

  it('should show nothing when receive negative level', () => {
    const component = enzymeRender(<CustomerLinearProgress level={-1} />)
    expect(component.find('.progress').exists()).toBeFalsy()
  })

  it('should show nothing when level greater than 6', () => {
    const component = enzymeRender(<CustomerLinearProgress level={7} />)
    expect(component.find('.progress').exists()).toBeFalsy()
  })
})
