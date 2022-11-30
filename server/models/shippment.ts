import mongoose from 'mongoose'

const { Schema } = mongoose

const shipmentSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    buyerCompanyCode: {
      type: String,
      required: true,
    },
    shipmentDate: {
      type: Date,
      required: true,
    },
    hsCode: {
      type: String,
      required: true,
    },
    hsDescription: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdatedAt' } },
)

export default mongoose.models.Shipment || mongoose.model('Shipment', shipmentSchema)
