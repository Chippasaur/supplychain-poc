import { render, screen } from '@testing-library/react'

import { DAndBLevel } from '../../../shared/enum/dAndBLevel'
import PartnersSecColumn from './index'
import { useCompanyData } from '../../utils/hooks'

const mockResponse = {
  dAndB: {
    businessRiskLevel: DAndBLevel.Moderate,
  },
  higgIndex: {
    selfAssessment: 99,
    verified: 50,
  },
}

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const useCompanyDataSpy = jest.spyOn(require('../../utils/hooks'), 'useCompanyData')

describe('<PartnersSecColumn/>', () => {
  beforeEach(() => {
    useRouter.mockImplementationOnce(() => ({
      pathname: '/partners/3/test',
    }))
  })

  it('should show risk level message and title', () => {
    useCompanyDataSpy.mockImplementationOnce(() => mockResponse)

    render(<PartnersSecColumn />)
    expect(screen.getByText(/Moderate/i)).toBeInTheDocument()
    expect(screen.getByText(/Overall Business Risk/i)).toBeInTheDocument()
    expect(screen.getByText(/Verified - Posted/i)).toBeInTheDocument()
  })
})
