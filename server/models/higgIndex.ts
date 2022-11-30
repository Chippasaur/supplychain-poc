import mongoose from 'mongoose'

const HiggIndexSchema = new mongoose.Schema(
  {
    selfAssessment: {
      type: Number,
      required: true,
    },
    verified: {
      type: Number,
      required: true,
    },
    supplierId: {
      type: String,
      required: true,
    },
    sustainability: {
      ems: {
        type: Number,
        required: true,
      },
      energyEmissions: {
        type: Number,
        required: true,
      },
      waterUse: {
        type: Number,
        required: true,
      },
      wasteWaterEffluent: {
        type: Number,
        required: true,
      },
      emissionToAir: {
        type: Number,
        required: true,
      },
      wasteManagement: {
        type: Number,
        required: true,
      },
      chemicals: {
        type: Number,
        required: true,
      },
    },
    reportTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdatedAt' } },
)

const model = mongoose.models.HiggIndex || mongoose.model('HiggIndex', HiggIndexSchema, 'higg_indexes')

export default model
