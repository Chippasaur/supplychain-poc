import { render } from '@testing-library/react'
import React from 'react'

import ItemTitle from './index'

describe('itemTitle', () => {
  it('should render item content default', () => {
    const { container } = render(<ItemTitle>title</ItemTitle>)
    expect(container.innerHTML).toEqual(`<p class="itemTitle"><span>title</span></p>`)
  })
  it('should render item content with view', () => {
    const { container } = render(<ItemTitle view>title</ItemTitle>)
    expect(container.innerHTML).toEqual(`<p class="itemTitle"><span>title</span><span class="view"> View </span></p>`)
  })
  it('should render item content with other option', () => {
    const { container } = render(<ItemTitle view={'click me'}>title</ItemTitle>)
    expect(container.innerHTML).toEqual(
      `<p class="itemTitle"><span>title</span><span class="view"> click me </span></p>`,
    )
  })
})
