import { map, find } from 'lodash'

import Supplier from '../../models/supplier'
import logger from "../../logger";
import {EntityType} from "../../../shared/enum/entityType";

export interface tradeDoc {
  seller: string
  buyers: string[]
}

export const parseBuyers = (contributors: string) => {
  try {
    const contributorsData = JSON.parse(contributors)
    return map(contributorsData, contributor => contributor.name)
  } catch (error) {
    logger.error('parse json error ', error)
    logger.info(contributors)
    return []
  }
}

export const generateTradeDocs = (buyersData: any[]) => {
  return map(buyersData, tradeRecord => ({
    seller: tradeRecord.name,
    buyers: parseBuyers(tradeRecord.contributors)
  }))
}

export const updateSupplierBuyers = async (tradeDocs: tradeDoc[]) => {
  const supplierNames = map(tradeDocs, tradeDoc => tradeDoc.seller)
  try {
    const suppliers = await Supplier.find({
        name: { $in: supplierNames },
        entity: EntityType.Facility },
      { name: 1, _id: 1})

    const bulkUpdates = map(suppliers, supplier => {
      const tradeDoc = find(tradeDocs, { seller: supplier.name })
      return {
        updateOne: {
          filter: { _id: supplier._id },
          update: { buyers: tradeDoc ? tradeDoc.buyers : []},
        }
      }
    })
    await Supplier.bulkWrite(bulkUpdates)
  } catch (error) {
    logger.error('update error', error)
  }

}
