import { map, values, keys } from 'lodash'
import React from 'react'
import cls from 'classnames'

import styles from './index.module.scss'
import { FinancialStrength } from '../../../shared/enum/financialStrength'

export const strengthsMap = {
  [FinancialStrength.HH]: {
    backgroundColor: '#D6D6D7',
    name: 'HH',
  },
  [FinancialStrength.GG]: {
    backgroundColor: '#CCCCCC',
    name: 'GG',
  },
  [FinancialStrength.FF]: {
    backgroundColor: '#BDBDBF',
    name: 'FF',
  },
  [FinancialStrength.EE]: {
    backgroundColor: '#B0B0B0',
    name: 'EE',
  },
  [FinancialStrength.DD]: {
    backgroundColor: '#9E9E9E',
    name: 'DD',
  },
  [FinancialStrength.DC]: {
    backgroundColor: '#949391',
    name: 'DC',
  },
  [FinancialStrength.CC]: {
    backgroundColor: '#888687',
    name: 'CC',
  },
  [FinancialStrength.CB]: {
    backgroundColor: '#7A7879',
    name: 'CB',
  },
  [FinancialStrength.BB]: {
    backgroundColor: '#737172',
    name: 'BB',
  },
  [FinancialStrength.BA]: {
    backgroundColor: '#615F60',
    name: 'BA',
  },
  [FinancialStrength['1A']]: {
    backgroundColor: '#4E4C4D',
    name: '1A',
  },
  [FinancialStrength['2A']]: {
    backgroundColor: '#3F3D3E',
    name: '2A',
  },
  [FinancialStrength['3A']]: {
    backgroundColor: '#353334',
    name: '3A',
  },
  [FinancialStrength['4A']]: {
    backgroundColor: '#252422',
    name: '4A',
  },
  [FinancialStrength['5A']]: {
    backgroundColor: '#21201E',
    name: '5A',
  },
}

interface FinancialStrengthsProps {
  strength: FinancialStrength
}

export default function FinancialStrengths({ strength }: FinancialStrengthsProps) {
  return (
    <div className={styles.strengthBar}>
      {map(values(strengthsMap), ({ backgroundColor, name }, index) => (
        <div className={styles.strength} key={name}>
          <div className={cls(styles.strengthTriangle, index === strength && styles.selected)} />
          <div className={styles.bar} style={{ background: backgroundColor }} />
          <div className={styles.text}>{name}</div>
        </div>
      ))}
    </div>
  )
}
