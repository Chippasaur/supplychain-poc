import { render, shallow } from 'enzyme'

import OverallBusinessRisk, { RiskCount } from './index'
import { DAndBLevel } from '../../../shared/enum/dAndBLevel'

const riskCounts = [
  {
    level: DAndBLevel.Low,
    count: 1231400,
  },
  {
    level: DAndBLevel.Moderate,
    count: 153,
  },
  {
    level: DAndBLevel.High,
    count: 14201,
  },
  {
    level: DAndBLevel.Severe,
    count: 18700,
  },
  {
    level: DAndBLevel.OutOfBusiness,
    count: 382,
  },
  {
    level: DAndBLevel.Undetermined,
    count: 301,
  },
  {
    level: DAndBLevel.Unavailable,
    count: 302,
  },
]

const useOverallBusinessRiskCounts = jest.spyOn(require('../../utils/hooks'), 'useOverallBusinessRiskCounts')

describe('Overall Business Risk Counts', () => {
  it('should render 5 count rows on the page', () => {
    useOverallBusinessRiskCounts.mockImplementationOnce(() => riskCounts)

    const component = shallow(<OverallBusinessRisk />)
    expect(component.find(RiskCount)).toHaveLength(7)
  })

  it('should format number to thousand separator', () => {
    useOverallBusinessRiskCounts.mockImplementationOnce(() => riskCounts)

    const component = render(<OverallBusinessRisk />)
    const firstCount = component.find('.count').first()
    const secondCount = component.find('.count').eq(1)
    const thirdCount = component.find('.count').eq(2)
    const fourthCount = component.find('.count').eq(3)
    const fifthCount = component.find('.count').eq(4)
    const sixthCount = component.find('.count').eq(5)
    const seventhCount = component.find('.count').eq(6)

    expect(firstCount.text()).toBe('1,231,400')
    expect(secondCount.text()).toBe('153')
    expect(thirdCount.text()).toBe('14,201')
    expect(fourthCount.text()).toBe('18,700')
    expect(fifthCount.text()).toBe('382')
    expect(sixthCount.text()).toBe('301')
    expect(seventhCount.text()).toBe('302')
  })
})
