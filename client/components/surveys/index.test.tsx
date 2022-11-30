import { shallow } from 'enzyme'
import Image from 'next/image'

import ExportOption from '../partners/exportOption'
import SurveysContent from './index'

describe('SurveysContent', () => {
  it('should render survey', () => {
    const component = shallow(<SurveysContent />)

    expect(component.exists(ExportOption)).toBeTruthy()
    expect(component.exists(Image)).toBeTruthy()
  })
})
