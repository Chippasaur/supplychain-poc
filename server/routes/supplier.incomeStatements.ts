import { SupplierIncomeStatementResponse } from '../../shared/response'
import { CustomizedNextApiRequest, RequestHandler } from '../types'
import SupplierIncomeStatement from '../models/supplierIncomeStatement'
import { HttpStatusCode } from '../infrastructure/httpStatusCode'
import logger from '../logger'

export const getFourDecimalNumber = (number: number) => {
  return (Math.sign(number) * Math.round(Math.abs(number) * 1e4)) / 1e4
}

export const calcTurnoverGrowthRate = (
  lastYearSupplierIncomeStatementTurnOver: number,
  theYearBeforeLastSupplierIncomeStatementTurnover: number,
) => {
  const number =
    (lastYearSupplierIncomeStatementTurnOver - theYearBeforeLastSupplierIncomeStatementTurnover) /
    theYearBeforeLastSupplierIncomeStatementTurnover
  return getFourDecimalNumber(number)
}

export const calcNetIncomeGrowthRate = (
  lastYearSupplierIncomeStatementNetIncome: number,
  theYearBeforeLastSupplierIncomeStatementNetIncome: number,
) => {
  const number =
    (lastYearSupplierIncomeStatementNetIncome - theYearBeforeLastSupplierIncomeStatementNetIncome) /
    theYearBeforeLastSupplierIncomeStatementNetIncome
  return getFourDecimalNumber(number)
}

export const queryCustomerSupplierIncomeStatementsHandler: RequestHandler<
  SupplierIncomeStatementResponse,
  CustomizedNextApiRequest
> = async (req, res) => {
  const supplierId = req.params.supplierId

  try {
    const lastYear = new Date().getFullYear() - 1
    const theYearBeforeLast = lastYear - 1
    const lastYearSupplierIncomeStatement = await SupplierIncomeStatement.findOne({
      supplierId,
      year: lastYear,
    })
    const theYearBeforeLastSupplierIncomeStatement = await SupplierIncomeStatement.findOne({
      supplierId,
      year: theYearBeforeLast,
    })

    const turnoverGrowthRate = calcTurnoverGrowthRate(
      lastYearSupplierIncomeStatement.turnover,
      theYearBeforeLastSupplierIncomeStatement.turnover,
    )

    const netIncomeGrowthRate = calcNetIncomeGrowthRate(
      lastYearSupplierIncomeStatement.netIncome,
      theYearBeforeLastSupplierIncomeStatement.netIncome,
    )

    const supplierIncomeStatementResponse: SupplierIncomeStatementResponse = {
      supplierId: lastYearSupplierIncomeStatement.supplierId,
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
    res.json(supplierIncomeStatementResponse)
  } catch (error) {
    logger.error('Handle query customer supplier income statements error: ', error)
    res.status(HttpStatusCode.InternalServerError).end()
  }
}
