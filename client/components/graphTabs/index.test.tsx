import { shallow } from 'enzyme'

import SliderTabs from '../sliderTabs'
import GraphTabs from './index'
import OverallBusinessRisk from '../overallBusinessRisk'

describe('GraphTabs', () => {
  it('should render tabs and default select overall business risk', () => {
    const component = shallow(<GraphTabs />)
    expect(component.exists(SliderTabs)).toBeTruthy()
    expect(component.exists(OverallBusinessRisk)).toBeTruthy()
  })
})
