import React from 'react'

import styles from './supplierStatisticsButton.module.scss'
import { formatNumber } from '../../../utils/format'
import { EntityType } from '../../../../shared/enum/entityType'

export interface SupplierStatisticButtonProp {
  statisticsNum: number | undefined
  statisticsType: EntityType
  isActivated: boolean
  onSelectFilter: any
}

const SupplierStatisticsButton = ({
  statisticsNum,
  statisticsType,
  isActivated,
  onSelectFilter,
}: SupplierStatisticButtonProp) => {
  return (
    <div
      className={isActivated ? styles.statisticsButtonSelected : styles.statisticsButton}
      onClick={() => onSelectFilter(statisticsType)}>
      <p className={styles.label}>{formatNumber(statisticsNum)}</p>
      <p className={styles.description}>{statisticsType == EntityType.Group ? 'Partners' : 'Facilities'}</p>
    </div>
  )
}

export default SupplierStatisticsButton
