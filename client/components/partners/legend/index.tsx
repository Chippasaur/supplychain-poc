import { map } from 'lodash'
import { ReactNode } from 'react'

import Icon from '../../icon'
import styles from './index.module.scss'

interface LegendValue {
  name: string
  color?: string
  icon?: ReactNode
}

export interface LegendProps {
  legends: LegendValue[]
}

const Legend = ({ legends }: LegendProps) => {
  return (
    <div className={styles.legend}>
      <p className={styles.title}>Category</p>
      {legends &&
        map(legends, (v, k) => {
          return (
            <div key={k} className={styles.labels}>
              {v.icon || <Icon type={'dot'} size={12} color={v.color} />}
              <span>{v.name}</span>
            </div>
          )
        })}
    </div>
  )
}

export default Legend
