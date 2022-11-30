import React from 'react'
import Link from 'next/link'
import cls from 'classnames'

import styles from './item.module.scss'
import { NavigationItem } from '../../types/naviagtion'
import Icon from '../icon'

interface Props extends NavigationItem {
  isActive: boolean
}

const Item = ({ title, url, isActive, iconType, disabled }: Props) => {
  return (
    <div
      className={cls(styles.item, {
        [styles.active]: isActive,
        [styles.disable]: disabled,
      })}>
      {iconType && (
        <Icon
          type={iconType}
          size={20}
          className={cls(styles.icon, isActive && styles.iconActive, disabled && styles.iconDisabled)}
        />
      )}
      <Link href={url}>
        <a className={cls(disabled && styles.linkDisabled)}>{title}</a>
      </Link>
    </div>
  )
}
export default Item
