import { render } from '@testing-library/react'
import React from 'react'

import UpdateInfo from './index'

describe('UpdateInfo', () => {
  it('should render content', () => {
    const { container } = render(<UpdateInfo source={'SOURCE'} time={'2020-10-10'} />)
    expect(container.textContent).toEqual('Source: SOURCELast update: 2020-10-10')
  })
})
