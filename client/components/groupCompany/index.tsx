import React from 'react'
import { get } from 'lodash'
import { useRouter } from 'next/router'

import styles from './index.module.scss'
import { SupplierCategory } from '../../../shared/enum/category'
import { Location } from '../../../shared/types'
import CompanyAvatar from '../partners/layout/companyAvatar'
import Icon from '../icon'
import { Level } from '../partnersSecColumn'
import { assembleLocation } from '../../utils/format'

const categories: Level = {
  [SupplierCategory.Manufacturer]: { class: styles.manufacturer, type: 'manufacturer', label: 'Manufacturer' },
  [SupplierCategory.FabricSupplier]: { class: styles.fabric, type: 'fabric-supplier', label: 'Fabric Supplier' },
  [SupplierCategory.RawMaterialSupplier]: {
    class: styles.rawMaterial,
    type: 'raw-material-supplier',
    label: 'Raw Material Supplier',
  },
  [SupplierCategory.TrimsAndAccessoriesSupplier]: {
    class: styles.trimAndAccessories,
    type: 'trims-and-accessories-supplier',
    label: 'Trims & Accessories Supplier',
  },
  [SupplierCategory.PrintAndWashOrDyeHouse]: {
    class: styles.printAndWath,
    type: 'print-wash-or-dye-house',
    label: 'Print, Wash or Dye House',
  },
  [SupplierCategory.Other]: { class: styles.other, type: 'other', label: 'Other' },
  [SupplierCategory.UnknownEntity]: { class: styles.unknown, type: 'unknown', label: 'Unknown' },
}

interface Props {
  groupId: string
  name: string
  category: SupplierCategory
  location: Location
}

const GroupCompany = (props: Props) => {
  const router = useRouter()
  const { groupId, name, category: categoryLevel, location } = props
  const category = get(categories, categoryLevel, categories[SupplierCategory.UnknownEntity])
  const assembledLocation = (location && assembleLocation(location)) || ''
  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <span className={styles.company}>Group Company</span>
        <span className={styles.view} onClick={() => router.push(`/partners/${groupId}`)}>
          View in detail
        </span>
      </div>
      <div className={styles.main}>
        <div className={styles.avatar}>
          <CompanyAvatar name={name} />
        </div>
        <div className={styles.name}>
          <p>{name}</p>
        </div>
      </div>
      <div className={styles.footer}>
        {assembledLocation && (
          <div className={styles.location}>
            <Icon type={'location'} size={16} className={styles.icon} />
            {assembledLocation}
          </div>
        )}
        <div className={styles.category}>
          <Icon className={category.class} type={category.type} size={13} />
          {category.label}
        </div>
      </div>
    </div>
  )
}

export default GroupCompany
