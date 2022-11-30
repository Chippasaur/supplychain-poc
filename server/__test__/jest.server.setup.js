import { trucateCollections } from './trucater'
import { connectDB, disconnectDB } from '../infrastructure/dbConnection'
import logger from '../logger'

jest.setTimeout(60000)

beforeAll(async () => {
  logger.info('jest setup for all files on env:', process.env.NODE_ENV)
  const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env
  await connectDB({
    host: DB_HOST,
    dbName: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
    port: Number(process.env.PORT),
  })
})

beforeEach(async () => {
  await trucateCollections()
})

afterAll(async () => {
  await disconnectDB()
})
