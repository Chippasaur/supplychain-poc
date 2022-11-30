import { render, screen } from '@testing-library/react'

import Header from './header'

const company = {
  id: '1',
  tier: 1,
  logoUri: '',
  name: 'A & K DESIGNS',
  entity: 1,
  contact: {
    name: 'Dominic Ballard',
    email: 'dominic@lapelgroup.com',
    phone: '+76 1232 1131 ext 12',
  },
  category: 0,
  location: {
    region: 'Hong Kong',
  },
}
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const useCompanyDataSpy = jest.spyOn(require('../../../utils/hooks'), 'useCompanyData')

describe('Header', () => {
  beforeEach(() => {
    useRouter.mockImplementationOnce(() => ({
      pathname: '/partners/3/test',
    }))
  })
  it('should show corresponding header text', () => {
    useCompanyDataSpy.mockImplementationOnce(() => company)

    render(<Header />)
    expect(screen.getByText(/Group/i)).toBeInTheDocument()
    expect(screen.getByText(/A & K DESIGNS/i)).toBeInTheDocument()
    expect(screen.getByText(/Hong Kong/i, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(/Tier 1/i, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(/Manufacturer/i)).toBeInTheDocument()
    expect(screen.getByText(/Verified/i)).toBeInTheDocument()
  })
})
