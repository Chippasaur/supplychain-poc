import { shallow } from 'enzyme'

import SupplierMap from './supplierMap'
import { CustomerSuppliersResponse } from '../../../../shared/response'
import { EntityType } from '../../../../shared/enum/entityType'

describe('Supplier Map', () => {
  const suppliers = [
    {
      entity: EntityType.Group,
    },
    {
      entity: EntityType.Facility,
    },
  ] as CustomerSuppliersResponse[]
  const controllers = {
    containZoomController: true,
    containSearchBar: true,
    containLegend: true,
    containPopUp: true,
    containStatistics: true,
  }

  it('should be able to render map and focus on Shenzhen as center', () => {
    const result = shallow(
      <SupplierMap suppliers={suppliers} controllers={controllers} mapContainerStyle={{ height: '', width: '' }} />,
    )

    const map = result.find('ReactMapboxGl')

    expect(map.prop('center')).toEqual([113.9066, 22.5578])
  })

  it('should be able to render a map with bounds', () => {
    const result = shallow(
      <SupplierMap suppliers={suppliers} controllers={controllers} mapContainerStyle={{ height: '', width: '' }} />,
    )

    const map = result.find('ReactMapboxGl')

    expect(map.prop('maxBounds')).toEqual([
      [-180, -85],
      [180, 85],
    ])
  })

  it('should be able to render zoom, search bar and legend for a map', () => {
    const result = shallow(
      <SupplierMap suppliers={suppliers} controllers={controllers} mapContainerStyle={{ height: '', width: '' }} />,
    )

    const zoom = result.find('.zoom-controller')
    const searchBar = result.find('MapSearchControl')

    expect(zoom).toHaveLength(1)
    expect(searchBar).toHaveLength(1)
  })

  it('should be able to render statistics buttons', () => {
    const result = shallow(
      <SupplierMap suppliers={suppliers} controllers={controllers} mapContainerStyle={{ height: '', width: '' }} />,
    )

    const statisticsButtons = result.find('SupplierStatisticsButton')

    expect(statisticsButtons.length).toBe(2)
    expect(statisticsButtons.first().prop('statisticsType')).toBe(EntityType.Group)
    expect(statisticsButtons.first().prop('isActivated')).toBe(true)
  })
})
