import { shallow } from 'enzyme'

import { CustomerSuppliersResponse } from '../../../../shared/response'
import CompanyOverview from './index'

const useSuppliersSpy = jest.spyOn(require('../../../utils/hooks'), 'useSuppliers')

describe('Supplier Map', () => {
  it('should be able to render a map with all controllers enabled', async () => {
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
          address: 'NO 422, JiangHu Road',
          postalCode: undefined,
          state: undefined,
          city: undefined,
          region: undefined,
        },
        logo: '',
        groupId: 'fake id',
      },
    ]
    useSuppliersSpy.mockImplementationOnce(() => suppliers)

    const result = shallow(<CompanyOverview />)

    expect(result.find('SupplierMap')).toHaveLength(1)
    expect(result.find('SupplierMap').prop('controllers')).toEqual({
      containZoomController: true,
      containSearchBar: false,
      containLegend: false,
      containPopUp: false,
      containStatistics: true,
    })
  })
})
