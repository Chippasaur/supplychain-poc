import { shallow } from 'enzyme'
import { render, fireEvent, screen } from '@testing-library/react'

import Buyers from './index'

const buyerNames: string[] = [
  'Fair Factories Clearinghouse (FFC FactoryList Apr 19)',
  'New Balance (New Balance T1 Supplier List October 2020)',
  'Partnership for Sustainable Textiles (PST) (PST Nov 2020)',
  'Under Armour [Public List] (Under Armour Facility List December 2019)',
  'adidas (adidas Factory List - January 2020)',
]

describe('<Buyers/>', () => {
  it('should show header label and company icon', () => {
    const component = shallow(<Buyers buyerNames={buyerNames} />)
    expect(component.find('.header').text()).toBe('Other Buyers')
    expect(component.find('.companyIcon').exists()).toBeTruthy()
  })

  it('should show header label and view more link when name list length more than four', () => {
    const component = shallow(<Buyers buyerNames={buyerNames} />)
    expect(component.find('.viewMore').exists()).toBeTruthy()
  })

  it('should not show header label and view more link when name list length less than four', () => {
    const component = shallow(<Buyers buyerNames={['a', 'b']} />)
    expect(component.find('.viewMore').exists()).toBeFalsy()
  })

  it('should show the first four name list', () => {
    const component = shallow(<Buyers buyerNames={buyerNames} />)
    expect(component.find('p')).toHaveLength(4)
    expect(component.find('.name').first().text()).toBe('Fair Factories Clearinghouse (FFC FactoryList Apr 19)')
    expect(component.find('.name').at(1).text()).toBe('New Balance (New Balance T1 Supplier List October 2020)')
    expect(component.find('.name').at(2).text()).toBe('Partnership for Sustainable Textiles (PST) (PST Nov 2020)')
    expect(component.find('.name').at(3).text()).toBe(
      'Under Armour [Public List] (Under Armour Facility List December 2019)',
    )
  })

  it('should show the fifth name on the full list', () => {
    const { container } = render(<Buyers buyerNames={buyerNames} />)
    fireEvent.click(container.querySelector('.viewMore') || container)
    expect(screen.getByText('adidas (adidas Factory List - January 2020)')).toBeInTheDocument()
  })
})
