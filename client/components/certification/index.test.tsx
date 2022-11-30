import Image from 'next/image'
import { shallow } from 'enzyme'

import SurveysContent from './index'
import ExportOption from '../partners/exportOption'

describe('Certification', () => {
  it('should render two certifications', () => {
    const component = shallow(<SurveysContent />)

    expect(component.exists(ExportOption)).toBeTruthy()
    expect(component.find(Image)).toHaveLength(2)
  })
})
