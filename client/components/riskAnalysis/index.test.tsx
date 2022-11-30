import { shallow } from 'enzyme'

import RiskAnalysisContent from './index'
import ExportOption from '../partners/exportOption'
import ExponentBox from './exponentBox'
import FinancialStrengths from './financialStrength'
import CompositeCreditAppraisalComponent from './compositeCreditAppraisalComponent'
import ViabilityScore from './viabilityScore'
import TrafficLight from '../partnersSecColumn/companies/trafficLight'
import ActivityNews from '../activityNews'
import { TrafficLightLevel } from '../../../shared/enum/trafficLightLevel'

const useSupplierDataSpy = jest.spyOn(require('../../utils/hooks'), 'useSupplierData')
const dAndB = {
  businessRiskLevel: 0,
  compositeCreditAppraisal: 1,
  financialRisk: 0,
  financialStrength: 10,
  padex: 36,
  rating: '1A1',
  viabilityRating: '14AA',
  viabilityScore: 8,
}

const trafficLight = { level: TrafficLightLevel.Caution }

const news = [
  {
    id: '1',
    postedAt: new Date('2020-11-18 16:00:00'),
    content: '<b>ONUS APPARELS LIMITED.</b> has updated their annual report for 2019-2020',
  },
  {
    id: '2',
    postedAt: new Date('2020-11-02 19:00:00'),
    content: 'Ongoing screening update: New and/or updated matches found for TUA-HA TEX',
  },
  {
    id: '3',
    postedAt: new Date('2020-10-30 21:00:00'),
    title: 'Which fashion jobs are in demand right now?',
    content: 'Brands are not utilising the potential of regular brand audits enough. The luxury experience has',
  },
]

describe('RiskAnalysisContent', () => {
  it('should render exponents', () => {
    useSupplierDataSpy.mockImplementationOnce(() => ({ news, company: { dAndB, trafficLight } }))

    const component = shallow(<RiskAnalysisContent />)
    expect(component.find(ExponentBox)).toHaveLength(8)
    expect(component.find(ExportOption)).toHaveLength(1)
    expect(component.find(FinancialStrengths)).toHaveLength(1)
    expect(component.find(CompositeCreditAppraisalComponent)).toHaveLength(1)
    expect(component.find(ViabilityScore)).toHaveLength(1)
    expect(component.find(TrafficLight)).toHaveLength(1)
    expect(component.find(ActivityNews)).toHaveLength(1)
  })

  it('should render exponentBox with subscript', () => {
    const component = shallow(<ExponentBox title={'title'} description={'1A'} subscript={'subscript'} />)
    expect(component.exists('sub')).toBeTruthy()
  })

  it('should render exponentBox without subscript', () => {
    const component = shallow(<ExponentBox title={'title'} description={'1A'} />)
    expect(component.exists('sub')).toBeFalsy()
  })

  it('should render CompositeCreditAppraisalComponent', () => {
    const component = shallow(<CompositeCreditAppraisalComponent compositeCreditAppraisal={2} />)
    expect(component.exists('.good')).toBeTruthy()
  })

  it('should get one selected financial strength class', () => {
    const component = shallow(<FinancialStrengths strength={2} />)
    expect(component.find('.selected')).toHaveLength(1)
  })
})
