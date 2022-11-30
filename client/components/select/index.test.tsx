import React from 'react'
import { shallow } from 'enzyme'
import { render, fireEvent, screen } from '@testing-library/react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Autocomplete from '@material-ui/lab/Autocomplete'

import Select from './index'
import Icon from '../icon'

const props = {
  options: ['a', 'b', 'c'],
  value: 'a',
}

describe('Select', () => {
  it('should render Select', () => {
    const component = shallow(<Select {...props} />)

    expect(component.exists(ClickAwayListener)).toBeTruthy()
    expect(component.exists(Autocomplete)).toBeTruthy()
  })

  it('should find options box when click text field', () => {
    const { container } = render(<Select {...props} />)

    expect(container.querySelector('.selectBox')).not.toBeInTheDocument()
    fireEvent.click(container.querySelector('.MuiInput-input') || container)
    expect(container.querySelector('.selectBox')).toBeInTheDocument()
    expect(container.querySelector('.MuiInputAdornment-root')).not.toBeInTheDocument()
  })

  it('should text field with icon', () => {
    const { container } = render(<Select {...props} icon={<Icon type={'search'} size={20} />} />)

    expect(container.querySelector('.selectBox')).not.toBeInTheDocument()
    expect(container.querySelector('.MuiInputAdornment-root')).toBeInTheDocument()
    fireEvent.click(container.querySelector('.MuiInput-input') || container)
    expect(container.querySelector('.selectBox')).toBeInTheDocument()
  })

  it('should show multiple select', () => {
    const { container } = render(<Select {...props} multiple value={['a']} />)
    fireEvent.click(container.querySelector('.MuiInput-input') || container)
    expect(screen.getByText('Clear')).toBeInTheDocument()
  })

  it('should call onchange function', () => {
    const onChange = jest.fn()
    const { container } = render(<Select {...props} multiple value={['a']} onChange={onChange} />)
    fireEvent.click(container.querySelector('.MuiInput-input') || container)
    fireEvent.click(screen.getByText('Clear'))
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('should display clear icon', () => {
    const component = shallow(<Select {...props} displayClearIcon />)

    expect(component.find(Autocomplete).first().prop('closeIcon')).not.toBeNull()
  })

  it('should not display clear icon', () => {
    const component = shallow(<Select {...props} />)

    expect(component.find(Autocomplete).first().prop('closeIcon')).toBeNull()
  })
})
