import { map } from 'lodash'

import { CustomizedNextApiRequest, RequestHandler } from '../types'
import { MockShipmentResponse } from '../../shared/response'
import MockShipment from '../models/mockShipment'
import logger from '../logger'
import { HttpStatusCode } from '../infrastructure/httpStatusCode'
import { getFacilityIds } from '../services/customer.suppliers.service'

export const supplierMockShipmentHandler: RequestHandler<
  Array<MockShipmentResponse>,
  CustomizedNextApiRequest
> = async (req, res) => {
  const supplierId = req.params.supplierId

  try {
    const facilityIds = await getFacilityIds(supplierId)

    const mockShipmentDocs = await MockShipment.aggregate()
      .match({ facilityId: { $in: facilityIds } })
      .group({
        _id: { shipmentDate: '$shipmentDate' },
        volume: { $sum: '$volume' },
      })
      .sort({ '_id.shipmentDate': 1 })
      .project({
        _id: 0,
        shipmentDate: '$_id.shipmentDate',
        volume: '$volume',
      })

    const mockShipments = map(
      mockShipmentDocs,
      mockShipmentDoc =>
        <MockShipmentResponse>{
          shipmentDate: mockShipmentDoc.shipmentDate,
          volume: mockShipmentDoc.volume,
        },
    )
    return res.json(mockShipments)
  } catch (error) {
    logger.error('mockShipment handler error', error)
    res.status(HttpStatusCode.InternalServerError).end()
  }
}
