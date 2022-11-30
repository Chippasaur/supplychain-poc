import { map } from 'lodash'
import mongoose from 'mongoose'

const trucateCollections = async () => {
  const isConnected = mongoose.connection.readyState === 1
  if (isConnected) {
    const clearCollectionTasks = map(mongoose.connection.collections, collection => {
      return collection.deleteMany({})
    })
    await Promise.all(clearCollectionTasks)
  }
}
export { trucateCollections }
