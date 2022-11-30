import { MongoMemoryServer } from 'mongodb-memory-server'

import { MongoParams } from '../infrastructure/dbConnection'

let mongoServer: MongoMemoryServer

const initMemoryServer = (params: MongoParams) => {
  mongoServer = new MongoMemoryServer({
    instance: {
      dbName: params.dbName,
      port: params.port,
      auth: true,
    },
    auth: {
      extraUsers: [
        {
          createUser: params.user,
          pwd: params.password,
          database: params.dbName,
          roles: [{ role: 'readWrite', db: params.dbName }],
        },
      ],
    },
  })
  return mongoServer
}

export { initMemoryServer }
