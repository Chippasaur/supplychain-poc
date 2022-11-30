import { HTMLAttributes, ReactNode } from 'react'
import cls from 'classnames'

import styles from './index.module.scss'
interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  info: string
  className?: string
  index?: number
}
const HoverWithInfo = ({ children, className, info, index, ...props }: Props) => {
  return (
    <div className={cls(styles.wrapper, className)} {...props}>
      {children}
      <div className={cls(styles.hoverInfo, { [styles.hoverInfoTop]: index && index > 5 })}>{info}</div>
    </div>
  )
}
export default HoverWithInfo
