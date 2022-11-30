import React from 'react'
import { Meta, Story } from '@storybook/react'

import Legend, { LegendProps } from '../client/components/partners/legend'

export default {
  title: 'Visibility/Legend',
  component: Legend,
  argTypes: {
    legends: {
      description:
        'The legend to be displayed. It is an array contains three fields: name, color, and icon. If no icon is provided, the dot icon is used by default, and the color will be applied to the dot icon',
      defaultValue: [
        { name: 'legend1', color: '#066184' },
        { name: 'legend2', color: '#066184' },
      ],
    },
  },
} as Meta

const Template: Story<LegendProps> = args => <Legend {...args} />

export const baseLegend = Template.bind({})
baseLegend.args = {
  legends: Object.values([
    { name: 'legend1', icon: <img src={require('../client/resources/icons/dot.svg')} width={12} height={12} /> },
    { name: 'legend2', icon: <img src={require('../client/resources/icons/dot.svg')} width={12} height={12} /> },
    { name: 'legend3', icon: <img src={require('../client/resources/icons/dot.svg')} width={12} height={12} /> },
    { name: 'legend4', icon: <img src={require('../client/resources/icons/dot.svg')} width={12} height={12} /> },
  ]),
}
