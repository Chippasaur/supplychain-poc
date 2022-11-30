import cls from 'classnames'
import numeral from 'numeral'
import React, { useCallback, useMemo } from 'react'
import Image from 'next/image'
import { get, isEmpty, compact } from 'lodash'
import { useRouter } from 'next/router'

import ItemTitle from '../partners/itemTitle'
import styles from './index.module.scss'
import PartnersSecColumn from '../partnersSecColumn'
import NotificationBox from '../notificationBox'
import Alert from '../alert'
import { useSupplierData, useGroupData } from '../../utils/hooks'
import Icon from '../icon'
import { EntityType } from '../../../shared/enum/entityType'
import ExportOption from '../partners/exportOption'
import { formatNumberWithUnit } from '../../utils/format'
import GroupCompany from '../groupCompany'

interface IncomeProps {
  year: string | number
  title: string
  income: {
    concreteValue: number
    growthRate: number
  }
}

const IncomeItem = ({ title, year, income: { concreteValue, growthRate } }: IncomeProps) => {
  const formatNum = useCallback(num => {
    return formatNumberWithUnit(num)
  }, [])
  return (
    <div className={styles.incomeItem}>
      <ItemTitle>
        {title} {year}
      </ItemTitle>
      <p className={cls(styles.incomeNums)}>
        <span className={styles.num}>$ {formatNum(concreteValue)}</span>
        <span
          className={cls(styles.trend, {
            [styles.decrease]: growthRate < 0,
            [styles.even]: growthRate === 0,
          })}>
          {<Icon type={'arrow_up'} size={14} className={styles.trendIcon} />}
          {numeral(Math.abs(growthRate)).format('0.[00]')}%
        </span>
      </p>
    </div>
  )
}

export default function Overview() {
  const {
    company: {
      contact: { name: contactName, email, telephone, jobTitle },
      groupId,
      entity,
    },
    facilities,
    income: { netIncome, turnover, year },
    notifications,
    alerts,
  } = useSupplierData()

  const router = useRouter()
  const id = get(router.query, 'id', '')
  const facilityPath = useMemo(() => {
    return `/partners/${id}/facilities`
  }, [id])

  const facilitiesData = {
    number: facilities.length,
    regions: Array.from(new Set(compact(facilities.map(facility => facility.location?.region)))).join(', '),
  }

  const group = useGroupData(groupId)

  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <span>Overview</span>
        <ExportOption />
      </div>
      <div className={styles.infos}>
        <div className={styles.firstColumn}>
          <div className={styles.columnTitle}>BASIC INFO</div>
          {entity === EntityType.Facility && group && !isEmpty(group.id) && (
            <GroupCompany groupId={group.id} name={group.name} category={group.category} location={group.location} />
          )}
          {
            <div className={styles.box}>
              {turnover && <IncomeItem title="Turnover for" year={year} income={turnover} />}
              {netIncome && <IncomeItem title="Net income for" year={year} income={netIncome} />}
            </div>
          }
          {entity === EntityType.Group && (
            <div className={cls(styles.box, styles.facility)}>
              <div>
                <ItemTitle>Number of facilities</ItemTitle>
                <p className={styles.num}>{facilitiesData.number}</p>
                <ItemTitle>Locations of facilities</ItemTitle>
                <p className={cls(styles.locations, styles.des)}>{facilitiesData.regions}</p>
              </div>
              <div className={styles.mapLink} onClick={() => router.push(facilityPath)}>
                <Image src={'/images/mapSnapshot.png'} width={72} height={72} />
                <span>View in map</span>
              </div>
            </div>
          )}
          <div className={styles.box}>
            <ItemTitle>Contact name</ItemTitle>
            <p className={styles.des}>{contactName}</p>
            <ItemTitle>Job title</ItemTitle>
            <p className={styles.des}>{jobTitle}</p>
            <ItemTitle>Contact info</ItemTitle>
            <a className={styles.email} href={`mailto:${email}`}>
              {email}
            </a>
            <p className={styles.des}>{telephone}</p>
          </div>
        </div>
        <div className={styles.secondCol}>
          <div className={styles.columnTitle}>PERFORMANCE</div>
          <PartnersSecColumn />
        </div>
        <div className={styles.thirdCol}>
          <NotificationBox contents={notifications} containerClassName={styles.notifications} />
          <span className={styles.title}>ALERTS</span>
          <Alert alerts={alerts} containerClassName={styles.alerts} itemClassName={styles.alertItem} />
        </div>
      </div>
    </div>
  )
}
