import { shallow } from 'enzyme'

import SustainabilityReport from './index'

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
      { sustainabilityIndex: 'chemicals', score: '49.6' },
    ],
    reportTime: 2021,
  },
  {
    performance: [
      { sustainabilityIndex: 'totalAverage', score: '49.2' },
      { sustainabilityIndex: 'ems', score: '49.8' },
      { sustainabilityIndex: 'energyEmissions', score: '48.0' },
      { sustainabilityIndex: 'waterUse', score: '48.9' },
      { sustainabilityIndex: 'wasteWaterEffluent', score: '50.7' },
      { sustainabilityIndex: 'emissionToAir', score: '49.1' },
      { sustainabilityIndex: 'wasteManagement', score: '48.2' },
      { sustainabilityIndex: 'chemicals', score: '49.6' },
    ],
    reportTime: 2020,
  },
]

const useSustainabilitySpy = jest.spyOn(require('../../utils/hooks'), 'useSustainability')

describe('<SustainabilityReport/>', () => {
  it('should show eight current score when counts is not empty', () => {
    useSustainabilitySpy.mockImplementationOnce(() => counts)
    const component = shallow(<SustainabilityReport />)
    const firstScore = component.find('.currentScore').first()
    const secondScore = component.find('.currentScore').at(1)
    const thirdScore = component.find('.currentScore').at(2)
    const fourthScore = component.find('.currentScore').at(3)
    const fifthScore = component.find('.currentScore').at(4)
    const sixthScore = component.find('.currentScore').at(5)
    const seventhScore = component.find('.currentScore').at(6)
    const eighthScore = component.find('.currentScore').at(7)

    expect(firstScore.text()).toBe('49.5')
    expect(secondScore.text()).toBe('50.9')
    expect(thirdScore.text()).toBe('50.7')
    expect(fourthScore.text()).toBe('49.6')
    expect(fifthScore.text()).toBe('46.8')
    expect(sixthScore.text()).toBe('47.8')
    expect(seventhScore.text()).toBe('51.0')
    expect(eighthScore.text()).toBe('49.6')
  })

  it('should show eight previous score when counts is not empty', () => {
    useSustainabilitySpy.mockImplementationOnce(() => counts)
    const component = shallow(<SustainabilityReport />)
    const firstScore = component.find('.previousScore').first()
    const secondScore = component.find('.previousScore').at(1)
    const thirdScore = component.find('.previousScore').at(2)
    const fourthScore = component.find('.previousScore').at(3)
    const fifthScore = component.find('.previousScore').at(4)
    const sixthScore = component.find('.previousScore').at(5)
    const seventhScore = component.find('.previousScore').at(6)
    const eighthScore = component.find('.previousScore').at(7)

    expect(firstScore.text()).toBe('49.2')
    expect(secondScore.text()).toBe('49.8')
    expect(thirdScore.text()).toBe('48.0')
    expect(fourthScore.text()).toBe('48.9')
    expect(fifthScore.text()).toBe('50.7')
    expect(sixthScore.text()).toBe('49.1')
    expect(seventhScore.text()).toBe('48.2')
    expect(eighthScore.text()).toBe('49.6')
  })

  it('should show correct icons when counts is not empty', () => {
    useSustainabilitySpy.mockImplementationOnce(() => counts)
    const component = shallow(<SustainabilityReport />)
    expect(component.find('.improved')).toHaveLength(6)
    expect(component.find('.regressed')).toHaveLength(3)
    expect(component.find('.noChange')).toHaveLength(2)
  })
})
