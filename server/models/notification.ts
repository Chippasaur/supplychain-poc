import mongoose from 'mongoose'

import { NotificationType } from '../../shared/enum/notificationType'

const { Schema } = mongoose

const notificationSchema = new Schema(
  {
    supplierId: {
      type: String,
      required: true,
    },
    supplierName: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      enum: Object.values(NotificationType),
      required: true,
    },
    postedAt: {
      type: Date,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdatedAt' } },
)

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema)
