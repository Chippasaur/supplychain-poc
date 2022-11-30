import cls from 'classnames'
import Image from 'next/image'
import React, { ReactNode } from 'react'

import styles from './index.module.scss'

interface Logo {
  source: string
  width: number
  height: number
}

interface Props {
  logo?: Logo
  secondLogo?: ReactNode
  children: React.ReactNode
  className?: string
  headerVisible?: boolean
}

const Layout = ({ logo, secondLogo, children, className, headerVisible = true }: Props) => {
  const renderLogo = () => {
    return (
      <div className={styles.logo}>
        {logo && <Image src={logo.source} alt="logo" width={logo.width} height={logo.height} />}
        {secondLogo}
      </div>
    )
  }

  return (
    <div className={cls(styles.box, className)}>
      {headerVisible && (
        <div className={styles.header}>
          {renderLogo()}
          <span className={styles.view}> View </span>
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}

export default Layout
