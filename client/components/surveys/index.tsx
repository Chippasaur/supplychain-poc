import Image from 'next/image'

import ExportOption from '../partners/exportOption'
import styles from './index.module.scss'

export default function SurveysContent() {
  return (
    <div className={styles.surveys}>
      <div className={styles.header}>
        <p>Surveys</p>
        <ExportOption />
      </div>
      <Image src="/images/surveys.png" width={1000} height={640} />
    </div>
  )
}
