import { filter, get } from 'lodash'
import { useRouter } from 'next/router'
import Paper from '@material-ui/core/Paper'
import React, { useEffect, useState } from 'react'

import styles from './index.module.scss'
import Button from ' ../../client/components/button'
import { useSuppliers } from '../../client/utils/hooks'
import { EntityType } from '../../shared/enum/entityType'
import PartnersMap from '../../client/components/partners/map'
import PartnersTable from '../../client/components/partners/list'
import { CustomerSuppliersResponse } from '../../shared/response'
import PartnersNetwork from '../../client/components/partners/network'
import ExportOption from '../../client/components/partners/exportOption'
import { LEGENDS } from '../../client/components/partners/legend/legends'
import SliderTabs, { StyledTab } from '../../client/components/sliderTabs'
import { determineMode, Mode } from '../../client/utils/network/modeCondition'
import { filterPredicate, filterRangePredicate, searchStringPredicate } from '../../client/utils/helper'
import Filters, {
  DAndBLevelDescription,
  IFilter,
  INITIAL_FILTERS,
  TrafficLightLevelDescription,
} from '../../client/components/partners/filters'

const determineInitTab = (tab = 'list'): number => {
  if (tab === 'network') {
    return 1
  }
  if (tab === 'map') {
    return 2
  }
  return 0
}

const determineSelectedTab = (tabIndex = 0): string => {
  if (tabIndex === 1) {
    return 'network'
  }
  if (tabIndex === 2) {
    return 'map'
  }
  return 'list'
}

export default function Partners() {
  const router = useRouter()
  const suppliers = useSuppliers()
  const [filterValues, setFilterValues] = useState<IFilter>(INITIAL_FILTERS)

  const initTab = determineInitTab(get(router, 'query.tab'))
  const [tabIndex, setTabIndex] = useState<number>(initTab)
  const [mode, setMode] = useState<Mode>(Mode.FREE)

  useEffect(() => {
    setTabIndex(initTab)
  }, [initTab, setTabIndex])

  const [filteredSuppliers, setFilteredSuppliers] = useState<CustomerSuppliersResponse[]>([])

  const handleChange = (event: React.ChangeEvent<any>, newTabIndex: number) => {
    setTabIndex(newTabIndex)
    setFilterValues(INITIAL_FILTERS)
    setMode(Mode.FREE)
    setFilteredSuppliers(suppliers)
    router.push(`/partners?tab=${determineSelectedTab(newTabIndex)}`)
  }

  useEffect(() => {
    if (suppliers.length > 0) {
      setFilteredSuppliers(suppliers)
    }
  }, [suppliers])

  const handleFilterSuppliers = () => {
    const filteredSuppliers = filter(suppliers, supplier => {
      return (
        searchStringPredicate(filterValues.companyName, supplier.companyName) &&
        filterPredicate(filterValues.tier, `Tier ${supplier.tier}`) &&
        filterPredicate(filterValues.rating, supplier.rating) &&
        filterPredicate(filterValues.entity, EntityType[supplier.entity].toString()) &&
        filterPredicate(filterValues.category, LEGENDS[supplier.category].name) &&
        filterPredicate(filterValues.overAllBusinessRisk, DAndBLevelDescription[supplier.riskLevel]) &&
        filterPredicate(filterValues.trafficLightRating, TrafficLightLevelDescription[supplier.financialHealth]) &&
        filterRangePredicate([0, 100], filterValues.higgFemScore, supplier.higgTotalScore)
      )
    })
    setMode(determineMode(filterValues))
    setFilteredSuppliers(filteredSuppliers)
  }

  return (
    <>
      <div className={styles.header}>
        <span className={styles.title}>You have {suppliers.length} partners in your supply chain</span>
        <Button role="secondary" variant="outlined" color="primary">
          Invite partners
        </Button>
      </div>
      <p className={styles.filterAnnotation}>
        *Search for a specific partner by name, or use the filter functionality to explore unique subsets of your supply
        chain.
      </p>
      <Filters
        suppliers={suppliers}
        handleFilterSuppliers={handleFilterSuppliers}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      />
      <Paper square className={styles.tabs}>
        <SliderTabs tabIndex={tabIndex} indicatorColor={'#066184'} onChange={handleChange}>
          <StyledTab label="List" />
          <StyledTab label="Network" />
          <StyledTab label="Map" />
        </SliderTabs>
        <ExportOption />
      </Paper>
      <div className={styles.tabContent}>
        {tabIndex === 0 && <PartnersTable suppliers={filteredSuppliers} mode={mode} />}
        {tabIndex === 1 && <PartnersNetwork suppliers={suppliers} filteredSuppliers={filteredSuppliers} mode={mode} />}
        {tabIndex === 2 && <PartnersMap suppliers={filteredSuppliers} mode={mode} />}
      </div>
    </>
  )
}
