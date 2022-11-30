import { shallow } from 'enzyme'
import React from 'react'

import SupplierStatisticsButton from './supplierStatisticsButton'
import { EntityType } from '../../../../shared/enum/entityType'

describe('Supplier Statistics Button', () => {
  it('should be able to render map and focus on Shenzhen as center', () => {
    const result = shallow(
      <SupplierStatisticsButton
        statisticsNum={1234}
        statisticsType={EntityType.Group}
        isActivated={true}
        onSelectFilter={null}
      />,
    )

    const label = result.find('.label')
    const description = result.find('.description')

    expect(label.text()).toEqual('1,234')
    expect(description.text()).toEqual('Partners')
  })
})
