import Customer from '../models/customer'
import { CustomersResponse } from '../../shared/response'
import { CustomizedNextApiRequest, RequestHandler } from '../types'
import logger from '../logger'
import { HttpStatusCode } from '../infrastructure/httpStatusCode'

export const customersHandler: RequestHandler<CustomersResponse, CustomizedNextApiRequest> = async (req, res, next) => {
  const id = req.params.id
  try {
    const customerDoc = await Customer.findById(id)
    const customer: CustomersResponse = {
      id: customerDoc._id,
      name: customerDoc.name,
      logoUri: customerDoc.logoUri,
      relations: customerDoc.relations,
    }
    res.json(customer)
  } catch (error) {
    logger.error('Handle query customer request error: ', error)
    res.status(HttpStatusCode.InternalServerError).end()
  }
}
