import {
  calcTurnoverGrowthRate,
  calcNetIncomeGrowthRate,
  getFourDecimalNumber,
} from '../../routes/supplier.incomeStatements'

describe('CustomerSupplierIncomeStatementHandlerService', () => {
  it('should calculate turnover growth rate right ', () => {
    expect(calcTurnoverGrowthRate(1000000, 900000)).toEqual(0.1111)
  })

  it('should calculate net income growth rate right ', () => {
    expect(calcNetIncomeGrowthRate(1000000, 900000)).toEqual(0.1111)
  })

  it('should get four decimal number given a number ', () => {
    expect(getFourDecimalNumber(0.11115)).toEqual(0.1112)
  })
})
