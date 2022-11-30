import { shallow } from 'enzyme'
import React from 'react'

import BuyerOptionList from './buyerOptionList'
import shipments from '../../../../__test__/mockData/shipments'

describe('BuyerOptionList', () => {
  it('should render buyer content', () => {
    const component = shallow(<BuyerOptionList data={shipments.shipmentRecords} />)
    expect(component.find('.des').first().text()).toEqual('Other buyers')
    expect(component.find('.des').last().text()).toEqual('HS Code/descriptionShipping data of buyers')
    expect(component.find('LongList').first().props()).toHaveProperty('itemData', [
      {
        buyer: 'ENI JR286 INC',
        hsCodeList: [
          {
            title: '611780 - hsDescription',
            volume: 7,
            value: 35000,
          },
          { title: '888888 - hsDescription mock', volume: 2, value: 1000 },
        ],
      },
      {
        buyer: 'ENI JR286 INC 1',
        hsCodeList: [{ title: '611780 - hsDescription', volume: 1, value: 2000 }],
      },
    ])
  })
})
