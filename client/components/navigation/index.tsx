import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { map } from 'lodash'
import cls from 'classnames'

import styles from './index.module.scss'

export interface NavigationActionsProps {
  title: string
  icon?: React.ReactNode
  action?: () => void
  disabled?: boolean
  path: string
}

export interface NavigationProps {
  avatarUri?: string
  userActionNode?: React.ReactNode
  navigationActions?: NavigationActionsProps[]
  currentActivePath?: string
  logo?: React.ReactNode
}

export default function Navigation(props: NavigationProps) {
  const { logo, avatarUri, userActionNode, navigationActions, currentActivePath } = props
  const [currentPath, setCurrentPath] = useState(currentActivePath)

  useEffect(() => {
    setCurrentPath(currentActivePath)
  }, [currentActivePath])

  const handleClick = (item: NavigationActionsProps) => {
    if (item.disabled) {
      return
    }
    setCurrentPath(item.path)
    item.action && item.action()
  }
  return (
    <div className={styles.navigationBar}>
      {!!logo && <div className={styles.headerTitle}>{logo}</div>}
      <div className={styles.menus}>
        {map(navigationActions, item => (
          <div
            key={item.title}
            className={cls(styles.item, {
              [styles.active]: item.path === currentPath,
              [styles.disable]: item.disabled,
            })}
            onClick={() => handleClick(item)}>
            {item.icon}
            <span className={styles.link}>{item.title}</span>
          </div>
        ))}
        <div className={styles.message}>
          {avatarUri && <Avatar src={avatarUri} className={styles.avatar} />}
          {userActionNode}
        </div>
      </div>
    </div>
  )
}
