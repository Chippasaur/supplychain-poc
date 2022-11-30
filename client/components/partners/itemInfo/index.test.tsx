import { render } from '@testing-library/react'
import React from 'react'

import ItemInfo from './index'
jest.mock('../itemTitle', () => () => 'ItemTitle')

describe('itemInfo', () => {
  it('should render item content with children', () => {
    const { container } = render(<ItemInfo title={'title'}>child</ItemInfo>)
    expect(container.innerHTML).toEqual(`<div>ItemTitle<p class="info">child</p></div>`)
  })

  it('should render item content with info', () => {
    const { container } = render(<ItemInfo title={'title'} info={'info'} />)
    expect(container.innerHTML).toEqual(`<div>ItemTitle<p class="info">info</p></div>`)
  })
  it('should render item content with default', () => {
    const component0 = render(<ItemInfo title={'title'}>{''}</ItemInfo>)
    expect(component0.container.innerHTML).toEqual(
      `<div>ItemTitle<p class="info"><span class="nodata">No data</span></p></div>`,
    )
    const component1 = render(<ItemInfo title={'title'} info={''} />)
    expect(component1.container.innerHTML).toEqual(
      `<div>ItemTitle<p class="info"><span class="nodata">No data</span></p></div>`,
    )
  })
})
