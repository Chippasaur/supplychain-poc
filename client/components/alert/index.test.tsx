import { render } from '@testing-library/react'

import Alert from './index'
import alerts from '../../__test__/mockData/alerts'

describe('alerts component', () => {
  it('should be able to render all alerts by default', () => {
    const { container } = render(<Alert alerts={alerts} />)

    const firstContent = container.querySelectorAll('.content')[0]
    const secondContent = container.querySelectorAll('.content')[1]
    const thirdContent = container.querySelectorAll('.content')[2]

    expect(container.querySelectorAll('.alert')).toHaveLength(3)
    expect(firstContent.textContent).toBe('Xinjiang Cotton Faces Sweeping New Western Sanctions')
    expect(secondContent.textContent).toBe(
      'Merces Apparel Co., LTD has had a credit issue: Credit report has changed from Amber to Red',
    )
    expect(thirdContent.textContent).toBe(
      'Grand Group Standard industrial Classification (SIC) rating has dropped below requirements',
    )
  })
})
