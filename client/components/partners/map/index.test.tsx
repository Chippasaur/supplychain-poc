import { shallow } from 'enzyme'

import SupplierMapWithAllController from './index'
import { Mode } from '../../../utils/network/modeCondition'
import { CustomerSuppliersResponse } from '../../../../shared/response'

describe('Supplier Map', () => {
  it('should be able to render a map with all controllers enabled', () => {
    const suppliers: CustomerSuppliersResponse[] = [
      {
        id: 'id1',
        companyName: 'google',
        entity: 1,
        tier: 1,
        financialHealth: 0,
        rating: 1,
        riskLevel: 1,
        higgTotalScore: 50,
        category: 1,
        coordinate: {
          longitude: 85,
          latitude: 50,
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

    const result = shallow(<SupplierMapWithAllController suppliers={suppliers} mode={Mode.FREE} />)

    expect(result.find('LoadingProgress')).toHaveLength(1)

    setTimeout(() => {
      expect(result.find('SupplierMap')).toHaveLength(1)
      expect(result.find('SupplierMap').prop('controllers')).toEqual({
        containZoomController: true,
        containSearchBar: true,
        containLegend: true,
        containPopUp: true,
        containStatistics: false,
      })
    })
  })
})
