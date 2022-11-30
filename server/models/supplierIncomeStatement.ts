import mongoose from 'mongoose'

const supplierIncomeStatementSchema = new mongoose.Schema(
  {
    supplierId: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    turnover: {
      type: Number,
      required: true,
    },
    netIncome: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdatedAt' } },
)

export default mongoose.models.SupplierIncomeStatement ||
  mongoose.model('SupplierIncomeStatement', supplierIncomeStatementSchema, 'supplier_income_statements')
