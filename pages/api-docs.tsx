import SwaggerUI from 'swagger-ui-react'

import 'swagger-ui-react/swagger-ui.css'
import swaggerDoc from '../api-documents/swaggerDoc'

export default function ApiDocs() {
  return <SwaggerUI spec={swaggerDoc} />
}
