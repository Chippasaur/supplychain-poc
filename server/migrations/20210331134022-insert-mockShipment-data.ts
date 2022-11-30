import { DateTime } from 'luxon'

import { generateMockShipment } from './seeds/supplier-mockShipment-data'
import MockShipment from '../models/mockShipment'
import logger from '../logger'

exports.up = async () => {
  try {
    const mockShipments = await generateMockShipment(
      DateTime.fromISO('2021-01-01T08:00'),
      DateTime.fromISO('2021-03-06T08:00'),
    )
    await MockShipment.insertMany(mockShipments)
  } catch (error) {
    logger.error('db migration error', error)
  }
}

exports.down = async () => {
  try {
    await MockShipment.deleteMany()
  } catch (error) {
    logger.error('db migration error', error)
  }
}
