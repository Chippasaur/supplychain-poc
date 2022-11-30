import Image from 'next/image'

import styles from './index.module.scss'

interface ViabilityScoreProps {
  viabilityScore: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}

const left = {
  9: 0,
  8: 51,
  7: 101,
  6: 151,
  5: 202,
  4: 252,
  3: 302,
  2: 352,
  1: 403,
}

export default function ViabilityScore({ viabilityScore }: ViabilityScoreProps) {
  return (
    <div className={styles.viabilityScore}>
      <div className={styles.viabilityTriangle} style={{ left: `${left[viabilityScore]}px` }} />
      <Image src={'/images/rainbowBar.png'} width={411} height={4} />
      <div className={styles.between}>
        <span>9</span>
        <span>5</span>
        <span>1</span>
      </div>
      <div className={styles.between}>
        <span>High risk</span>
        <span>Low risk</span>
      </div>
    </div>
  )
}
