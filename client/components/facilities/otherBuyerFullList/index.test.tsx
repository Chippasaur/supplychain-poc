import { shallow } from 'enzyme'
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'

import Pagination from '../../pagination'
import OtherBuyerFullList from './index'

const buyers = ['C & A BUYING GMBH & CO. K', 'ART FX - DC 1016', 'PLATAFORMA EUROPA']

describe('OtherBuyerFullList', () => {
  it('should render list and pagination', () => {
    const component = shallow(<OtherBuyerFullList open onClose={() => null} buyers={buyers} />)

    expect(component.exists(Dialog)).toBeTruthy()
    expect(component.exists(List)).toBeTruthy()
    expect(component.exists(Pagination)).toBeTruthy()
  })
})
