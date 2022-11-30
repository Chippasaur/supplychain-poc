import { createMocks } from 'node-mocks-http'
import mongoose from 'mongoose'

import SupplierIncomeStatement from '../../models/supplierIncomeStatement'
import { queryCustomerSupplierIncomeStatementsHandler } from '../../routes/supplier.incomeStatements'
import { HttpStatusCode } from '../../infrastructure/httpStatusCode'

describe('supplier income statement api test', () => {
  it('should get income statement data given supplier id', async () => {
    const supplierId = mongoose.Types.ObjectId().toHexString()
    const expectResponse = await givenIncomeStatementDoc(supplierId)
    const { req, res } = createMocks({
      method: 'GET',
      params: { supplierId },
    })

    await queryCustomerSupplierIncomeStatementsHandler(req, res, err => {
      console.error(err)
    })

    const supplierIncomeStatementResponse = res._getJSONData()
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(supplierIncomeStatementResponse.supplierId).toEqual(supplierId)
    expect(supplierIncomeStatementResponse.year).toEqual(expectResponse.year)
    expect(supplierIncomeStatementResponse.turnover.concreteValue).toEqual(expectResponse.turnover.concreteValue)
    expect(supplierIncomeStatementResponse.turnover.growthRate).toEqual(expectResponse.turnover.growthRate)
    expect(supplierIncomeStatementResponse.netIncome.concreteValue).toEqual(expectResponse.netIncome.concreteValue)
    expect(supplierIncomeStatementResponse.netIncome.growthRate).toEqual(expectResponse.netIncome.growthRate)
  })
})

async function givenIncomeStatementDoc(supplierId: string) {
  const lastYear = new Date().getFullYear() - 1
  const theYearBeforeLastSupplierIncomeStatement = {
    supplierId,
    year: lastYear - 1,
    turnover: 100000000,
    netIncome: 10000000,
  }
  const lastYearSupplierIncomeStatement = {
    supplierId,
    year: lastYear,
    turnover: 120000000,
    netIncome: 12000000,
  }
  await SupplierIncomeStatement.insertMany([lastYearSupplierIncomeStatement, theYearBeforeLastSupplierIncomeStatement])

  const turnoverGrowthRate =
    (lastYearSupplierIncomeStatement.turnover - theYearBeforeLastSupplierIncomeStatement.turnover) /
    theYearBeforeLastSupplierIncomeStatement.turnover
  const netIncomeGrowthRate =
    (lastYearSupplierIncomeStatement.netIncome - theYearBeforeLastSupplierIncomeStatement.netIncome) /
    theYearBeforeLastSupplierIncomeStatement.netIncome

  return {
    supplierId,
    year: lastYear,
    turnover: {
      concreteValue: lastYearSupplierIncomeStatement.turnover,
      growthRate: turnoverGrowthRate,
    },
    netIncome: {
      concreteValue: lastYearSupplierIncomeStatement.netIncome,
      growthRate: netIncomeGrowthRate,
    },
  }
}
