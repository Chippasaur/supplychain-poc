import React from 'react'
import moment from 'moment'
import { map, first, last } from 'lodash'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'

import Layout from '../../../../client/components/partners/layout'
import styles from './index.module.scss'
import Detail from '../../../../client/components/partners/shippingData/detail'
import LineChart from '../../../../client/components/partners/shippingData/chart'
import { useShipmentsChartData, useShipmentsData } from '../../../../client/utils/hooks'

const ShippingData = () => {
  const chartData = useShipmentsChartData()
  const { shipmentRecords, totalShipments, averageValue } = useShipmentsData()
  const dates = map(chartData, 'shipmentDate').sort()
  const firstDay = first(dates)
  const lastDay = last(dates)

  return (
    <Layout>
      <div className={styles.shippingData}>
        <h2>Shipping data</h2>
        <div className={styles.date}>
          <div className={styles.dateItem}>
            {moment(firstDay).format('YYYY-MM-DD')} <CalendarTodayIcon fontSize="inherit" />
          </div>
          <div className={styles.divider} />
          <div className={styles.dateItem}>
            {moment(lastDay).format('YYYY-MM-DD')} <CalendarTodayIcon fontSize="inherit" />
          </div>
        </div>
        <div className={styles.info}>
          <LineChart
            chartData={chartData}
            totalShipments={totalShipments}
            averageValue={averageValue}
            firstDay={firstDay}
            lastDay={lastDay}
          />
          <Detail shipmentRecords={shipmentRecords} />
        </div>
      </div>
    </Layout>
  )
}
export default ShippingData
