import React from 'react'
import cls from 'classnames'

import Layout from '../../../../client/components/partners/layout'
import ExportOption from '../../../../client/components/partners/exportOption'
import styles from './index.module.scss'
import ItemInfo from '../../../../client/components/partners/itemInfo'
import UpdateInfo from '../../../../client/components/partners/updateInfo'
import { formatNumber } from '../../../../client/utils/format'
import { useCompanyData } from '../../../../client/utils/hooks'
import { Business, OfficialContact, OverallStatus, Location } from '../../../../shared/types'
import { Sanction } from '../../../../shared/enum/sanction'
import Icon from '../../../../client/components/icon'
import { CompanyStatus } from '../../../../shared/enum/companyStatus'

const SanctionStatusMap = {
  [Sanction.Passed]: 'Passed',
}

const StatusPart = ({
  beneficialOwners,
  ultimateOwners,
  employeeNum,
  revenue,
  companyStatus,
  sanction,
}: OverallStatus) => {
  const isActive = companyStatus === CompanyStatus.Active
  return (
    <div className={styles.section}>
      <ItemInfo title={'Company status'} view={'View more'}>
        {isActive ? (
          <span className={styles.companyActiveStatus}>
            <Icon type={'tick'} size={10} /> Active
          </span>
        ) : (
          <span className={styles.companyInactiveStatus}>
            <Icon className={styles.companyInactiveStatusIcon} type={'close'} size={18} />
            <span>Inactive</span>
          </span>
        )}
      </ItemInfo>
      <ItemInfo title={'Sanctions check'}>
        <span className={styles.sanction}>
          <Icon type={'tick'} size={10} /> <span>{SanctionStatusMap[sanction]}</span>
        </span>
      </ItemInfo>
      <ItemInfo title={'Ultmate Owner(s)'} info={ultimateOwners} />
      <ItemInfo title={'Beneficial Owner(s)'} info={beneficialOwners} />
      <ItemInfo title={'Revenue (USD)'} info={formatNumber(revenue)} />
      <ItemInfo title={'Number of employees'} info={formatNumber(employeeNum)} />
      <UpdateInfo source={'D&B'} time={'23 Sept 2020'} className={styles.updateInfo} />
    </div>
  )
}

const BusinessPart = ({ businessType, entityType }: Business) => {
  return (
    <div>
      <div className={styles.parts}>
        <ItemInfo title={'Business type'} info={businessType} />
        <ItemInfo title={'Entity type'} info={entityType} />
      </div>
    </div>
  )
}
const AddressPart = ({ address, city, region, state, postalCode }: Location) => {
  return (
    <div className={styles.parts}>
      <div>
        <ItemInfo title={'Address'} info={address} />
        <ItemInfo title={'Postal code'} info={postalCode} />
      </div>
      <div>
        <ItemInfo title={'State/Province'} info={state} />
        <ItemInfo title={'City'} info={city} />
        <ItemInfo title={'Country/Region'} info={region} />
      </div>
    </div>
  )
}
const ContactPart = ({ telephone, officialEmail, websiteUrl }: OfficialContact) => {
  return (
    <div className={styles.parts}>
      <div>
        <ItemInfo title={'Telephone'} info={telephone} />
      </div>
      <div>
        <ItemInfo title={'Email address'}>
          {officialEmail ? <a href={`mailto:${officialEmail}`}>{officialEmail}</a> : null}
        </ItemInfo>
        <ItemInfo title={'Website URL'}>
          {websiteUrl ? (
            <a href={`http://${websiteUrl}`} target={'_blank'} rel={'noreferrer'}>
              {websiteUrl}
            </a>
          ) : null}
        </ItemInfo>
      </div>
    </div>
  )
}

const CompanyInfo = () => {
  const { business, officialContact, location, registration, overallStatus } = useCompanyData()
  const { registrationNumber, registrationName, registrationType } = registration
  return (
    <Layout>
      <div className={styles.companyInfo}>
        <div className={styles.header}>
          <h2> Company Information</h2>
          <ExportOption />
        </div>
        <div className={styles.content}>
          <div className={cls(styles.section, styles.firstColumn)}>
            <BusinessPart {...business} />
            <hr />
            <AddressPart {...location} />
            <hr />
            <ContactPart {...officialContact} />
            <UpdateInfo source={'D&B'} time={'6 June 2019'} className={styles.updateInfo} />
          </div>
          <div className={styles.secondColumn}>
            <div className={styles.section}>
              <ItemInfo title={'Registered Name'} info={registrationName} />
              <ItemInfo title={'Registered Number'} info={registrationNumber} />
              <ItemInfo title={'Registered Type'} info={registrationType} />
              <UpdateInfo source={'D&B'} time={'28 Nov 2020'} className={styles.updateInfo} />
            </div>
            <StatusPart {...overallStatus} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default CompanyInfo
