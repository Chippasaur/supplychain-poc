import React from 'react'
import Image from 'next/image'

import styles from './index.module.scss'
import ExportOption from '../partners/exportOption'

export default function Certification() {
  const certificates = ['/images/certification1.png', '/images/certification2.png']

  return (
    <div className={styles.certification}>
      <div className={styles.header}>
        <span className={styles.title}>Certifications</span>
        <ExportOption />
      </div>
      <div className={styles.body}>
        {certificates.map(certificate => {
          return (
            <div key={certificate} className={styles.certificateCard}>
              <Image src={certificate} width={280} height={200} />
              <div className={styles.name}>Certificate of Appreciation</div>
              <div>
                <span className={styles.issueDate}>Issue Date</span>
                <span className={styles.date}>2020.06.06</span>
              </div>
              <div>
                <span className={styles.expiryDate}>Expiry Date</span>
                <span className={styles.date}>2022.06.06</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
