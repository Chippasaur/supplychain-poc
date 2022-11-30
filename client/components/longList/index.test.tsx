import { shallow } from 'enzyme'
import { FixedSizeList } from 'react-window'

import LongList from './index'

const item = () => <div>test</div>
const props = {
  itemSize: 10,
  height: 200,
  width: 200,
  itemCount: 200,
  Row: item,
}

describe('LongList', () => {
  it('should render LongList', () => {
    const component = shallow(<LongList {...props} />)

    expect(component.exists(FixedSizeList)).toBeTruthy()
  })
})
