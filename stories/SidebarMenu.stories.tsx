import React from 'react'
import { Story } from '@storybook/react'

import SidebarMenu, { SidebarMenuProps } from '../client/components/sidebarMenu'

export default {
  title: 'Visibility/SidebarMenu',
  component: SidebarMenu,
  argTypes: {
    currentActivePath: {
      defaultValue: '',
      description: 'current active path of menu',
      control: { type: 'text' },
    },
  },
}

const menuConfig = [
  {
    title: 'menu1',
    url: 'menu1',
  },
  {
    title: 'menu2',
    url: 'menu2',
  },
  {
    title: 'menu3',
    url: 'menu3',
  },
]

export const baseSidebarMenu: Story<SidebarMenuProps> = args => <SidebarMenu {...args} menuConfig={menuConfig} />

export const sidebarMenuWithBadge: Story<SidebarMenuProps> = args => {
  const config = [
    ...menuConfig,
    {
      title: 'menu4',
      url: 'menu4',
      badgeContent: 3,
    },
  ]
  return <SidebarMenu {...args} menuConfig={config} />
}

export const sidebarMenuWithDisabled: Story<SidebarMenuProps> = args => {
  const config = [
    ...menuConfig,
    {
      title: 'menu4',
      url: 'menu4',
      disabled: true,
    },
  ]
  return <SidebarMenu {...args} menuConfig={config} />
}
