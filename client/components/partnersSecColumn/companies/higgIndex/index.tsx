import React from 'react'

import styles from './index.module.scss'
import { BorderLinearProgress } from '../../../linearProgress'

interface Props {
  selfAssessment: number
  verified: number
}

const HiggIndex = ({ selfAssessment, verified }: Props) => {
  const renderView = (data: number) => {
    return (
      <>
        <BorderLinearProgress className={styles.progress} variant="determinate" value={data} />
        <label className={styles.data}>{data}%</label>
      </>
    )
  }

  return (
    <>
      <div className={styles.view}>
        <p className={styles.title}>Self-Assessment - Posted</p>
        {renderView(selfAssessment)}
      </div>
      <div className={styles.view}>
        <p className={styles.title}>Verified - Posted</p>
        {renderView(verified)}
      </div>
    </>
  )
}

export default HiggIndex
