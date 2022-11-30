import { includes, isEmpty } from 'lodash'
import { isEqual } from '@antv/util'

import { determineMode } from './network/modeCondition'
import { IFilter, INITIAL_FILTERS } from '../components/partners/filters'
import { isFilterMode, isSearchMode } from '../components/partners/network/graph/conditions'

export const searchStringPredicate = (target: string | null, keyword: string) => {
  return isEmpty(target) || keyword === target
}

export const filterPredicate = (collection: string | string[] | null, keyword: string | number) => {
  return isEmpty(collection) || includes(collection, `${keyword}`)
}

export const filterRangePredicate = (initialRange: number[], range: number[], value: number) => {
  const [initialMin, initialMax] = initialRange
  let [min, max] = range
  if (min > max) {
    ;[min, max] = [max, min]
  }
  return (min === initialMin && max === initialMax) || (value >= min && value <= max)
}

const hasAppliedSearchAndFilters = (filters: IFilter) => {
  const initialFiltersWithCompanyName = {
    ...INITIAL_FILTERS,
    companyName: filters.companyName,
  }
  return !isEmpty(filters.companyName) && !isEqual(filters, initialFiltersWithCompanyName)
}

export const getMutuallyExclusiveFilter = (lastFilterValues: IFilter, filters: IFilter) => {
  if (isFilterMode(determineMode(lastFilterValues)) && hasAppliedSearchAndFilters(filters)) {
    return {
      ...INITIAL_FILTERS,
      companyName: filters.companyName,
    }
  } else if (isSearchMode(determineMode(lastFilterValues)) && hasAppliedSearchAndFilters(filters)) {
    return {
      ...filters,
      companyName: '',
    }
  }
  return filters
}
