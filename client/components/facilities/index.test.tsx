import { shallow } from 'enzyme'

import FacilitiesMap from './index'
import { maxBounds } from '../../utils/map/shareData'

describe('Facilities Map', () => {
  it('should be able to render map and focus on center', () => {
    const center = [0, 40]

    const result = shallow(<FacilitiesMap />)

    const map = result.find('ReactMapboxGl')

    expect(map.prop('center')).toEqual(center)
  })

  it('should be able to render a map with bounds', () => {
    const result = shallow(<FacilitiesMap />)

    const map = result.find('ReactMapboxGl')

    expect(map.prop('maxBounds')).toEqual(maxBounds)
  })

  it('should be able to render zoom for a map', () => {
    const result = shallow(<FacilitiesMap />)

    const zoom = result.find('.zoomController')

    expect(zoom).toHaveLength(1)
  })
})
