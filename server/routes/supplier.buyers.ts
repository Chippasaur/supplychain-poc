import { get, map, groupBy, find, isEmpty, uniq, flatMap, sortBy, isNull } from 'lodash'

import { BuyerResponse } from '../../shared/response'
import { CustomizedNextApiRequest, RequestHandler } from '../types'
import logger from '../logger'
import { HttpStatusCode } from '../infrastructure/httpStatusCode'
import SupplierModel from '../models/supplier'
import ShipmentModel from '../models/shippment'
import { EntityType } from '../../shared/enum/entityType'

const getFromContributors = async (supplierId: string) => {
  const supplier = await SupplierModel.findOne({ _id: supplierId }, { _id: 1, buyers: 1, entity: 1 })
  if (isNull(supplier)) {
    throw new Error(' the supplier is nonexistent ')
  }

  let buyers: string[] = []
  if (supplier.entity === EntityType.Facility) {
    buyers = sortBy(uniq(supplier.buyers))
  } else {
    const suppliers = await SupplierModel.find({ groupId: supplierId }, { _id: 1, buyers: 1 })
    buyers = sortBy(uniq(flatMap(suppliers, supplier => supplier.buyers)))
  }

  return [supplier].map((item: { _id: string }) => {
    return <BuyerResponse>{
      id: item._id,
      buyers: buyers,
    }
  })
}

const getFromShipments = async (supplierId: string) => {
  let groupId = supplierId
  let facilities = await SupplierModel.find({ groupId: supplierId }, { _id: 1 }).lean()
  if (isEmpty(facilities)) {
    const facility = await SupplierModel.findOne({ _id: supplierId }, { groupId: 1 }).lean()
    facilities = await SupplierModel.find({ groupId: facility.groupId }, { _id: 1 }).lean()
    groupId = facility.groupId
  }

  const facilityIds = map(facilities, '_id')
  if (isEmpty(facilityIds)) {
    throw new Error('the supplier is non-existent ')
  }

  const shipments = await ShipmentModel.aggregate()
    .match({ sellerId: { $in: facilityIds } })
    .group({ _id: { sellerId: '$sellerId', buyerName: '$buyerName' }, value: { $sum: '$value' } })
    .sort({ value: -1 })
    .project({ _id: 0, sellerId: '$_id.sellerId', buyerName: '$_id.buyerName', value: '$value' })

  const buyers = groupBy(shipments, shipment => shipment.sellerId)
  const buyerGroup = map(Object.keys(buyers), sellerId => ({
    sellerId: sellerId,
    buyers: map(buyers[sellerId], buyer => buyer.buyerName),
  }))

  return facilities.map(supplier => {
    const isGroup = groupId === supplier._id
    const buyers = isGroup
      ? uniq(map(shipments, shipment => shipment.buyerName))
      : get(find(buyerGroup, { sellerId: supplier._id }), 'buyers', [])
    return <BuyerResponse>{ id: supplier._id, buyers }
  })
}

export const supplierBuyersHandler: RequestHandler<Array<BuyerResponse>, CustomizedNextApiRequest> = async (
  req,
  res,
) => {
  const supplierId = req.params.supplierId
  let response: BuyerResponse[] = []

  try {
    const { source } = req.query
    if (source === 'contributors') {
      response = await getFromContributors(supplierId)
    } else if (source === 'shipments') {
      response = await getFromShipments(supplierId)
    }
    res.json(response)
  } catch (error) {
    logger.error('Handle query supplier buyers error: ', error)
    res.status(HttpStatusCode.InternalServerError).end()
  }
}
