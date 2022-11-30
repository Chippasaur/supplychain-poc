import { DateTime } from 'luxon'

import {
  mapToCategory,
  generateRating,
  removeCommaAtTheEnd,
  getRandomSustainabilityScore,
  getRandomInt,
  getRandomDateByUnit,
  generateDateArray,
} from '../../../migrations/seeds/utils/utils'
import { SupplierCategory } from '../../../../shared/enum/category'

describe('test utils function', () => {
  it('should get correct category number', () => {
    const trims = 'Trims & Accessories Supplier'
    const manufacturer = 'Manufacturer'
    const rawMaterial = 'Raw Material Supplier'
    const printWash = 'Print, Wash or Dye House'
    const fabric = 'Fabric Supplier'
    const other = 'other'

    expect(mapToCategory(trims)).toEqual(SupplierCategory.TrimsAndAccessoriesSupplier)
    expect(mapToCategory(manufacturer)).toEqual(SupplierCategory.Manufacturer)
    expect(mapToCategory(rawMaterial)).toEqual(SupplierCategory.RawMaterialSupplier)
    expect(mapToCategory(printWash)).toEqual(SupplierCategory.PrintAndWashOrDyeHouse)
    expect(mapToCategory(fabric)).toEqual(SupplierCategory.FabricSupplier)
    expect(mapToCategory(other)).toBeGreaterThan(4)
  })

  it('should generate rating', () => {
    const rating = generateRating()
    expect(rating).toBeGreaterThanOrEqual(0)
    expect(rating).toBeLessThanOrEqual(5)
  })

  it('should remove comma at the end of string', () => {
    const example = 'one thing i know i know nothing,'

    const res = removeCommaAtTheEnd(example)

    expect(res).toEqual('one thing i know i know nothing')
  })

  it('should get sustainability score', () => {
    const score = getRandomSustainabilityScore()

    expect(score).toBeGreaterThanOrEqual(0)
    expect(score).toBeLessThanOrEqual(100)
  })

  it('should get random int', () => {
    const randomInt = getRandomInt(0, 3)

    expect(randomInt).toBeGreaterThanOrEqual(0)
    expect(randomInt).toBeLessThanOrEqual(3)
    expect(Number.isInteger(randomInt)).toBe(true)
  })

  it('should get random date', () => {
    const randomDate = getRandomDateByUnit('year')

    expect(randomDate).toBeInstanceOf(Date)
  })

  it('should get correct date array', () => {
    const dateArrays = generateDateArray(DateTime.fromISO('2021-01-01T08:00'), DateTime.fromISO('2021-02-28T08:00'))
    expect(dateArrays).toHaveLength(59)
    expect(dateArrays[58]).toEqual(DateTime.fromISO('2021-02-28T08:00').toJSDate())
    console.log()
  })
})
