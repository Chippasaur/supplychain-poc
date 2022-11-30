import React from 'react'

import Select from '../client/components/select'

export default {
  title: 'Visibility/Select',
  component: Select,
  argTypes: {
    size: {
      defaultValue: 'small',
      description: 'The size of the select',
      options: ['small', 'large'],
      control: { type: 'select' },
    },
    multiLines: {
      defaultValue: false,
      description: 'If `true`, the select will be multiLines style',
      control: { type: 'boolean' },
    },
    textFieldVariant: {
      defaultValue: 'standard',
      description: 'The type of select control',
      options: ['standard', 'filled', 'outlined'],
      control: { type: 'select' },
    },
    placeholder: {
      defaultValue: null,
      description: 'The placeholder of the select input',
      control: { type: 'text' },
    },
    displayClearIcon: {
      defaultValue: false,
      description: 'If `true`, click clear icon to clear selected values',
      control: { type: 'boolean' },
    },
    renderDefaultTags: {
      defaultValue: false,
      description: 'If `true`, the multiple selected value will display with clear button',
      control: { type: 'boolean' },
    },
  },
}

export const singleSelect = (args: any) => (
  <Select {...args} icon={<img src={require('../client/resources/icons/search.svg')} width={18} height={18} />} />
)
singleSelect.args = {
  options: ['Apple', 'Banana', 'Pear'],
}

export const multipleSelect = (args: any) => <Select multiple {...args} />
multipleSelect.args = {
  options: ['Apple', 'Banana', 'Pear'],
}
