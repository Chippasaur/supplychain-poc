import mongoose from 'mongoose'

const { Schema } = mongoose

const customerSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    logoUri: {
      type: String,
      required: false,
    },
    relations: [
      {
        source: { type: String, required: true },
        target: { type: String, required: true },
      },
    ],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdatedAt' } },
)

export default mongoose.models.Customer || mongoose.model('Customer', customerSchema)
