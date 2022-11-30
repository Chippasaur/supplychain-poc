import React from 'react'

import SupplierMap from '../../partners/map/supplierMap'
import styles from './index.module.scss'
import { useSuppliers } from '../../../utils/hooks'

const CompanyOverview = () => {
  const data = useSuppliers()
  const containerStyle = { height: '299px', width: '100%' }
  const controllers = {
    containZoomController: true,
    containSearchBar: false,
    containLegend: false,
    containPopUp: false,
    containStatistics: true,
  }
  return (
    <div className={styles.companyOverview}>
      <div className={styles.map}>
        <SupplierMap suppliers={data} controllers={controllers} mapContainerStyle={containerStyle} />
      </div>
    </div>
  )
}
export default CompanyOverview
