import React from 'react'
import cls from 'classnames'
import { get, compact } from 'lodash'

import Icon from '../../icon'
import Button from '../../button'
import { LEGENDS } from '../legend/legends'
import styles from './header.module.scss'
import CompanyAvatar from './companyAvatar'
import { useCompanyData } from '../../../utils/hooks'
import { EntityType } from '../../../../shared/enum/entityType'

const Header = () => {
  const {
    name,
    tier,
    entity,
    category,
    business,
    officialContact,
    location,
    overallStatus,
    registration,
  } = useCompanyData()
  const dAndBData = [
    ...Object.values(location || {}),
    ...Object.values(business || {}),
    ...Object.values(registration || {}),
    ...Object.values(officialContact || {}),
    overallStatus?.companyStatus,
  ]
  const hasDAndBData = compact(dAndBData).length > 0
  return (
    <div className={styles.header}>
      <CompanyAvatar name={name} />
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <div className={styles.typeCell}>
          <span
            className={cls(styles.rowBox, {
              [styles.group]: entity === EntityType.Group,
              [styles.facility]: entity === EntityType.Facility,
            })}>
            {EntityType[entity].toString()}
          </span>
        </div>
        <div>
          {location?.region && <label>{location.region}</label>}
          <label>Tier {tier}</label>
          <label>
            <Icon type={'dot'} size={8} color={get(LEGENDS[category], 'color')} />
            {get(LEGENDS[category], 'name')}
          </label>
          {hasDAndBData && (
            <label className={styles.verified}>
              <Icon type={'verified'} size={12} />
              Verified
            </label>
          )}
        </div>
      </div>
      <Button role="secondary" variant="outlined" color="primary">
        Create survey
      </Button>
    </div>
  )
}

export default Header
