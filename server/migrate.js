const mongoose = require('mongoose')
const dbMigrate = require('db-migrate')

const database = require('../database.json')

async function afterMigrated() {
  await mongoose.disconnect()
}

async function beforeMigrate(env) {
  const user = database[env].user
  const password = database[env].password
  const host = database[env].host
  const port = database[env].port
  const databaseName = database[env].database

  const uri = `mongodb://${user}:${password}@${host}:${port}/${databaseName}`
  console.log('connecting to database', databaseName)

  const defaultOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  await mongoose.disconnect()
  try {
    await mongoose.connect(uri, defaultOpts)
  } catch (error) {
    console.error('mongoose connection error:', error)
  }
}

const dbm = dbMigrate.getInstance(false, afterMigrated)
// process.argv[5]: db-migrate env param，use it to setup mongoose connection
dbm.registerAPIHook(beforeMigrate(process.argv[5])).then(() => dbm.run())
