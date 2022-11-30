import React from 'react'
import cls from 'classnames'
import { head, upperFirst } from 'lodash'
import Avatar from '@material-ui/core/Avatar'

import styles from './companyAvatar.module.scss'

const getAvatarStyle = (firstLetter = 'A') => {
  const diff = firstLetter.charCodeAt(0) - 'A'.charCodeAt(0)
  switch (true) {
    case diff <= 4:
      return styles.avatarOrange
    case diff <= 9:
      return styles.avatarYellow
    case diff <= 14:
      return styles.avatarDarkOrange
    case diff <= 19:
      return styles.avatarBlue
    default:
      return styles.avatarGreen
  }
}

interface companyAvatarProps {
  name: string
  className?: string
}

const CompanyAvatar = ({ name, className }: companyAvatarProps) => {
  const firstLetter = head(upperFirst(name))
  return <Avatar className={cls(styles.avatar, getAvatarStyle(firstLetter), className)}>{firstLetter}</Avatar>
}

export default CompanyAvatar
