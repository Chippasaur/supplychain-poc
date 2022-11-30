import { groupBy, map, reduce } from 'lodash'

import { CustomizedNextApiRequest, RequestHandler } from '../types'
import { ShipmentRecord, ShipmentResponse } from '../../shared/response'
import Shipment from '../models/shippment'
import logger from '../logger'
import { HttpStatusCode } from '../infrastructure/httpStatusCode'
import { getFacilityIds } from '../services/customer.suppliers.service'

export const supplierShipmentHandler: RequestHandler<ShipmentResponse, CustomizedNextApiRequest> = async (req, res) => {
  const supplierId = req.params.supplierId

  try {
    const facilityIds = await getFacilityIds(supplierId)

    const shipmentDocs = await Shipment.aggregate()
      .match({ sellerId: { $in: facilityIds } })
      .group({
        _id: { hsCode: '$hsCode', buyerCompanyCode: '$buyerCompanyCode' },
        buyerName: { $first: '$buyerName' },
        volume: { $sum: 1 },
        value: { $sum: '$value' },
        description: { $first: '$hsDescription' },
      })
      .sort({ '_id.hsCode': 1 })
      .project({
        _id: 0,
        buyer: '$buyerName',
        buyerCompanyCode: '$_id.buyerCompanyCode',
        hsCode: '$_id.hsCode',
        hsDescription: '$description',
        volume: '$volume',
        value: '$value',
      })

    const shipments = map(
      shipmentDocs,
      shipmentDoc =>
        <ShipmentRecord>{
          hsCode: shipmentDoc.hsCode,
          hsDescription: shipmentDoc.hsDescription,
          buyer: shipmentDoc.buyer,
          buyerCompanyCode: shipmentDoc.buyerCompanyCode,
          volume: shipmentDoc.volume,
          value: shipmentDoc.value,
        },
    )

    const totalShipments = getTotalShipments(shipments)
    const averageValue = getAverageValue(shipments)

    const shipmentResponse = <ShipmentResponse>{
      totalShipments: totalShipments,
      averageValue: averageValue,
      shipmentRecords: shipments,
    }
    return res.json(shipmentResponse)
  } catch (error) {
    logger.error('shipment handler error', error)
    res.status(HttpStatusCode.InternalServerError).end()
  }
}

export const getTotalShipments = (shipments: ShipmentRecord[]): number => {
  return reduce(shipments, (sum, currShipment) => sum + currShipment.volume, 0)
}

export const getAverageValue = (shipments: ShipmentRecord[]): number => {
  const buyerShipments = groupBy(shipments, shipment => shipment.buyerCompanyCode)

  const buyerValues = map(Object.keys(buyerShipments), buyer => ({
    buyer: buyer,
    totalValue: reduce(buyerShipments[buyer], (sum, curr) => sum + curr.value, 0),
  }))

  const totalValue = reduce(buyerValues, (sum, currBuyer) => sum + currBuyer.totalValue, 0)

  return buyerValues.length === 0 ? 0 : totalValue / buyerValues.length
}
