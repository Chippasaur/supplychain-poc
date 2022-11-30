import { shallow } from 'enzyme'

import NoDataText from './index'

describe('<TipCard/>', () => {
  it('should show no data text', () => {
    const component = shallow(<NoDataText />)
    expect(component.find('.nodata').exists()).toBeTruthy()
    expect(component.find('.nodata').exists()).toBeTruthy()
  })
})
