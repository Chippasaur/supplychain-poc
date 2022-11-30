import { render } from '@testing-library/react'

import TrafficLight from './index'

describe('TrafficLight', () => {
  it('should render traffic light when level is valid', () => {
    const { container } = render(<TrafficLight level={2} />)

    expect(container.querySelector('.view')).toBeInTheDocument()
  })
})
