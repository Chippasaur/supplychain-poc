import mongoose from 'mongoose'
import { range } from 'lodash'

import { DAndBLevel } from '../../shared/enum/dAndBLevel'
import { FinancialStrength } from '../../shared/enum/financialStrength'
import { CompositeCreditAppraisal } from '../../shared/enum/compositeCreditAppraisal'
import { DAndBFinancialRisk } from '../../shared/enum/dAndBFinancialRisk'

const DAndBIndexSchema = new mongoose.Schema(
  {
    level: {
      type: Number,
      enum: Object.values(DAndBLevel),
      required: true,
    },
    rating: {
      type: String,
    },
    padex: {
      type: Number,
      enum: range(0, 101),
    },
    financialStrength: {
      type: Number,
      enum: Object.values(FinancialStrength),
    },
    compositeCreditAppraisal: {
      type: Number,
      enum: Object.values(CompositeCreditAppraisal),
    },
    financialRisk: {
      type: Number,
      enum: Object.values(DAndBFinancialRisk),
    },
    viabilityRating: {
      type: String,
    },
    viabilityScore: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    supplierId: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdatedAt' } },
)

const model = mongoose.models.DAndBIndex || mongoose.model('DAndBIndex', DAndBIndexSchema, 'd_and_b_indexes')

export default model
