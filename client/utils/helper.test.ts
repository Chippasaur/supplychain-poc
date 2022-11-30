import { searchStringPredicate, filterPredicate, filterRangePredicate, getMutuallyExclusiveFilter } from './helper'
import { INITIAL_FILTERS } from '../components/partners/filters'

describe('test search string predicate', () => {
  it('should get false when keyword is equal to target', () => {
    expect(searchStringPredicate('abc', 'abc')).toBeTruthy()
  })

  it('should get false when keyword is not equal to target', () => {
    expect(searchStringPredicate('abc', 'abcd')).toBeFalsy()
  })

  it('should get false when keyword target is empty', () => {
    expect(searchStringPredicate('', 'abcd')).toBeTruthy()
  })
})

describe('test string filterPredicate', () => {
  it('should get true when collection is empty', () => {
    expect(filterPredicate([], 'testKeyword')).toBeTruthy()
  })

  it('should get true when collection contains string keyword', () => {
    expect(filterPredicate(['a', 'b'], 'a')).toBeTruthy()
  })

  it('should get true when collection contains number keyword', () => {
    expect(filterPredicate(['1', '2'], 1)).toBeTruthy()
  })

  it('should get false when collection not contains keyword', () => {
    expect(filterPredicate(['a', 'b'], 'c')).toBeFalsy()
  })
})

describe('test array filter predicate', () => {
  it('should get true when equal to init', () => {
    expect(filterRangePredicate([0, 100], [0, 100], 50)).toBeTruthy()
  })
  it('should get true when range reversed and equal to init', () => {
    expect(filterRangePredicate([0, 100], [100, 0], 50)).toBeTruthy()
  })
  it('should get true when value in range', () => {
    expect(filterRangePredicate([0, 100], [20, 80], 50)).toBeTruthy()
  })
  it('should get false when value out of range', () => {
    expect(filterRangePredicate([0, 100], [51, 80], 50)).toBeFalsy()
  })
})

describe('test mutually exclusive filter', () => {
  const bothAppliedFilters = {
    companyName: 'fake name',
    tier: [],
    relationship: [],
    rating: [],
    category: [],
    entity: ['facility'],
    overAllBusinessRisk: [],
    trafficLightRating: [],
    higgFemScore: [0, 100],
  }

  const searchFilters = {
    companyName: 'fake name',
    tier: [],
    relationship: [],
    rating: [],
    category: [],
    entity: [],
    overAllBusinessRisk: [],
    trafficLightRating: [],
    higgFemScore: [0, 100],
  }

  const filterFilters = {
    companyName: '',
    tier: [],
    relationship: [],
    rating: [],
    category: [],
    entity: ['facility'],
    overAllBusinessRisk: [],
    trafficLightRating: [],
    higgFemScore: [0, 100],
  }

  it('should switch filters to search mode or filter mode, when search and filter both applied', function () {
    const searchToFilterFilters = getMutuallyExclusiveFilter(searchFilters, bothAppliedFilters)
    const filterToSearchFilters = getMutuallyExclusiveFilter(filterFilters, bothAppliedFilters)

    expect(searchToFilterFilters).toEqual(filterFilters)
    expect(filterToSearchFilters).toEqual(searchFilters)
  })

  it('should get new filters when apply filter again', function () {
    const filterFilters2 = {
      ...filterFilters,
      entity: ['group'],
    }
    const newFilters = getMutuallyExclusiveFilter(filterFilters, filterFilters2)

    expect(newFilters).toEqual(filterFilters2)
  })

  it('should get new filters when search filter again', function () {
    const searchFilters2 = {
      ...searchFilters,
      companyName: 'fake name 2',
    }

    const newFilters = getMutuallyExclusiveFilter(searchFilters, searchFilters2)

    expect(newFilters).toEqual(searchFilters2)
  })

  it('should get new filters when first apply', function () {
    const newFilters = getMutuallyExclusiveFilter(INITIAL_FILTERS, searchFilters)

    expect(newFilters).toEqual(searchFilters)
  })
})
