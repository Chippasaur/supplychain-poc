import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { endsWith, find, get } from 'lodash'

import { NavigationItem } from '../../../types/naviagtion'
import SidebarMenu from '../../sidebarMenu'

const OverView = { title: 'Overview', url: '/' }

const MenuConfig: Array<NavigationItem> = [
  OverView,
  { title: 'Company info', url: '/company-info' },
  { title: 'Risk analysis', url: '/risk-analysis' },
  { title: 'Shipping data', url: '/shipping-data', badgeContent: 2 },
  { title: 'Audit & compliance', url: '/test', disabled: true },
  { title: 'Certifications', url: '/certification' },
  { title: 'Facilities', url: '/facilities' },
  { title: 'Sustainability & ESG', url: '/sustainability-esg' },
  { title: 'Surveys', url: '/survey', badgeContent: 2 },
  { title: 'Other buyers', url: '/test', disabled: true },
  { title: 'Serai profile', url: '/partners', disabled: true },
]

const Menu = () => {
  const router = useRouter()
  const id = get(router.query, 'id', '')
  const currentPath = router.pathname

  const startPath = useMemo(() => {
    return `/partners/${id}`
  }, [id])

  const currentActivePath = useMemo(() => {
    const currentItem = find(MenuConfig, ({ url }) => endsWith(currentPath, url)) || OverView
    return currentItem.url
  }, [currentPath])

  return (
    <SidebarMenu
      menuConfig={MenuConfig}
      currentActivePath={currentActivePath}
      onClick={url => router.push(`${startPath}${url}`)}
    />
  )
}
export default Menu
