import cls from 'classnames'
import Image from 'next/image'
import { Doughnut } from 'react-chartjs-2'
import { find, map, get, chain, sum } from 'lodash'

import styles from './index.module.scss'
import { DAndBLevel } from '../../../shared/enum/dAndBLevel'
import { useOverallBusinessRiskCounts } from '../../utils/hooks'
import { CreditRiskCountResponse } from '../../../shared/response'

interface RiskCountProps {
  type: DAndBLevel
  name: string
  count: number
  className: string
}

const riskCategories = [
  {
    type: DAndBLevel.Low,
    name: 'Low Risk',
    style: {
      className: styles.low,
      backgroundColor: '#69c568',
    },
  },
  {
    type: DAndBLevel.Moderate,
    name: 'Moderate Risk',
    style: {
      className: styles.moderate,
      backgroundColor: '#ffc341',
    },
  },
  {
    type: DAndBLevel.High,
    name: 'High Risk',
    style: {
      className: styles.high,
      backgroundColor: '#ec6660',
    },
  },
  {
    type: DAndBLevel.Severe,
    name: 'Severe Risk',
    style: {
      className: styles.severe,
      backgroundColor: '#b54039',
    },
  },
  {
    type: DAndBLevel.OutOfBusiness,
    name: 'Out of Business',
    style: {
      className: styles.outOfBusiness,
      backgroundColor: '#333333',
    },
  },
  {
    type: DAndBLevel.Undetermined,
    name: 'Undetermined',
    style: {
      className: styles.undetermined,
      backgroundColor: '#bcc9db',
    },
  },
  {
    type: DAndBLevel.Unavailable,
    name: 'Risk Data Unavailable',
    style: {
      className: styles.unavailable,
      backgroundColor: '#d6e0e3',
    },
  },
]

const completeZeroCounts = (riskCounts: CreditRiskCountResponse[]) => {
  const completeCounts: CreditRiskCountResponse[] = []
  completeCounts.push(...riskCounts)
  for (let dAndBLevel = 0; dAndBLevel < DAndBLevel.Unavailable; dAndBLevel++) {
    if (!find(riskCounts, { level: dAndBLevel })) {
      completeCounts.push({
        level: dAndBLevel,
        count: 0,
      })
    }
  }
  return completeCounts
}

export const RiskCount = (props: RiskCountProps) => {
  return (
    <div className={styles.countRow}>
      <span className={cls(styles.signal, props.className)} />
      <span className={styles.name}>{props.name}</span>
      <span className={styles.count}>{props.count.toLocaleString()}</span>
    </div>
  )
}

export default function OverallBusinessRisk() {
  const riskCounts = useOverallBusinessRiskCounts()
  const completeCounts = completeZeroCounts(riskCounts)
  const counts = chain(completeCounts)
    .sortBy(riskCount => riskCount.level)
    .map(riskCount => riskCount.count)
    .value()
  const totalPartners = sum(counts)
  const backgroundColors = chain(riskCategories)
    .mapValues(levelStyle => levelStyle.style.backgroundColor)
    .values()
    .value()
  const options = {
    tooltips: {
      enabled: false,
    },
    cutoutPercentage: 56,
  }
  const data = {
    datasets: [
      {
        data: counts,
        backgroundColor: backgroundColors,
        borderWidth: 0,
      },
    ],
  }

  return (
    <>
      <div className={styles.header}>
        <Image src={'/images/dAndB.png'} width={45} height={25} />
      </div>
      <div className={styles.riskCountContainer}>
        <div className={styles.riskCounts}>
          {map(riskCategories, risk => (
            <RiskCount
              key={risk.type}
              type={risk.type}
              className={risk.style.className}
              name={risk.name}
              count={get(find(riskCounts, { level: risk.type }), 'count', 0)}
            />
          ))}
        </div>
        <div className={styles.riskChart}>
          <div className={styles.chartCenter}>
            <span>Total</span>
            <span className={styles.partnerCounts}>{totalPartners.toLocaleString()}</span>
            <span className={styles.partnerCountsDesc}>Facilities</span>
          </div>
          <Doughnut height={168} width={168} data={data} options={options} />
        </div>
      </div>
    </>
  )
}
