import mongoose from 'mongoose'

const { Schema } = mongoose

const mockShipmentSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    facilityName: {
      type: String,
      required: true,
    },
    facilityId: {
      type: String,
      required: true,
    },
    shipmentDate: {
      type: Date,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdatedAt' } },
)

export default mongoose.models.MockShipment || mongoose.model('MockShipment', mockShipmentSchema)
