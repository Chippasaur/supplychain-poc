import Image from 'next/image'
import cls from 'classnames'

import styles from './index.module.scss'
import { CompositeCreditAppraisal } from '../../../shared/enum/compositeCreditAppraisal'

interface CompositeCreditAppraisalProps {
  compositeCreditAppraisal: CompositeCreditAppraisal
}

export default function CompositeCreditAppraisalComponent({ compositeCreditAppraisal }: CompositeCreditAppraisalProps) {
  return (
    <div className={styles.rainbowBar}>
      <div
        className={cls(
          styles.rainbowTriangle,
          compositeCreditAppraisal === CompositeCreditAppraisal.Fair && styles.fair,
          compositeCreditAppraisal === CompositeCreditAppraisal.Good && styles.good,
          compositeCreditAppraisal === CompositeCreditAppraisal.High && styles.high,
        )}
      />
      <Image src={'/images/rainbowBar.png'} width={411} height={4} />
      <div className={styles.compositeCreditAppraisal}>
        <div className={styles.index}>
          <span>4</span>
          <span>Limited</span>
        </div>
        <div className={cls(styles.index, styles.center)}>
          <span>3</span>
          <span>Fair</span>
        </div>
        <div className={cls(styles.index, styles.center)}>
          <span>2</span>
          <span>Good</span>
        </div>
        <div className={cls(styles.index, styles.end)}>
          <span>1</span>
          <span>High</span>
        </div>
      </div>
    </div>
  )
}
