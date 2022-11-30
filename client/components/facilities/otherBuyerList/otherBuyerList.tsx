import React, { useState } from 'react'
import { map, slice, isEmpty } from 'lodash'

import styles from './otherBuyerList.module.scss'
import CompanyAvatar from '../../partners/layout/companyAvatar'
import Icon from '../../icon'
import OtherBuyerFullList from '../otherBuyerFullList'
import { BuyerList } from '../groupAndFacilitiesLayer/groupAndFacilitiesLayer'
import NoDataText from '../../noDataText'

interface Props {
  buyerList: BuyerList
}

const SHOW_LENGTH_NUM = 6

export default function OtherBuyerList({ buyerList }: Props) {
  const [open, setOpen] = useState(false)
  const { buyers, location, companyName } = buyerList

  return (
    <div className={styles.buyerInfo}>
      <div className={styles.facilityInfo}>
        <p className={styles.name}>{companyName}</p>
        <div className={styles.address}>
          <Icon type={'location'} size={10} color={'#eb602d'} />
          {location ? <span>{location}</span> : <NoDataText />}
        </div>
      </div>
      {!isEmpty(buyers) && (
        <div className={styles.buyers}>
          <p className={styles.otherBuyersTitle}>Other buyers</p>
          {map(slice(buyers, 0, SHOW_LENGTH_NUM), (name, index) => (
            <div className={styles.companyInfo} key={index}>
              <CompanyAvatar className={styles.avatar} name={name} />
              <span>{name}</span>
            </div>
          ))}
          {buyers.length > SHOW_LENGTH_NUM && (
            <div className={styles.viewMore} onClick={() => setOpen(true)}>
              View Full List
              <Icon type={'arrow-right-with-line'} size={10} color={'#066184'} />
            </div>
          )}
        </div>
      )}
      <OtherBuyerFullList buyers={buyers} open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
