import { render } from 'enzyme'

import SustainabilityPerformance from './index'

const useSustainabilitySpy = jest.spyOn(require('../../utils/hooks'), 'useSustainability')

const counts = [
  {
    performance: [
      { sustainabilityIndex: 'totalAverage', score: '49.5' },
      { sustainabilityIndex: 'ems', score: '50.9' },
      { sustainabilityIndex: 'energyEmissions', score: '50.7' },
      { sustainabilityIndex: 'waterUse', score: '49.6' },
      { sustainabilityIndex: 'wasteWaterEffluent', score: '46.8' },
      { sustainabilityIndex: 'emissionToAir', score: '47.8' },
      { sustainabilityIndex: 'wasteManagement', score: '51.0' },
      { sustainabilityIndex: 'chemicals', score: '49.9' },
    ],
    reportTime: 2021,
  },
]

describe('SustainabilityPerformance', () => {
  it('should 8 - when counts is empty', () => {
    useSustainabilitySpy.mockImplementationOnce(() => [])
    const component = render(<SustainabilityPerformance />)

    const score1 = component.find('.score').first()
    const score2 = component.find('.score').eq(1)
    const score3 = component.find('.score').eq(2)
    const score4 = component.find('.score').eq(3)
    const score5 = component.find('.score').eq(4)
    const score6 = component.find('.score').eq(5)
    const score7 = component.find('.score').eq(6)
    const score8 = component.find('.score').eq(7)

    expect(score1.text()).toBe('-')
    expect(score2.text()).toBe('-')
    expect(score3.text()).toBe('-')
    expect(score4.text()).toBe('-')
    expect(score5.text()).toBe('-')
    expect(score6.text()).toBe('-')
    expect(score7.text()).toBe('-')
    expect(score8.text()).toBe('-')
  })

  it('should 8 scores when counts is not empty', () => {
    useSustainabilitySpy.mockImplementationOnce(() => counts)
    const component = render(<SustainabilityPerformance />)

    const score1 = component.find('.score').first()
    const score2 = component.find('.score').eq(1)
    const score3 = component.find('.score').eq(2)
    const score4 = component.find('.score').eq(3)
    const score5 = component.find('.score').eq(4)
    const score6 = component.find('.score').eq(5)
    const score7 = component.find('.score').eq(6)
    const score8 = component.find('.score').eq(7)

    expect(score1.text()).toBe('49.5')
    expect(score2.text()).toBe('50.9')
    expect(score3.text()).toBe('50.7')
    expect(score4.text()).toBe('49.6')
    expect(score5.text()).toBe('46.8')
    expect(score6.text()).toBe('47.8')
    expect(score7.text()).toBe('51.0')
    expect(score8.text()).toBe('49.9')
  })
})
