import React, { useState } from 'react'
import { map, slice, isEmpty } from 'lodash'

import styles from './index.module.scss'
import CompanyAvatar from '../partners/layout/companyAvatar'
import Icon from '../icon'
import OtherBuyerFullList from '../facilities/otherBuyerFullList'

interface Props {
  buyerNames: string[]
}

const Buyers = ({ buyerNames }: Props) => {
  const SHOW_LENGTH_NUM = 4
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <span className={styles.header}>Other Buyers</span>
      {map(slice(buyerNames, 0, SHOW_LENGTH_NUM), (name, index) => (
        <div className={styles.buyer} key={index}>
          <div className={styles.avatar}>
            <CompanyAvatar className={styles.companyIcon} name={name} />
          </div>
          <div className={styles.name}>
            <p>{name}</p>
          </div>
        </div>
      ))}
      {buyerNames.length > SHOW_LENGTH_NUM && (
        <div className={styles.viewMore} onClick={() => setOpen(true)}>
          View Full List
          <Icon className={styles.icon} type={'arrow-right-with-line'} size={10} />
        </div>
      )}
      {!isEmpty(buyerNames) && <OtherBuyerFullList buyers={buyerNames} open={open} onClose={() => setOpen(false)} />}
    </div>
  )
}

export default Buyers
