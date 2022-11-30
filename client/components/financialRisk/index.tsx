import cls from 'classnames'
import Image from 'next/image'
import { get, map, find } from 'lodash'

import styles from './index.module.scss'
import { useFinancialRiskCount } from '../../utils/hooks'
import { TrafficLightLevel } from '../../../shared/enum/trafficLightLevel'

interface TrafficRiskLevelProps {
  imgSrc: string
  name: string
  type: TrafficLightLevel
  description?: string
  count: number
  className?: string
}

export const TrafficCount = (props: TrafficRiskLevelProps) => {
  return (
    <div className={styles.countRow}>
      <div className={styles.countLeft}>
        <div className={styles.countLogo}>
          <Image src={props.imgSrc} className={styles.logo} width={20} height={20} />
          <span className={cls(styles.name, props.className)}>{props.name}</span>
        </div>
        {!!props.description && <span className={styles.description}>{props.description}</span>}
      </div>
      <span className={cls(styles.count, { [styles.unavailable]: props.type === TrafficLightLevel.Unavailable })}>
        {props.count.toLocaleString()}
      </span>
    </div>
  )
}

const financialRiskCountMap = [
  {
    type: TrafficLightLevel.Safe,
    name: 'Safe',
    description: 'You can relax, these companies are a reliable partner',
    imgSrc: '/images/levelSafe.png',
    className: styles.safe,
  },
  {
    type: TrafficLightLevel.AverageRisk,
    name: 'Average Risk',
    description: 'Factor in the risk profile of your partner in the terms of transaction',
    imgSrc: '/images/levelAverageRisk.png',
    className: styles.averageRisk,
  },
  {
    type: TrafficLightLevel.ElevatedRisk,
    name: 'Elevated Risk',
    description: 'Take precautions to protect yourself',
    imgSrc: '/images/levelElevatedRisk.png',
    className: styles.elevateRisk,
  },
  {
    type: TrafficLightLevel.Caution,
    name: 'Caution',
    description: 'Company closed',
    imgSrc: '/images/levelCaution.png',
    className: styles.caution,
  },
  {
    type: TrafficLightLevel.Unavailable,
    name: 'Data Unavailable',
    imgSrc: '/images/levelUnavailable.png',
    className: styles.dataUnavailable,
  },
]

export default function FinancialRisk() {
  const riskCount = useFinancialRiskCount()
  return (
    <>
      <div className={styles.header}>
        <Image src={'/images/trafficLight.png'} width={0} height={0} />
        {/*<span className={styles.middleText}>by</span>*/}
        <Image src={'/images/eh.png'} width={0} height={0} />
      </div>
      <div className={styles.numOfCompany}># of company</div>
      {map(financialRiskCountMap, risk => (
        <TrafficCount
          key={risk.type}
          name={risk.name}
          type={risk.type}
          count={get(find(riskCount, { level: risk.type }), 'count', 0)}
          imgSrc={risk.imgSrc}
          description={risk.description}
          className={risk.className}
        />
      ))}
    </>
  )
}
