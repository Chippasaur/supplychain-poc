import { connectDB } from '../infrastructure/dbConnection'
import { Middleware } from '../types'

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env

export const mongoMiddleware: Middleware = async (_, __, next) => {
  await connectDB({
    host: DB_HOST || '',
    dbName: DB_NAME || '',
    user: DB_USER || '',
    password: DB_PASS || '',
    port: 27017,
  })

  return next()
}
