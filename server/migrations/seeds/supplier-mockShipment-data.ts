import { forEach } from 'lodash'
import {DateTime} from "luxon";
import { ObjectId } from 'mongodb'

import Supplier from '../../models/supplier'
import mockShipment from "../../models/mockShipment";
import { generateDateArray, getRandomInt } from './utils/utils'
import {EntityType} from "../../../shared/enum/entityType";

export interface mockShipment {
  _id: string
  facilityId: string
  facilityName: string
  shipmentDate: Date
  volume: number
}

export const generateMockShipment = async (startDate: DateTime, endDate: DateTime) => {
  const suppliers = await Supplier.find({ entity: EntityType.Facility }, { _id : 1, name: 1 })
  const mockShipmentData: mockShipment[] = []

  const dateArrays: Date[] = generateDateArray(startDate, endDate)
  forEach(suppliers, supplier => {
    forEach(dateArrays, date => {
      mockShipmentData.push({
        _id: new ObjectId().toHexString(),
        facilityId: supplier._id,
        facilityName: supplier.name,
        shipmentDate: date,
        volume: getRandomInt(20, 80)
      })
    })
  })
  return mockShipmentData
}
