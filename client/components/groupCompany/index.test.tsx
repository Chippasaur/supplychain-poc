import { shallow } from 'enzyme'

import { SupplierCategory } from '../../../shared/enum/category'
import GroupCompany from './index'

const props = {
  groupId: '60640ffcc9520ee74ecf2fa1',
  name: 'HONG FU',
  category: SupplierCategory.Manufacturer,
  location: {
    address: 'TAM DIEP INDUSTRY ZONE',
    postalCode: '000000',
    state: 'NINH BÌNH',
    city: 'NINH BINH PROVINCE',
    region: 'Viet Nam',
  },
}

describe('<GroupCompany/>', () => {
  it('should show company avatar and company name', () => {
    const component = shallow(<GroupCompany {...props} />)
    expect(component.find('.avatar').exists()).toBeTruthy()
    expect(component.find('.name').children().text()).toBe('HONG FU')
  })

  it('should show location and category', () => {
    const component = shallow(<GroupCompany {...props} />)
    expect(component.find('.location').childAt(1).text()).toBe(
      'TAM DIEP INDUSTRY ZONE, NINH BINH PROVINCE, NINH BÌNH, Viet Nam',
    )
    expect(component.find('.category').childAt(1).text()).toBe('Manufacturer')
    expect(component.find('.manufacturer').exists()).toBeTruthy()
  })

  it('should show company label and view in detail label', () => {
    const component = shallow(<GroupCompany {...props} />)
    expect(component.find('.company').text()).toBe('Group Company')
    expect(component.find('.view').text()).toBe('View in detail')
  })
})
