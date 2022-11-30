import mongoose from 'mongoose'

import { AlertLevel } from '../../shared/enum/alertLevel'
import { AlertType } from '../../shared/enum/alertType'

const { Schema } = mongoose

const AlertSchema = new Schema(
  {
    supplierId: {
      type: String,
      required: true,
    },
    supplierName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    postedAt: {
      type: Date,
      required: true,
    },
    level: {
      type: String,
      enum: Object.values(AlertLevel),
      required: true,
    },
    type: {
      type: AlertType,
      enum: Object.values(AlertType),
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdatedAt' } },
)

export default mongoose.models.Alert || mongoose.model('Alert', AlertSchema)
