import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'
import { find, startsWith } from 'lodash'
import Image from 'next/image'

import Icon from '../icon'
import styles from './index.module.scss'
import { useCustomerData } from '../../utils/hooks'
import { useFetchUserInfo } from '../../utils/api'
import Navigation from '../navigation'

const NavigationBar = () => {
  const router = useRouter()
  const currentPath = router.pathname

  useFetchUserInfo()
  const { logoUri: avatarUri } = useCustomerData()

  const HomeConfig = {
    title: 'Dashboard',
    icon: <Icon type="dashboard" size={20} />,
    action: () => router.push('/'),
    path: '/',
  }
  const navigationActions = [
    HomeConfig,
    {
      title: 'Partners',
      icon: <Icon type="partner" size={20} />,
      action: () => router.push('/partners'),
      path: '/partners',
    },
    { title: 'Surveys', icon: <Icon type="survey" size={20} />, disabled: true, path: '/test' },
    { title: 'Products', icon: <Icon type="product" size={20} />, disabled: true, path: '/test' },
    { title: 'Alerts', icon: <Icon type="alert" size={20} />, disabled: true, path: '/test' },
  ]

  const currentActivePath = useMemo(() => {
    const currentItem =
      find(navigationActions, ({ path }) => path !== HomeConfig.path && startsWith(currentPath, path)) || HomeConfig
    return currentItem.path
  }, [currentPath])

  return (
    <Navigation
      avatarUri={avatarUri}
      userActionNode={
        <div className={styles.navigationRightButton}>
          <span>Back to Serai</span>
          <Icon type={'back'} size={14} className={styles.icon} />
        </div>
      }
      logo={<Image src={'/images/logo.png'} alt="logo" width={60} height={60} />}
      navigationActions={navigationActions}
      currentActivePath={currentActivePath}
    />
  )
}
export default memo(NavigationBar)
