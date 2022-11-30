import mongoose from 'mongoose'

import { TrafficLightLevel } from '../../shared/enum/trafficLightLevel'

const TrafficLightIndexSchema = new mongoose.Schema(
  {
    level: {
      type: Number,
      enum: Object.values(TrafficLightLevel),
      required: true,
    },
    supplierId: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdatedAt' } },
)

const model =
  mongoose.models.TrafficLightIndex ||
  mongoose.model('TrafficLightIndex', TrafficLightIndexSchema, 'traffic_light_indexes')

export default model
