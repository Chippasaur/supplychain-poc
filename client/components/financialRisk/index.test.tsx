import { render, shallow } from 'enzyme'

import FinancialRisk, { TrafficCount } from './index'
import { TrafficLightLevel } from '../../../shared/enum/trafficLightLevel'

const riskCount = [
  {
    level: TrafficLightLevel.Safe,
    count: 1231400,
  },
  {
    level: TrafficLightLevel.AverageRisk,
    count: 153,
  },
  {
    level: TrafficLightLevel.ElevatedRisk,
    count: 1420,
  },
  {
    level: TrafficLightLevel.Caution,
    count: 3870,
  },
]

const useFinancialRiskCountSpy = jest.spyOn(require('../../utils/hooks'), 'useFinancialRiskCount')

describe('Financial Risk', () => {
  it('should render 5 count rows on the page', () => {
    useFinancialRiskCountSpy.mockImplementationOnce(() => riskCount)

    const component = shallow(<FinancialRisk />)
    expect(component.find(TrafficCount)).toHaveLength(5)
  })

  it('should format number to thousand separator', () => {
    useFinancialRiskCountSpy.mockImplementationOnce(() => riskCount)

    const component = render(<FinancialRisk />)
    const firstCount = component.find('.count').first()
    const secondCount = component.find('.count').eq(1)
    expect(firstCount.text()).toBe('1,231,400')
    expect(secondCount.text()).toBe('153')
  })
})
