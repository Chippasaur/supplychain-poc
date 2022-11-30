import { render, screen } from '@testing-library/react'

import Activities from './index'

describe('<Activities/>', () => {
  it('should show title message and tabs', () => {
    render(<Activities title="activities" alerts={[]} news={[]} />)
    expect(screen.getByText(/ACTIVITIES/i)).toBeInTheDocument()
    expect(screen.getByText(/Alerts/i)).toBeInTheDocument()
    expect(screen.getByText(/News/i)).toBeInTheDocument()
  })
})
