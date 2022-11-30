import { isEmpty } from 'lodash'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useState } from 'react'

import Legend from '../legend'
import { LEGENDS, MAP_EXTRA_LEGENDS } from '../legend/legends'
import SupplierMap from './supplierMap'
import styles from './index.module.scss'
import LoadingProgress from '../../loadingProgress'
import { Mode } from '../../../utils/network/modeCondition'
import { mapContainerStyle } from '../../../utils/map/shareData'
import { isFilterMode, isFreeMode } from '../network/graph/conditions'
import { CustomerSuppliersResponse } from '../../../../shared/response'

interface PartnersProps {
  suppliers: CustomerSuppliersResponse[]
  mode: Mode
}

const SupplierMapWithAllController = ({ suppliers, mode }: PartnersProps) => {
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true)
  const controllers = {
    containZoomController: true,
    containSearchBar: true,
    containLegend: true,
    containPopUp: true,
    containStatistics: false,
  }

  useEffect(() => {
    if (suppliers.length || isFilterMode(mode)) {
      setLoadingStatus(false)
    }
    return () => setLoadingStatus(isEmpty(suppliers) && isFreeMode(mode))
  }, [suppliers, mode])

  return (
    <div className={styles.mapContainer}>
      {loadingStatus ? (
        <div className={styles.loading}>
          <LoadingProgress />
        </div>
      ) : (
        <SupplierMap suppliers={suppliers} controllers={controllers} mapContainerStyle={mapContainerStyle} />
      )}
      <Legend legends={[...Object.values(LEGENDS), ...Object.values(MAP_EXTRA_LEGENDS)]} />
    </div>
  )
}

export default SupplierMapWithAllController
