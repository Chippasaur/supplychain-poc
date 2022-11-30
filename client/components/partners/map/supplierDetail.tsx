import Link from 'next/link'
import cls from 'classnames'
import { isNil } from 'lodash'
import React, { CSSProperties } from 'react'

import Icon from '../../icon'
import styles from './supplierDetail.module.scss'
import CompanyAvatar from '../layout/companyAvatar'
import { Location } from '../../../../shared/types'
import { assembleLocation } from '../../../utils/format'
import NoDataText from '../../noDataText'

const iconMap: any = {
  0: { class: styles.manufacturer, type: 'manufacturer', label: 'Manufacturer' },
  1: { class: styles.fabric, type: 'fabric-supplier', label: 'Fabric Supplier' },
  2: { class: styles.rawMaterial, type: 'raw-material-supplier', label: 'Raw Material Supplier' },
  3: {
    class: styles.trimAndAccessories,
    type: 'trims-and-accessories-supplier',
    label: 'Trims & Accessories Supplier',
  },
  4: { class: styles.printAndWath, type: 'print-wash-or-dye-house', label: 'Print, Wash or Dye House' },
  5: { class: styles.other, type: 'other', label: 'Other' },
  6: { class: styles.unknown, type: 'unknown', label: 'Unknown' },
}

const riskMap: any = {
  0: { class: styles.low, label: 'Low' },
  1: { class: styles.moderate, label: 'Moderate' },
  2: { class: styles.high, label: 'High' },
  3: { class: styles.severe, label: 'Severe' },
  4: { class: styles.outOfBusiness, label: 'Out of Business' },
  5: { class: styles.undetermined, label: 'Undetermined' },
  6: { class: styles.unavailable, label: 'Unavailable' },
}

const financialMap: any = {
  0: { class: styles.safe, label: 'Safe' },
  1: { class: styles.averageRisk, label: 'Average Risk' },
  2: { class: styles.elevatedRisk, label: 'Elevated Risk' },
  3: { class: styles.caution, label: 'Caution' },
  4: { class: styles.dataUnavailable, label: 'Data Unavailable' },
}

interface SupplierDetailProps {
  id?: string
  tier?: number
  name?: string
  location?: Location
  category?: number
  riskLevel?: number
  financialHealth?: number
  coordinates?: []
  style?: CSSProperties
  className?: string
}

const SupplierDetail = ({
  id,
  tier,
  name,
  category,
  location,
  riskLevel,
  financialHealth,
  style,
  className,
}: SupplierDetailProps) => {
  if (!name || isNil(category) || isNil(riskLevel) || isNil(financialHealth)) {
    return null
  }

  const icon = iconMap[category]
  const risk = riskMap[riskLevel]
  const financial = financialMap[financialHealth]
  const assembledLocation = (location && assembleLocation(location)) || ''
  return (
    <div style={style} className={cls(styles.detail, className)}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <CompanyAvatar name={name} />
        </div>
        <div>
          <div className={styles.name}>
            <Link href={`/partners/${id}`}>
              <p>
                {name} <Icon type={'arrow-right'} size={10} />
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.location}>
        <Icon type={'location'} size={16} color={'#eb602d'} />
        {assembledLocation || <NoDataText />}
      </div>
      <div className={styles.category}>
        <Icon className={icon.class} type={icon.type} size={13} /> {icon.label}
      </div>
      <div className={styles.footer}>
        <div className={styles.text}>
          Tier <span>{`Tier ${tier}`}</span>
        </div>
        <div className={styles.text}>
          Risk Level <span className={risk.class}>{risk.label}</span>
        </div>
        <div className={styles.text}>
          Financial Health <span className={financial.class}>{financial.label}</span>
        </div>
      </div>
    </div>
  )
}

export default SupplierDetail
