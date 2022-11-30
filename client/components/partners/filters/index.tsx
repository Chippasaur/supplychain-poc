import { map, uniq, range, values } from 'lodash'
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { Collapse } from '@material-ui/core'
import Image from 'next/image'

import Select from '../../select'
import Button from '../../button'
import { LEGENDS } from '../legend/legends'
import styles from './index.module.scss'
import { CustomSlider } from '../../slider'
import { EntityType } from '../../../../shared/enum/entityType'
import { DAndBLevel } from '../../../../shared/enum/dAndBLevel'
import { getMutuallyExclusiveFilter } from '../../../utils/helper'
import { CustomerSuppliersResponse } from '../../../../shared/response'
import { TrafficLightLevel } from '../../../../shared/enum/trafficLightLevel'
import Icon from '../../icon'

interface FilterProps {
  suppliers: CustomerSuppliersResponse[]
  handleFilterSuppliers: () => void
  filterValues: IFilter
  setFilterValues: (filter: IFilter) => void
}

export const TrafficLightLevelDescription = {
  [TrafficLightLevel.Safe]: 'Safe',
  [TrafficLightLevel.AverageRisk]: 'Average Risk',
  [TrafficLightLevel.ElevatedRisk]: 'Elevated Risk',
  [TrafficLightLevel.Caution]: 'Caution',
  [TrafficLightLevel.Unavailable]: 'Data Unavailable',
}

export const DAndBLevelDescription = {
  [DAndBLevel.Low]: 'Low Risk',
  [DAndBLevel.Moderate]: 'Moderate Risk',
  [DAndBLevel.High]: 'High Risk',
  [DAndBLevel.Severe]: 'Severe Risk',
  [DAndBLevel.OutOfBusiness]: 'Out of Business',
  [DAndBLevel.Undetermined]: 'Undetermined',
  [DAndBLevel.Unavailable]: 'Risk Data Unavailable',
}

export interface IFilter {
  companyName: string | null
  tier: string[]
  relationship: string[]
  rating: string[]
  category: string[]
  entity: string[]
  overAllBusinessRisk: string[]
  trafficLightRating: string[]
  higgFemScore: number[]
}

export const INITIAL_FILTERS = {
  companyName: null,
  tier: [],
  relationship: [],
  rating: [],
  category: [],
  entity: [],
  overAllBusinessRisk: [],
  trafficLightRating: [],
  higgFemScore: [0, 100],
}

let lastFilterValues: IFilter = INITIAL_FILTERS

export default function Filters(props: FilterProps) {
  const { suppliers, handleFilterSuppliers, filterValues, setFilterValues } = props
  const [advancedFilterState, setAdvancedFilterStateState] = useState(false)
  const [countActivatedAdvancedFilter, setCountActivatedAdvancedFilter] = useState(0)

  const companyNamesOptions = map(suppliers, 'companyName').sort()
  const tierOptions = uniq(map(suppliers, supplier => `Tier ${supplier.tier}`)).sort()
  const rating = map(range(0, 5.5, 0.5), num => `${num}`)
  const entityTypeOptions = uniq(map(suppliers, supplier => EntityType[supplier.entity].toString()))

  const categoryOptions = map(values(LEGENDS), 'name')
  const financialHealthOptions = values(TrafficLightLevelDescription)
  const riskLevelOptions = values(DAndBLevelDescription)

  const handleCountActivatedAdvancedFilter = (
    overAllBusinessRisk: string[],
    trafficLightRating: string[],
    higgFemScore: number[],
  ) => {
    let count = 0
    overAllBusinessRisk.length ? count++ : null
    trafficLightRating.length ? count++ : null
    higgFemScore.toString() != INITIAL_FILTERS.higgFemScore.toString() ? count++ : null
    setCountActivatedAdvancedFilter(count)
  }

  useEffect(() => {
    handleFilterSuppliers()
    handleCountActivatedAdvancedFilter(
      filterValues.overAllBusinessRisk,
      filterValues.trafficLightRating,
      filterValues.higgFemScore,
    )
    lastFilterValues = filterValues
  }, [filterValues])

  const setFilterFields = (value: string | string[] | number | number[] | null, fieldName: string) => {
    const newFilterValues = getMutuallyExclusiveFilter(lastFilterValues, { ...filterValues, [fieldName]: value })
    setFilterValues(newFilterValues)
  }

  const onChangeCollapseState = (state: boolean) => {
    setAdvancedFilterStateState(state)
  }
  const onChangeBy = (fieldName: string) => {
    return (event: React.ChangeEvent<any> | undefined, value: string | string[] | null) => {
      setFilterFields(value, fieldName)
    }
  }

  return (
    <>
      <div className={styles.basicFilterBar}>
        <div className={styles.filters}>
          <Select
            value={filterValues.companyName}
            onChange={onChangeBy('companyName')}
            options={companyNamesOptions}
            style={{ width: 300 }}
            icon={<Icon type={'search'} size={20} />}
            popupIcon={null}
            placeholder={'Search here'}
          />
          <Select
            value={filterValues.tier}
            options={tierOptions}
            classnames={styles.select}
            style={{ width: 90 }}
            textFieldVariant="outlined"
            multiple
            popupIcon={<ExpandMoreIcon />}
            onChange={onChangeBy('tier')}
            placeholder="Tier"
          />
          <Select
            value={filterValues.rating}
            options={rating}
            classnames={styles.select}
            style={{ width: 90 }}
            textFieldVariant="outlined"
            multiple
            popupIcon={<ExpandMoreIcon />}
            onChange={onChangeBy('rating')}
            placeholder="Rating"
          />
          <Select
            value={filterValues.category}
            options={categoryOptions}
            classnames={styles.select}
            style={{ width: 113 }}
            textFieldVariant="outlined"
            multiple
            popupIcon={<ExpandMoreIcon />}
            onChange={onChangeBy('category')}
            placeholder="Category"
          />
          <Select
            value={filterValues.entity}
            options={entityTypeOptions}
            classnames={styles.select}
            style={{ width: 113 }}
            textFieldVariant="outlined"
            multiple
            popupIcon={<ExpandMoreIcon />}
            onChange={onChangeBy('entity')}
            placeholder="Entity Type"
          />

          {!advancedFilterState && (
            <div className={styles.advancedFilterButton} onClick={() => onChangeCollapseState(true)}>
              <Image src="/images/config.svg" width={14} height={14} />
              <span className={styles.advancedFilterLabel}>
                Advanced filter
                {countActivatedAdvancedFilter !== 0 && ` (${countActivatedAdvancedFilter})`}
              </span>
            </div>
          )}
          {advancedFilterState && (
            <div className={styles.advancedFilterButton} onClick={() => onChangeCollapseState(false)}>
              <ExpandLessIcon className={styles.icon} />
              <span className={styles.advancedFilterLabel}>Collapse advanced filter</span>
            </div>
          )}
        </div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setFilterValues(INITIAL_FILTERS)
          }}>
          Reset
        </Button>
      </div>
      <Collapse in={advancedFilterState}>
        <div className={styles.advancedFilterBar}>
          <div className={styles.filters}>
            <span className={styles.advancedFilterDescription}>Advanced filter</span>
            <Select
              value={filterValues.overAllBusinessRisk}
              options={riskLevelOptions}
              classnames={styles.select}
              style={{ width: 175 }}
              textFieldVariant="outlined"
              multiple
              popupIcon={<ExpandMoreIcon />}
              onChange={onChangeBy('overAllBusinessRisk')}
              placeholder="Business Risk"
            />
            <Select
              value={filterValues.trafficLightRating}
              options={financialHealthOptions}
              classnames={styles.select}
              style={{ width: 175 }}
              textFieldVariant="outlined"
              multiple
              popupIcon={<ExpandMoreIcon />}
              onChange={onChangeBy('trafficLightRating')}
              placeholder="Traffic light rating"
            />
            <span className={styles.filterDescription}>Higg FEM score (0-100)</span>
            <div className={styles.sliderBackground}>
              <CustomSlider
                value={filterValues.higgFemScore}
                onChange={(event, value) => setFilterFields(value, 'higgFemScore')}
                onChangeCommitted={(event, value) => setFilterFields(value, 'higgFemScore')}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                style={{ left: 23, top: 2, width: 176 }}
              />
            </div>
          </div>
        </div>
      </Collapse>
    </>
  )
}
