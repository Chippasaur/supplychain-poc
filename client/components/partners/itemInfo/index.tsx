import React, { ReactNode } from 'react'

import styles from './index.module.scss'
import ItemTitle from '../itemTitle'
import NoDataText from '../../noDataText'

type Props = {
  title: string
  view?: boolean | string
} & (
  | {
      children: ReactNode
      info?: never
    }
  | {
      children?: never
      info: string | undefined
    }
)

const ItemInfo = ({ title, info, view, children }: Props) => {
  return (
    <div>
      <ItemTitle view={view}>{title}</ItemTitle>
      <p className={styles.info}>{info || children || <NoDataText />}</p>
    </div>
  )
}
export default ItemInfo
