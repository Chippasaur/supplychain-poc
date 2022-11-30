import { render, shallow } from 'enzyme'

import TipCard from './index'

describe('<TipCard/>', () => {
  it('should show box layout and border arrow', () => {
    const component = shallow(
      <TipCard>
        <span>test</span>
      </TipCard>,
    )
    expect(component.find('.layout').exists()).toBeTruthy()
    expect(component.find('.border').exists()).toBeTruthy()
    expect(component.find('.arrow').exists()).toBeTruthy()
  })

  it('should show children content', () => {
    const component = render(
      <TipCard>
        <span>test</span>
      </TipCard>,
    )
    const children = component.find('span')
    expect(children.text()).toBe('test')
  })
})
