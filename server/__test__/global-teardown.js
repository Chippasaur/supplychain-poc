import logger from '../logger'

module.exports = async () => {
  logger.info('jest global teardown on env:', process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'test') {
    await global.__MONGO_SERVER__.stop()
  }
}
