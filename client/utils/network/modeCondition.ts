import { isEmpty, isEqual } from 'lodash'

import { IFilter, INITIAL_FILTERS } from '../../components/partners/filters'

export enum Mode {
  SEARCH = 'search',
  FILTER = 'filter',
  FREE = 'free',
}

export const determineMode = (filters: IFilter) => {
  if (!isEmpty(filters.companyName)) {
    return Mode.SEARCH
  }
  if (isEqual(filters, INITIAL_FILTERS)) {
    return Mode.FREE
  }
  return Mode.FILTER
}
