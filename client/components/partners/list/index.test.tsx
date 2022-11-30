import { shallow } from 'enzyme'
import { DataGrid } from '@material-ui/data-grid'
import { render } from '@testing-library/react'

import PartnersTable from './index'
import LoadingProgress from '../../loadingProgress'
import { Mode } from '../../../utils/network/modeCondition'

const supplier = {
  id: '605851b161f2a141628e9e46',
  companyName: 'A & K DESIGNS',
  entity: 1,
  tier: 1,
  financialHealth: 2,
  rating: 3.5,
  riskLevel: 0,
  higgTotalScore: 50,
  category: 6,
  coordinate: {
    latitude: 45.963299,
    longitude: -122.077003,
  },
  location: {
    address: '8564 NE ALDERWOOD ROAD',
    postalCode: undefined,
    state: 'PORTLAND',
    city: 'OREGON',
    region: 'AMERICAS',
  },
  logo: '',
  groupId: 'fake id',
}

describe('Partners Table', () => {
  it('should render data grid', () => {
    const component = shallow(<PartnersTable suppliers={[supplier]} mode={Mode.FREE} />)

    expect(component.exists(LoadingProgress)).toBeTruthy()
    setTimeout(() => {
      expect(component.exists(DataGrid)).toBeTruthy()
      expect(component.find(DataGrid).first().prop('page')).toBe(0)
    })
  })

  it('should not show danger icon', () => {
    const { container } = render(<PartnersTable suppliers={[supplier]} mode={Mode.FREE} />)

    expect(container.querySelector('.icon-danger')).not.toBeInTheDocument()
  })

  it('should show danger icon', () => {
    const { container } = render(<PartnersTable suppliers={[{ ...supplier, riskLevel: 2 }]} mode={Mode.FREE} />)

    expect(container.querySelector('.icon-danger')).toBeInTheDocument()
  })
})
