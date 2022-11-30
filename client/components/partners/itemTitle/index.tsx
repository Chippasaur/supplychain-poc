import React from 'react'
import { isString } from 'lodash'

import styles from './index.module.scss'

interface Props {
  children: React.ReactNode
  view?: string | boolean
}
const ItemTitle = ({ children, view }: Props) => {
  return (
    <p className={styles.itemTitle}>
      <span>{children}</span>
      {view && <span className={styles.view}> {isString(view) ? view : 'View'} </span>}
    </p>
  )
}
export default ItemTitle
