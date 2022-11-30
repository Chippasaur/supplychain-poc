import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import Detail from './index'
import shipments from '../../../../__test__/mockData/shipments'

jest.mock('../../shippingData/list/codeOptionList', () => () => 'CodeOptionList')
jest.mock('../../shippingData/list/buyerOptionList', () => () => 'BuyerOptionList')

describe('detail', () => {
  it('should render code content', () => {
    const { container } = render(<Detail shipmentRecords={shipments.shipmentRecords} />)
    expect(container.textContent).toEqual('Shipping details​ResetHS Code listOther buyers listCodeOptionList')
  })
  it('should render buyer content when click', () => {
    const { container } = render(<Detail shipmentRecords={shipments.shipmentRecords} />)
    fireEvent.click(container.querySelector('.title:not(.active)') || container)
    expect(container.textContent).toContain('BuyerOptionList')
  })
})
