import { shallow } from 'enzyme'

import Filter, { INITIAL_FILTERS } from './index'
import Select from '../../select'
import { CustomSlider } from '../../slider'

describe('Filter', () => {
  it('should render selects and slider', () => {
    const component = shallow(
      <Filter
        suppliers={[]}
        handleFilterSuppliers={() => {
          return null
        }}
        filterValues={INITIAL_FILTERS}
        setFilterValues={() => null}
      />,
    )

    expect(component.find(Select)).toHaveLength(7)
    expect(component.find(CustomSlider)).toHaveLength(1)
  })
})
