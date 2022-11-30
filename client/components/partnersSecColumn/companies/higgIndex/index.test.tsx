import { shallow as enzymeRender } from 'enzyme'
import { render, screen } from '@testing-library/react'

import HiggIndex from './index'

describe('<HiggIndex/>', () => {
  it('should show title message and data', () => {
    render(<HiggIndex selfAssessment={50} verified={99} />)
    expect(screen.getByText(/Self-Assessment - Posted/i)).toBeInTheDocument()
    expect(screen.getByText(/Verified - Posted/i)).toBeInTheDocument()
    expect(screen.getByText(/50%/i)).toBeInTheDocument()
    expect(screen.getByText(/99%/i)).toBeInTheDocument()
  })

  it('should show required style', () => {
    const component = enzymeRender(<HiggIndex selfAssessment={50} verified={99} />)
    expect(component.find('.data').exists()).toBeTruthy()
    expect(component.find('.view').exists()).toBeTruthy()
    expect(component.find('.title').exists()).toBeTruthy()
  })
})
