import { NextApiRequest } from 'next'

import { UsersResponse } from '../../shared/response'
import { RequestHandler } from '../types'
import User from '../models/user'
import { HttpStatusCode } from '../infrastructure/httpStatusCode'
import logger from '../logger'

export const usersHandler: RequestHandler<UsersResponse, NextApiRequest> = async (req, res, next) => {
  try {
    const { USER_EMAIL } = process.env
    const userDoc = await User.findOne({ email: USER_EMAIL })

    const user: UsersResponse = {
      name: userDoc.name,
      email: userDoc.email,
      customerId: userDoc.customerId,
    }
    res.json(user)
  } catch (error) {
    logger.error('Handle query user request error: ', error)
    res.status(HttpStatusCode.InternalServerError).end()
  }
}
