import { mapValues, values, reduce } from 'lodash'

export interface SustainabilityPerformance {
  ems: number
  energyEmissions: number
  waterUse: number
  wasteWaterEffluent: number
  emissionToAir: number
  wasteManagement: number
  chemicals: number
}

const addSustainabilityPerformance = (acc: SustainabilityPerformance, cur: SustainabilityPerformance) => {
  return {
    ems: acc.ems + cur.ems,
    energyEmissions: acc.energyEmissions + cur.energyEmissions,
    waterUse: acc.waterUse + cur.waterUse,
    wasteWaterEffluent: acc.wasteWaterEffluent + cur.wasteWaterEffluent,
    emissionToAir: acc.emissionToAir + cur.emissionToAir,
    wasteManagement: acc.wasteManagement + cur.wasteManagement,
    chemicals: acc.chemicals + cur.chemicals,
  }
}

const divideSustainabilityPerformance = (dividend: SustainabilityPerformance, divisor: number) => {
  return mapValues(dividend, v => v / divisor)
}

const averageSustainabilityPerformance = (performance: SustainabilityPerformance) => {
  const performanceValues = values(performance)
  return reduce(performance, (acc, curr) => acc + curr, 0) / performanceValues.length
}

export { addSustainabilityPerformance, divideSustainabilityPerformance, averageSustainabilityPerformance }
