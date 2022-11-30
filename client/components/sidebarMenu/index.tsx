import { useEffect, useState } from 'react'
import { map } from 'lodash'
import cls from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'

import styles from './index.module.scss'

const StyledBadge = withStyles(() => ({
  badge: {
    height: 16,
    width: 16,
    minWidth: 16,
    right: -15,
    top: 5,
    backgroundColor: '#D0021B',
    color: 'white',
    fontSize: 11,
    fontFamily: 'HeroNew',
  },
}))(Badge)

export interface SidebarMenuProps {
  menuConfig: {
    title: string
    url: string
    badgeContent?: number
    disabled?: boolean
  }[]
  currentActivePath?: string
  onClick?: (path: string) => void
}

export default function SidebarMenu({ menuConfig, currentActivePath, onClick }: SidebarMenuProps) {
  const [currentPath, setCurrentPath] = useState(currentActivePath)

  useEffect(() => {
    setCurrentPath(currentActivePath)
  }, [currentActivePath])

  const handleClick = (url: string, disabled: boolean | undefined) => {
    if (disabled) {
      return
    }
    setCurrentPath(url)
    onClick && onClick(url)
  }

  return (
    <div className={styles.menu}>
      {map(menuConfig, ({ url, title, badgeContent, disabled }) => (
        <div
          key={title}
          className={cls(styles.link, {
            [styles.active]: currentPath === url,
            [styles.disabled]: disabled,
          })}
          onClick={() => handleClick(url, disabled)}>
          <StyledBadge badgeContent={badgeContent}>
            <span className={cls(disabled && styles.disabledLink)}>{title}</span>
          </StyledBadge>
        </div>
      ))}
    </div>
  )
}
