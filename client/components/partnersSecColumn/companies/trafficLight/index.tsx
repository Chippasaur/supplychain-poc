import React from 'react'
import cls from 'classnames'
import Image from 'next/image'
import { inRange } from 'lodash'

import { Level } from '../../index'
import styles from './index.module.scss'
import { TrafficLightLevel } from '../../../../../shared/enum/trafficLightLevel'

interface Props {
  level: number
}

const trafficLightLevel: Level = {
  [TrafficLightLevel.Safe]: {
    title: 'Safe',
    style: styles.titleSafe,
    icon: '/images/levelSafe.png',
    content: 'You can relax, this company is a reliable partner',
  },
  [TrafficLightLevel.AverageRisk]: {
    title: 'Average risk',
    style: styles.titleAverageRisk,
    icon: '/images/levelAverageRisk.png',
    content: 'Factor in the risk profile of your partner in the terms of transaction',
  },
  [TrafficLightLevel.ElevatedRisk]: {
    title: 'Elevated risk',
    style: styles.titleElevatedRisk,
    icon: '/images/levelElevatedRisk.png',
    content: 'Take precautions to protect yourself',
  },
  [TrafficLightLevel.Caution]: {
    title: 'Caution',
    style: styles.titleCaution,
    icon: '/images/levelCaution.png',
    content: 'Company closed',
  },
  [TrafficLightLevel.Unavailable]: {
    title: 'Data Unavailable',
    style: styles.titleUnavailable,
    icon: '/images/levelUnavailable.png',
  },
}

const TrafficLight = ({ level }: Props) => {
  const isValid = () => {
    return inRange(level, TrafficLightLevel.Safe, TrafficLightLevel.Unavailable + 1)
  }

  const renderView = () => {
    return (
      <>
        <div className={styles.image}>
          <Image src={trafficLightLevel[level].icon} alt="logo" width={40} height={40} />
        </div>
        <div className={styles.view}>
          <p className={cls(styles.title, trafficLightLevel[level].style)}>{trafficLightLevel[level].title}</p>
          {!!trafficLightLevel[level].content && <p className={styles.content}>{trafficLightLevel[level].content}</p>}
        </div>
      </>
    )
  }

  return <div className={styles.container}>{isValid() && renderView()}</div>
}

export default TrafficLight
