import cls from 'classnames'
import { isNumber } from 'lodash'
import React, { CSSProperties, MouseEventHandler, useMemo } from 'react'

import styles from './index.module.scss'

interface IProps {
  type: string
  className?: string
  size?: number
  pointer?: boolean
  onClick?: MouseEventHandler
  onMouseOver?: MouseEventHandler
  onMouseOut?: MouseEventHandler
  color?: string
}

export const Icon = ({ type, className, size, pointer, color, ...props }: IProps) => {
  const style: CSSProperties = useMemo(() => {
    return isNumber(size) ? { fontSize: `${size}px`, color } : { color }
  }, [size, color])
  return (
    <i className={cls(styles.icon, `icon-${type}`, className, pointer && styles.pointer)} style={style} {...props} />
  )
}

Icon.displayName = 'Icon'

export default Icon
