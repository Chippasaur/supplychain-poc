import mongoose from 'mongoose'

import { EntityType } from '../../shared/enum/entityType'
import { CompanyStatus } from '../../shared/enum/companyStatus'
import { Sanction } from '../../shared/enum/sanction'

const { Schema } = mongoose

const supplierSchema = new Schema(
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
    },
    contact: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      telephone: {
        type: String,
        required: false,
      },
      jobTitle: {
        type: String,
        required: true,
      },
      websiteUrl: {
        type: String,
        require: false,
      },
      officialEmail: {
        type: String,
        require: false,
      },
    },
    rating: {
      type: Number,
      required: true,
    },
    category: {
      type: Number,
      required: true,
    },
    coordinate: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    location: {
      address: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        require: false,
      },
      region: {
        type: String,
        require: false,
      },
      postalCode: {
        type: String,
        required: false,
      },
    },
    entity: {
      type: Number,
      enum: Object.values(EntityType),
      required: true,
    },
    groupId: {
      type: String,
      required: false,
    },
    business: {
      businessType: {
        type: String,
        required: false,
      },
      entityType: {
        type: String,
        required: false,
      },
    },
    registration: {
      registrationName: {
        type: String,
        required: false,
      },
      registrationNumber: {
        type: String,
        required: false,
      },
      registrationType: {
        type: String,
        required: false,
      },
    },
    overallStatus: {
      companyStatus: {
        type: Number,
        enum: Object.values(CompanyStatus),
        require: false,
      },
      sanction: {
        type: Number,
        enum: Object.values(Sanction),
        require: true,
      },
      ultimateOwners: {
        type: [String],
        require: true,
      },
      beneficialOwners: {
        type: [String],
        require: true,
      },
      revenue: {
        type: Number,
        require: true,
      },
      employeeNum: {
        type: Number,
        require: true,
      },
    },
    buyers: {
      type: [String],
      require: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdatedAt' } },
)

export default mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema)
