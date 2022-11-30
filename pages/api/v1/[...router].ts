import nextConnect from 'next-connect'

import { mongoMiddleware } from '../../../server/middlewares'
import {
  healthCheckHandler,
  alertsHandler,
  customersHandler,
  customerSuppliersHandler,
  customerCreditRiskHandler,
  newsHandler,
  notificationsHandler,
  updateNotificationsHandler,
  queryCustomerSupplierHandler,
  usersHandler,
  queryCustomerSupplierFacilitiesHandler,
  queryCustomerSupplierIncomeStatementsHandler,
  customerFinancialRiskHandler,
  customerSustainabilityPerformanceHandler,
  customerNotificationContentsHandler,
  supplierShipmentHandler,
  supplierBuyersHandler,
  supplierMockShipmentHandler,
} from '../../../server/routes'

export default nextConnect({ attachParams: true })
  .use(mongoMiddleware)
  .get('/api/v1/health', healthCheckHandler)
  .get('/api/v1/users/me', usersHandler)
  .get('/api/v1/customers/:id', customersHandler)
  .get('/api/v1/customers/:id/suppliers', customerSuppliersHandler)
  .get('/api/v1/customers/:id/credit-risk-counts', customerCreditRiskHandler)
  .get('/api/v1/customers/:id/financial-risk-counts', customerFinancialRiskHandler)
  .get('/api/v1/customers/:id/notification-contents', customerNotificationContentsHandler)
  .get('/api/v1/customers/:customerId/suppliers/:supplierId', queryCustomerSupplierHandler)
  .get('/api/v1/customers/:id/sustainability-performance-scores', customerSustainabilityPerformanceHandler)
  .get('/api/v1/suppliers/:supplierId/buyers', supplierBuyersHandler)
  .get('/api/v1/suppliers/:supplierId/shipments', supplierShipmentHandler)
  .get('/api/v1/suppliers/:supplierId/mock-shipments', supplierMockShipmentHandler)
  .get('/api/v1/suppliers/:supplierId/facilities', queryCustomerSupplierFacilitiesHandler)
  .get('/api/v1/suppliers/:supplierId/income-statements/latest', queryCustomerSupplierIncomeStatementsHandler)
  .get('/api/v1/news', newsHandler)
  .get('/api/v1/alerts', alertsHandler)
  .get('/api/v1/notifications', notificationsHandler)
  .put('/api/v1/notifications/:id', updateNotificationsHandler)
