import swaggerBase from './swaggerBase.json'
import health from './health.json'
import users from './users.json'
import customers from './customers.json'
import suppliers from './suppliers.json'
import alerts from './alerts.json'
import news from './news.json'
import notifications from './notifications.json'

const swaggerDoc = {
  ...swaggerBase,
  paths: {
    ...health.paths,
    ...users.paths,
    ...customers.paths,
    ...suppliers.paths,
    ...alerts.paths,
    ...news.paths,
    ...notifications.paths,
  },
}

export default swaggerDoc
