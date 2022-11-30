import cls from 'classnames'
import { range, map, inRange } from 'lodash'
import LinearProgress from '@material-ui/core/LinearProgress'
import { createStyles, withStyles } from '@material-ui/core/styles'

import styles from './index.module.scss'
import { DAndBLevel } from '../../../shared/enum/dAndBLevel'

export const BorderLinearProgress = withStyles(() =>
  createStyles({
    root: {
      height: 6,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: '#F3F7F8',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#8CD552',
    },
  }),
)(LinearProgress)

interface Props {
  level: number
  className?: string
  progressBarClassName?: string
}

export const CustomerLinearProgress = ({ level, className, progressBarClassName }: Props) => {
  const levels = [styles.low, styles.moderate, styles.high, styles.severe]

  const isValid = () => {
    return inRange(level, DAndBLevel.Low, DAndBLevel.Unavailable + 1)
  }

  return (
    <div className={cls(styles.container, progressBarClassName)}>
      {isValid() &&
        map(range(0, 4), item => {
          return <div key={item} className={cls(styles.progress, className, item <= level && levels[level])} />
        })}
    </div>
  )
}
