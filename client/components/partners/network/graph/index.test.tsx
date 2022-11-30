import 'jest-canvas-mock'
import { render } from '@testing-library/react'

import NetworkGraph from './index'
import { Mode } from '../../../../utils/network/modeCondition'
import { CustomerSuppliersResponse } from '../../../../../shared/response'

describe('Partners network', () => {
  it('should render network graph', () => {
    const suppliers: CustomerSuppliersResponse[] = [
      {
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
      },
    ]

    const { container } = render(<NetworkGraph suppliers={suppliers} filteredSuppliers={[]} mode={Mode.FREE} />)
    expect(container.getElementsByClassName('graph')).toHaveLength(1)
    expect(container.getElementsByClassName('loadingProgress')).toHaveLength(1)
  })
})
