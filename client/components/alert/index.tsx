import React, { useState } from 'react'
import Image from 'next/image'
import cls from 'classnames'
import { filter, includes, get } from 'lodash'
import { useRouter } from 'next/router'

import styles from './index.module.scss'
import Filter from '../../components/filter'
import { dateTimeFormatter } from '../../utils/format'
import { AlertResponse } from '../../../shared/response'
import { AlertLevel } from '../../../shared/enum/alertLevel'
import { AlertType } from '../../../shared/enum/alertType'

interface AlertProps {
  alerts: Array<AlertResponse>
  containerClassName?: string
  itemClassName?: string
}

interface LevelLabel {
  [key: string]: string
}

interface LevelStyle {
  [key: string]: string
}

const levelLabel: LevelLabel = {
  [AlertLevel.ALL]: 'All Level',
  [AlertLevel.LOW]: 'Low Risk',
  [AlertLevel.MEDIUM]: 'Medium Risk',
  [AlertLevel.HIGH]: 'High Risk',
}

const levelStyle: LevelStyle = {
  [AlertLevel.LOW]: styles.low,
  [AlertLevel.MEDIUM]: styles.medium,
  [AlertLevel.HIGH]: styles.high,
}

const pathMap = {
  [AlertType.OverallBusinessRiskChanged]: 'risk-analysis',
  [AlertType.SupplyChainChanged]: 'facilities',
  [AlertType.ContributorChanged]: 'facilities',
  [AlertType.FEMScoreChanged]: 'sustainability-esg',
  [AlertType.EmissionsToAirScoreChanged]: 'sustainability-esg',
  [AlertType.EnergyAndGHGEmissionsScoreChanged]: 'sustainability-esg',
  [AlertType.WaterUseScoreChanged]: 'sustainability-esg',
  [AlertType.WasteWaterScoreChanged]: 'sustainability-esg',
  [AlertType.WasteScoreChanged]: 'sustainability-esg',
  [AlertType.EMSScoreChanged]: 'sustainability-esg',
  [AlertType.ChemicalManagementScoreChanged]: 'sustainability-esg',
  [AlertType.CreditScoreChanged]: 'risk-analysis',
}

export const sourceMap = {
  TrafficLight: {
    src: '/images/trafficLight.png',
    width: 0,
    height: 0,
  },
  Higg: {
    src: '/images/higgIndex.png',
    width: 36,
    height: 18,
  },
  'D&B': {
    src: '/images/dAndB.png',
    width: 28,
    height: 16,
  },
  OAR: {
    src: '/images/openApparelRegistry.png',
    width: 60,
    height: 20,
  },
}

const Alert = (props: AlertProps) => {
  const { alerts, containerClassName, itemClassName } = props
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState(null)
  const [level, setLevel] = useState(AlertLevel.ALL)
  const handleClick = (event: any) => setAnchorEl(event.currentTarget)
  const handleClose = (event: any) => {
    setAnchorEl(null)
    if (includes(Object.values(AlertLevel), event.currentTarget.dataset.value)) {
      setLevel(event.currentTarget.dataset.value)
    }
  }

  const navigatePage = (alert: AlertResponse) => {
    router.push(`/partners/${alert.supplierId}/${pathMap[alert.type]}`)
  }

  const getAlerts = () => {
    const alertFilter = (alert: AlertResponse) => level === AlertLevel.ALL || level === alert.level
    return filter(alerts, alertFilter).map(alert => {
      const sourceImage = get(sourceMap, alert.source)
      return (
        <div
          key={alert.id}
          className={cls(styles.alert, itemClassName, {
            [styles.highRiskBackground]: alert.level === AlertLevel.HIGH,
            [styles.background]: alert.level !== AlertLevel.HIGH,
          })}
          onClick={() => navigatePage(alert)}>
          <span className={styles.date}>{dateTimeFormatter(alert.postedAt)}</span>
          <div className={styles.level}>
            <span>Level: </span>
            <span className={levelStyle[alert.level]}>{alert.level}</span>
          </div>
          <span className={styles.content} dangerouslySetInnerHTML={{ __html: alert.content }} />
          <div className={styles.source}>
            Source:{' '}
            {sourceImage ? (
              <Image src={sourceImage.src} width={sourceImage.width} height={sourceImage.height} />
            ) : (
              alert.source
            )}
          </div>
        </div>
      )
    })
  }

  return (
    <div className={styles.wrapper}>
      <Filter
        level={level}
        levels={levelLabel}
        levelEnum={AlertLevel}
        onClick={handleClick}
        onClose={handleClose}
        anchorEl={anchorEl}
        style={styles.filter}
      />
      <div className={cls(styles.container, containerClassName)}>{getAlerts()}</div>
    </div>
  )
}

export default Alert
