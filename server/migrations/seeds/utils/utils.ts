import fs from 'fs'

import moment, { unitOfTime } from 'moment'
import { DateTime } from 'luxon'

import { SupplierCategory } from '../../../../shared/enum/category'

export function getRandomDateByUnit(unit: unitOfTime.StartOf) {
  const startDate = moment().startOf(unit).toDate()
  const endDate = new Date()
  return new Date(+startDate + Math.random() * (+endDate - +startDate))
}

export function getRandomDate() {
  const oneMonth = 1000 * 60 * 60 * 24 * 30
  return new Date(+getRandomDateByUnit('year') - oneMonth)
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function readJsonFile(path: string) {
  let data
  try {
    const jsonData = fs.readFileSync(path, 'utf8')
    data = JSON.parse(jsonData.toString())
  } catch (err) {
    console.error(err)
  }
  return data
}

export function writeToJson(path: string, object: any) {
  const data = JSON.stringify(object)
  try {
    fs.writeFileSync(path, data)
  } catch (err) {
    console.error(err)
  }
}

export function sliceArrayAveragely(array: any[], number: number) {
  const result = []
  const averageAmount = Math.floor(array.length / number)
  for (let i = 0; i < array.length; i += averageAmount) {
    result.push(array.slice(i, i + averageAmount))
  }
  return result
}

export function getRandomSustainabilityScore() {
  return Math.random() * 100
}

export function getRandomKeyWithWeight(weights: any): number {
  let sum = 0
  const randomNum = Math.random()
  for (const i in weights) {
    sum += weights[i]
    if (randomNum <= sum) {
      return Number(i)
    }
  }
  return 0
}

export function removeCommaAtTheEnd(str: string) {
  const len = str.length
  return str.charAt(len - 1) === ',' ? str.substring(0, len - 1) : str
}

export function generateRating(): number {
  const ratingValues = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
  const ratingWeights = {
    1: 0.05,
    2: 0.06,
    3: 0.1,
    4: 0.1,
    5: 0.1,
    6: 0.1,
    7: 0.12,
    8: 0.12,
    9: 0.1,
    10: 0.1,
    11: 0.05,
  }
  const ratingLevel = getRandomKeyWithWeight(ratingWeights)
  return ratingValues[ratingLevel - 1]
}

export function mapToCategory(category: string) {
  const cateGoryMap = new Map()
  cateGoryMap.set('Trims & Accessories Supplier', SupplierCategory.TrimsAndAccessoriesSupplier)
  cateGoryMap.set('Manufacturer', SupplierCategory.Manufacturer)
  cateGoryMap.set('Raw Material Supplier', SupplierCategory.RawMaterialSupplier)
  cateGoryMap.set('Print, Wash or Dye House', SupplierCategory.PrintAndWashOrDyeHouse)
  cateGoryMap.set('Fabric Supplier', SupplierCategory.FabricSupplier)

  if (cateGoryMap.has(category)) {
    return cateGoryMap.get(category)
  }
  return getRandomInt(5, 6)
}

export const generateJobTitle = () => {
  const contactJobTitleData = readJsonFile('./server/migrations/seeds/supplier-contact-job-title-data.json')
  if (!contactJobTitleData) {
    return "Dummy"
  }

  const uno = contactJobTitleData.uno
  const zwei = contactJobTitleData.zwei
  const trois = contactJobTitleData.trois

  const unoIndex = getRandomInt(0, uno.length - 1)
  const zweiIndex = getRandomInt(0, zwei.length - 1)
  const troisIndex = getRandomInt(0, trois.length - 1)

  return uno[unoIndex] + " " + zwei[zweiIndex] + " " + trois[troisIndex]
}

export const generateDateArray = (startDate: DateTime, endDate: DateTime): Date[] => {
  const days: Date[] = []
  while(startDate <= endDate) {
    days.push(startDate.toJSDate())
    startDate = startDate.plus({days: 1})
  }
  return days
}
