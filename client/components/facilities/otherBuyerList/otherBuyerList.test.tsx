import { shallow } from 'enzyme'

import OtherBuyerList from './otherBuyerList'

const buyerList = {
  companyName: 'PRATIBHA SYNTEX',
  location: 'PLOT NO. 15 & 16, SECTOR 5, PITHAMPUR, PITHAMPUR, DISTRICT- DHAR, MADHYA PRADESH, INDIA',
  buyers: ['C & A BUYING GMBH & CO. K', 'ART FX - DC 1016', 'PLATAFORMA EUROPA'],
}

describe('OtherBuyerList', () => {
  it('should render OtherBuyerList', () => {
    const component = shallow(<OtherBuyerList buyerList={buyerList} />)

    expect(component.find('.companyInfo')).toHaveLength(3)
    expect(component.find('.name').first().text()).toBe('PRATIBHA SYNTEX')
    expect(component.find('.address').first().text()).toContain(
      'PLOT NO. 15 & 16, SECTOR 5, PITHAMPUR, PITHAMPUR, DISTRICT- DHAR, MADHYA PRADESH, INDIA',
    )
  })
})
