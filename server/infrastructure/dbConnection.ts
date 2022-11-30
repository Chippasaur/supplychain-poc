import mongoose, { ConnectOptions } from 'mongoose'

import logger from '../logger'

export interface MongoParams {
  host: string
  port: number
  user: string
  password: string
  dbName: string
}

const buildDbConnectionUri = (params: MongoParams) => {
  return `mongodb://${params.user}:${params.password}@${params.host}:${params.port}/${params.dbName}`
}

const connectDB = async (params: MongoParams, opts?: ConnectOptions) => {
  const defaultOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
  }
  try {
    await mongoose.connect(buildDbConnectionUri(params), opts ? opts : defaultOpts)
    logger.info('connected to database')
  } catch (error) {
    logger.error('mongoose connect error:', error)
  }
}

const disconnectDB = async () => {
  try {
    await mongoose.disconnect()
  } catch (error) {
    logger.error('mongoose disconnect error:', error)
  }
}

export { connectDB, disconnectDB, buildDbConnectionUri }
