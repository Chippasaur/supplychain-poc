import React from 'react'
import cls from 'classnames'
import { inRange } from 'lodash'

import styles from './index.module.scss'
import { Level } from '../../index'
import { DAndBLevel } from '../../../../../shared/enum/dAndBLevel'
import { CustomerLinearProgress } from '../../../linearProgress'

interface Props {
  level: number
}

const dAndBLevel: Level = {
  [DAndBLevel.Low]: {
    message: 'Low',
    style: styles.levelLow,
    level: 1,
  },
  [DAndBLevel.Moderate]: {
    message: 'Moderate',
    style: styles.levelModerate,
    level: 2,
  },
  [DAndBLevel.High]: {
    message: 'High',
    style: styles.levelHigh,
    level: 3,
  },
  [DAndBLevel.Severe]: {
    message: 'Severe',
    style: styles.levelSevere,
    level: 4,
  },
  [DAndBLevel.OutOfBusiness]: {
    message: 'Out of Business',
    style: styles.levelOutOfBusiness,
    level: 5,
  },
  [DAndBLevel.Undetermined]: {
    message: 'Undetermined',
    style: styles.levelUndetermined,
    level: 6,
  },
  [DAndBLevel.Unavailable]: {
    message: 'Unavailable',
    style: styles.levelUnavailable,
    level: 7,
  },
}

const DAndB = ({ level }: Props) => {
  const isValid = () => {
    return inRange(level, DAndBLevel.Low, DAndBLevel.OutOfBusiness)
  }

  return (
    <>
      <div className={styles.container}>
        <p className={styles.content}>Overall Business Risk</p>
        {isValid() && <p className={cls(styles.level, dAndBLevel[level].style)}>{dAndBLevel[level].message}</p>}
      </div>
      <CustomerLinearProgress level={level} />
    </>
  )
}

export default DAndB
