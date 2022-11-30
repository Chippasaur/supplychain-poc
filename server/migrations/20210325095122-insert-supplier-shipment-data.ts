import Shipment from '../models/shippment'
import { generateBaseShipment, matchSupplier } from './seeds/supplier-shipment-data'
import logger from '../logger'

exports.up = async () => {
  const baseShipments = generateBaseShipment()
  try {
    logger.info('start match shipment data with supplier')
    await matchSupplier(baseShipments)
    logger.info('match shipment data with supplier done')

    logger.info('start insert shipment data')
    await Shipment.insertMany(baseShipments)
    logger.info('insert shipment data done')
  } catch (error) {
    logger.error('db-migration up error ', error)
  }
}

exports.down = async () => {
  try {
    await Shipment.deleteMany()
  } catch (error) {
    logger.error('db-migration down error', error)
  }
}
