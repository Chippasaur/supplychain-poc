import React, { CSSProperties } from 'react'

import styles from './index.module.scss'

interface Props {
  style?: CSSProperties
  children: React.ReactNode
}

const TipCard = (props: Props) => {
  const { style, children } = props
  return (
    <div className={styles.layout} style={style}>
      <div className={styles.border}>
        <div className={styles.arrow}></div>
      </div>
      {children}
    </div>
  )
}

export default TipCard
