import { FacilityResponse } from '../../shared/response'
import { CustomizedNextApiRequest, RequestHandler } from '../types'
import logger from '../logger'
import { HttpStatusCode } from '../infrastructure/httpStatusCode'
import SupplierModel from '../models/supplier'

export const queryCustomerSupplierFacilitiesHandler: RequestHandler<
  Array<FacilityResponse>,
  CustomizedNextApiRequest
> = async (req, res) => {
  const supplierId = req.params.supplierId

  try {
    const supplierFacilitiesDoc = await SupplierModel.find({ groupId: supplierId, entity: 0 })

    const supplierFacilities = supplierFacilitiesDoc.map(facility => {
      return <FacilityResponse>{
        id: facility._id,
        name: facility.name,
        location: facility.location,
        coordinate: {
          latitude: facility.coordinate.latitude,
          longitude: facility.coordinate.longitude,
        },
      }
    })
    res.json(supplierFacilities)
  } catch (error) {
    logger.error('Handle query customer supplier facilities error: ', error)
    res.status(HttpStatusCode.InternalServerError).end()
  }
}
