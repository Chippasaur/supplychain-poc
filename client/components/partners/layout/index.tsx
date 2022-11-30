import React from 'react'
import Link from 'next/link'
import { map } from 'lodash'

import Menu from '../menu'
import Header from './header'
import Icon from '../../icon'
import styles from './index.module.scss'

interface RouteConfig {
  path: string
  name: string
}

interface Props {
  children: React.ReactNode
  breadcrumbs?: {
    routes: Array<RouteConfig>
    current: string
  }
}

const Breadcrumbs = {
  routes: [{ path: '/partners', name: 'Partners' }],
  current: 'Partner information',
}

const Layout = ({ children }: Props) => {
  const { routes, current } = Breadcrumbs
  return (
    <div className={styles.layout}>
      <h2>
        {map(routes, ({ name, path }) => (
          <Link href={path} key={path}>
            {name}
          </Link>
        ))}
        <Icon type={'arrow-right'} size={12} />
        {current}
      </h2>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Menu />
          {children}
        </div>
      </div>
    </div>
  )
}
export default Layout
