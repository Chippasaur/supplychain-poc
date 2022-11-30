import React from 'react'
import { Story, Meta } from '@storybook/react'
import { ButtonProps } from '@material-ui/core'

import Button from '../client/components/button'

export default {
  title: 'Visibility/Button',
  component: Button,
  argTypes: {
    children: {
      name: 'children',
      defaultValue: 'Button',
      description: 'The content of the button.',
      control: { type: 'text' },
    },
    disabled: {
      description: 'If `true`, the button will be disabled.',
      defaultValue: false,
      control: { type: 'boolean' },
    },
    color: {
      description: 'The color of the component. It supports those theme colors that make sense for this component.',
      defaultValue: 'primary',
      options: ['inherit', 'primary', 'secondary', 'default'],
      control: { type: 'select' },
    },
    variant: {
      description: 'The variant to use.',
      defaultValue: 'text',
      options: ['text', 'outlined', 'contained'],
      control: { type: 'select' },
    },
    role: {
      description: 'The role that button belongs to.',
      defaultValue: 'base',
      options: ['base', 'secondary', 'selection'],
      control: { type: 'select' },
    },
  },
} as Meta

const Template: Story<ButtonProps> = args => <Button {...args} />

export const baseButton = Template.bind({})
baseButton.args = {
  role: 'base',
  children: 'Base Button',
}

export const secondaryButton = Template.bind({})
secondaryButton.args = {
  role: 'secondary',
  children: 'Secondary Button',
}

export const selectionButton = Template.bind({})
selectionButton.args = {
  role: 'selection',
  children: 'Selection Button',
}
