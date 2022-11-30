import { ListChildComponentProps } from 'react-window'
import React, { ReactNode } from 'react'

import styles from './index.module.scss'
import { formatNumberWithUnit } from '../../../../utils/format'

interface Props extends ListChildComponentProps {
  children: ReactNode
}
function ShipmentListItem(props: Props) {
  const { index, style, data, children } = props
  const { volume, value } = data[index]

  return (
    <div style={style} key={index} className={styles.buyerRow}>
      {children}
      <div className={styles.shipment}>
        <span>{volume} </span>shipments
      </div>
      <div className={styles.val}>$ {formatNumberWithUnit(value, '0.[0]')}</div>
    </div>
  )
}
export default ShipmentListItem
