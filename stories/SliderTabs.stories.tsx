import React from 'react'
import { Meta, Story } from '@storybook/react'

import SliderTabs, { SliderTab, TabsProps } from '../client/components/sliderTabs'

export default {
  title: 'Visibility/SliderTabs',
  component: SliderTabs,
  argTypes: {
    tabIndex: {
      description: 'The index of activated tab',
      defaultValue: 0,
      options: [0, 1, 2],
      control: { type: 'select' },
    },
    indicatorColor: {
      description: 'The indicator color of the tabs.',
      defaultValue: '#EB5F2C',
      control: { type: 'text' },
    },
    children: {
      name: 'children',
      description: 'The children of SliderTabs should be SliderTab',
    },
    onChange: {
      description: 'Binding onChange event. Normally, tabindex will change in the event',
    },
    className: {
      description: 'The className.',
    },
  },
} as Meta

const Template: Story<TabsProps> = args => (
  <SliderTabs {...args}>
    <SliderTab label="tab1" />
    <SliderTab label="tab2" />
    <SliderTab label="tab3" />
  </SliderTabs>
)

export const baseSliderTabs = Template.bind({})
baseSliderTabs.args = {
  tabIndex: 0,
}

export const badgedSliderTabs: Story<TabsProps> = args => (
  <SliderTabs {...args}>
    <SliderTab label="tab1" badgeContent={10} />
    <SliderTab label="tab2" />
    <SliderTab label="tab3" />
  </SliderTabs>
)

export const styledSliderTabs: Story<TabsProps> = args => (
  <SliderTabs {...args} indicatorColor="#066184">
    <SliderTab label="tab1" />
    <SliderTab label="tab2" />
    <SliderTab label="tab3" />
  </SliderTabs>
)

export const sliderTabsWithDisabledTab: Story<TabsProps> = args => (
  <SliderTabs {...args}>
    <SliderTab label="tab1" />
    <SliderTab label="tab2" />
    <SliderTab label="tab3" disabled />
  </SliderTabs>
)
