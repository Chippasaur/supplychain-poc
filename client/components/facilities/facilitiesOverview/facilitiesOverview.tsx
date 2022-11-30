import { uniq, compact } from 'lodash'
import React from 'react'

import styles from './facilitiesOverview.module.scss'
import { FacilityResponse } from '../../../../shared/response'

interface FacilitiesOverviewProps {
  facilities: Array<FacilityResponse>
}

const FacilitiesOverview = ({ facilities }: FacilitiesOverviewProps) => {
  return (
    <div className={styles.facilitiesOverview}>
      <div>
        <span className={styles.number}>{facilities.length}</span>
        <span>Facilities</span>
      </div>
      <div className={styles.supplyChain}>in your supply chain</div>
      <div className={styles.locationsTitle}>Locations of facilities</div>
      <div className={styles.locationsContent}>
        {uniq(compact(facilities.map(facility => facility.location?.region))).join(', ')}
      </div>
    </div>
  )
}

export default FacilitiesOverview
