import {
  addSustainabilityPerformance,
  divideSustainabilityPerformance,
  averageSustainabilityPerformance,
} from '../../services/customer.higgindex.service'

describe('addSustainabilityPerformance', () => {
  const performance1 = {
    ems: 10.0,
    energyEmissions: 20.0,
    waterUse: 30.0,
    wasteWaterEffluent: 40.0,
    emissionToAir: 50.0,
    wasteManagement: 60.0,
    chemicals: 70.0,
  }

  const performance2 = {
    ems: 10.0,
    energyEmissions: 10.0,
    waterUse: 10.0,
    wasteWaterEffluent: 10.0,
    emissionToAir: 10.0,
    wasteManagement: 10.0,
    chemicals: 10.0,
  }

  const performance3 = {
    ems: 10.0,
    energyEmissions: 20.0,
    waterUse: 30.0,
    wasteWaterEffluent: 40.0,
    emissionToAir: 50.0,
    wasteManagement: 60.0,
    chemicals: 70.0,
  }

  const performance4 = {
    ems: 10.0,
    energyEmissions: 20.0,
    waterUse: 30.0,
    wasteWaterEffluent: 40.0,
    emissionToAir: 50.0,
    wasteManagement: 60.0,
    chemicals: 70.0,
  }

  it('should be able to get correct summation performance', () => {
    const res = addSustainabilityPerformance(performance1, performance2)
    expect(res.ems).toEqual(20.0)
    expect(res.energyEmissions).toEqual(30.0)
    expect(res.waterUse).toEqual(40.0)
    expect(res.wasteWaterEffluent).toEqual(50.0)
    expect(res.emissionToAir).toEqual(60.0)
    expect(res.wasteManagement).toEqual(70.0)
    expect(res.chemicals).toEqual(80.0)
  })

  it('should be able to get correct division performance', () => {
    const res = divideSustainabilityPerformance(performance3, 2)
    expect(res.ems).toEqual(5.0)
    expect(res.energyEmissions).toEqual(10.0)
    expect(res.waterUse).toEqual(15.0)
    expect(res.wasteWaterEffluent).toEqual(20.0)
    expect(res.emissionToAir).toEqual(25.0)
    expect(res.wasteManagement).toEqual(30.0)
    expect(res.chemicals).toEqual(35.0)
  })

  it('should be able to get correct average performance', () => {
    const avgScore = averageSustainabilityPerformance(performance4)
    expect(avgScore).toEqual(40.0)
  })
})
