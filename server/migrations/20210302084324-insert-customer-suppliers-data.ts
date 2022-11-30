import User from '../models/user'
import Customer from '../models/customer'
import Supplier from '../models/supplier'
import SupplierIncomeStatement from '../models/supplierIncomeStatement'
import News from '../models/news'
import TrafficLightIndex from '../models/trafficLightIndex'
import DAndBIndex from '../models/dAndBIndex'
import HiggIndex from '../models/higgIndex'
import Notification from '../models/notification'
import Alert from '../models/alert'
import {
  generateBaseSuppliers,
  generateDAndBIndexesIndexes,
  generateHiggIndexes,
  generateNews,
  generateSupplierIncomeStatements,
  generateSuppliers,
  generateTrafficLightIndexes,
  user,
  matchGroup,
  generateNotifications,
  generateAlerts,
} from './seeds/customer-supplier-data'
import { generateTradeDocs, updateSupplierBuyers } from './seeds/supplier-buyers-data'
import { insertToCustomer } from './seeds/customer-data'
import buyersData from './seeds/buyersList.json'

exports.up = async () => {
  const baseSuppliers = generateBaseSuppliers()
  matchGroup(baseSuppliers)

  try {
    await User.insertMany(user)

    const customer = insertToCustomer(baseSuppliers)
    await Customer.insertMany(customer)

    const suppliers = generateSuppliers(baseSuppliers)
    await Supplier.insertMany(suppliers)

    const tradeDocs = generateTradeDocs(buyersData)
    await updateSupplierBuyers(tradeDocs)

    const supplierIncomeStatements = generateSupplierIncomeStatements(baseSuppliers)
    await SupplierIncomeStatement.insertMany(supplierIncomeStatements)

    const news = generateNews(baseSuppliers)
    await News.insertMany(news)

    const trafficLightIndexes = generateTrafficLightIndexes(baseSuppliers)
    await TrafficLightIndex.insertMany(trafficLightIndexes)

    const dAndBIndexes = generateDAndBIndexesIndexes(baseSuppliers)
    await DAndBIndex.insertMany(dAndBIndexes)

    const higgIndexes = generateHiggIndexes(baseSuppliers)
    await HiggIndex.insertMany(higgIndexes)

    const notifications = generateNotifications(baseSuppliers)
    await Notification.insertMany(notifications)

    const suppliersWithBuyersDocs = await Supplier.find({})
    const suppliersWithBuyers = JSON.parse(JSON.stringify(suppliersWithBuyersDocs))
    const alerts = generateAlerts(suppliersWithBuyers, { dAndBIndexes, higgIndexes, trafficLightIndexes })
    await Alert.insertMany(alerts)
  } catch (error) {
    console.error('migration error: ', error)
  }
}

exports.down = async () => {
  try {
    await User.deleteMany()
    await Customer.deleteMany()

    await Supplier.deleteMany()
    await SupplierIncomeStatement.deleteMany()
    await News.deleteMany()
    await TrafficLightIndex.deleteMany()
    await DAndBIndex.deleteMany()
    await HiggIndex.deleteMany()
    await Notification.deleteMany()
    await Alert.deleteMany()
  } catch (error) {
    console.error('migration error: ', error)
  }
}
