import deliverer from './deliverer/index.js'
import packages from './packages/index.js'
import round from './round/index.js'
import client from './clients/index.js'

export default {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'FastDeliveryBer API',
    description: 'FastDeliveryBer API Rest',
    contact: {
      name: 'FastDeliveryBer Contact',
      email: 'info@fdb.fr',
      url: 'https://fdb.fr',
    },
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Local server',
    },
  ],
  paths: {
    ...deliverer.paths,
    ...packages.paths,
    ...round.paths,
    ...client.paths,
  },
  components: {
    schemas: {
      ...deliverer.schema,
      ...packages.schema,
      ...round.schema,
      ...client.schema,
    },
  },
}
