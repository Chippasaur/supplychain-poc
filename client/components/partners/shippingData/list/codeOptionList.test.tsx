import { shallow } from 'enzyme'
import React from 'react'

import CodeOptionList from './codeOptionList'
import shipments from '../../../../__test__/mockData/shipments'

describe('CodeOptionList', () => {
  it('should render code content', () => {
    const component = shallow(<CodeOptionList data={shipments.shipmentRecords} />)
    expect(component.find('.des').first().text()).toEqual('HS Code / Description')
    expect(component.find('.des').last().text()).toEqual('buyersShipping data of buyers')

    expect(component.find('LongList').first().props()).toHaveProperty('itemData', [
      {
        hsCode: '611780',
        hsDescription: 'hsDescription',
        buyerList: [
          { title: 'ENI JR286 INC', volume: 7, value: 35000 },
          {
            title: 'ENI JR286 INC 1',
            volume: 1,
            value: 2000,
          },
        ],
      },
      {
        hsCode: '888888',
        hsDescription: 'hsDescription mock',
        buyerList: [{ title: 'ENI JR286 INC', volume: 2, value: 1000 }],
      },
    ])
  })
})
