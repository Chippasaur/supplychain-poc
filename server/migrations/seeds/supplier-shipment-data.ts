import { ObjectId } from 'mongodb'
import { map, isEmpty, uniq, forEach, find } from 'lodash'

import { readJsonFile } from './utils/utils'
import Shipment from '../../models/shippment'
import Supplier from '../../models/supplier'
import logger from '../../logger'

export interface Shipment {
  _id: string
  sellerName: string
  sellerId: string
  buyerName: string
  shipmentDate: Date
  hsCode: string
  hsDescription: string
  value: number
}

const getCompanyCodeFromName = (originString: string) => {
  const cleanStringIt = originString.toLocaleLowerCase().matchAll(/[a-z0-9]+/g)
  let splicedCleanString = ""
  let result = cleanStringIt.next()
  while (!result.done) {
    splicedCleanString += result.value[0]
    result = cleanStringIt.next()
  }
  return splicedCleanString
}

export const generateBaseShipment = () => {
  const shipmentData = readJsonFile('./server/migrations/seeds/shipmentData.json')
   return map(shipmentData, shipment => ({
    _id: new ObjectId().toHexString(),
    sellerName: shipment.name,
    sellerId: '',
    buyerName: shipment.buyerName,
    buyerCompanyCode: getCompanyCodeFromName(shipment.buyerName),
    shipmentDate: isEmpty(shipment.shipmentDate) ? '2018/10/20' : shipment.shipmentDate,
    hsCode: isEmpty(shipment.hsCode) ? '99999' : shipment.hsCode,
    hsDescription: isEmpty(shipment.hsDescription) ? 'description' : shipment.hsDescription,
    value: isEmpty(shipment.value) ? 5000 : Number(shipment.value),
  }))
}

export const matchSupplier = async (shipments: Shipment[]) => {
  const sellerNames: string[] = uniq(map(shipments, shipment => shipment.sellerName))
  try {
    const suppliers = await Supplier.find({ name: { $in: sellerNames } }, { name: 1, _id: 1 })
    forEach(shipments, shipment => {
      const supplier = find(suppliers, { name: shipment.sellerName })
      shipment.sellerId = supplier ? supplier._id : 'dummy supplier id'
    })
  } catch (error) {
    logger.error('fail to match supplier id', error)
  }
}
