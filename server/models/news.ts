import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema(
  {
    supplierId: {
      type: String,
      required: true,
    },
    duns: {
      type: String,
      required: true,
    },
    categories: [{ type: String }],
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    referenceUrl: {
      type: String,
      required: true,
    },
    postedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdatedAt' } },
)

const model = mongoose.models.News || mongoose.model('News', newsSchema)

export default model
