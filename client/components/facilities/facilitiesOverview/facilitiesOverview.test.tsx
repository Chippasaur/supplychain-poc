import { render } from 'enzyme'

import FacilitiesOverview from './facilitiesOverview'
import { facilities } from '../../../__test__/mockData/facilities'

describe('facilitiesOverview test', () => {
  it('should be able to show facilities overview', () => {
    const component = render(<FacilitiesOverview facilities={facilities} />)

    expect(component.find('.number').text()).toBe('5')
    expect(component.find('.locationsContent').text()).toBe('Viet Nam')
  })
})
