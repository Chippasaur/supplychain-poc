import { render } from '@testing-library/react'
import React from 'react'

import ShippingData from '../../../../pages/partners/[id]/shipping-data'
import shipments from '../../../__test__/mockData/shipments'
import mockShipments from '../../../__test__/mockData/mockShipments'

jest.mock('../../../components/partners/menu', () => () => 'Menu')
jest.mock('../../../components/partners/layout/header', () => () => 'Header')
jest.mock('../../../components/partners/shippingData/detail', () => () => 'Detail')
jest.mock('../../../components/partners/shippingData/chart', () => () => 'LineChart')
const useShipmentsDataSpy = jest.spyOn(require('../../../utils/hooks'), 'useShipmentsData')
const useShipmentsChartDataSpy = jest.spyOn(require('../../../utils/hooks'), 'useShipmentsChartData')

describe('ShippingData', () => {
  beforeEach(() => {
    useShipmentsDataSpy.mockImplementation(() => shipments)
    useShipmentsChartDataSpy.mockImplementation(() => mockShipments)
  })
  it('should render content', () => {
    const { container } = render(<ShippingData />)
    expect(container.textContent).toContain(
      'PartnersPartner informationHeaderMenuShipping data2021-01-01 2021-03-06 LineChartDetail',
    )
  })
})
