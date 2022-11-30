import { initMemoryServer } from './dbServer'
import logger from '../logger'

module.exports = async () => {
  logger.info('jest global setup on env:', process.env.NODE_ENV)
  const databaseContextSetter = {
    ci: async () => {
      process.env.DB_HOST = '34.92.118.222'
      process.env.DB_NAME = 'serai_poc_ci'
      process.env.DB_USER = 'serai_poc_ci'
      process.env.DB_PASS = 'sEra1e1'
      process.env.USER_EMAIL = 'example@example.com'
      process.env.PORT = 27017
    },
    test: async () => {
      process.env.DB_HOST = '127.0.0.1'
      process.env.DB_NAME = 'test'
      process.env.DB_USER = 'test_user'
      process.env.DB_PASS = 'test'
      process.env.USER_EMAIL = 'example@example.com'
      process.env.PORT = 30000

      const params = {
        host: process.env.DB_HOST,
        port: Number(process.env.PORT),
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
      }
      const mongoServer = initMemoryServer(params)

      global.__MONGO_SERVER__ = mongoServer

      await mongoServer.start()
      logger.info('after global setup', await global.__MONGO_SERVER__.getUri())
    },
  }
  const contextSetter = databaseContextSetter[process.env.NODE_ENV]
  contextSetter ? await contextSetter() : ''
}
