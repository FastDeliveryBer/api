import deliverer from './deliverer/index.js'
import parcel from './parcel/index.js'
import round from './round/index.js'
import client from './clients/index.js'
import admin from './admin/index.js'

const HOST = process.env.HOST || 'http://localhost'
const PORT = process.env.PORT || 4500

export default {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'FastDeliveryBer API',
    description: `FastDeliveryBer API Rest
    Some useful links:
    - [Github source code](https://github.com/FastDeliveryBer/api)
    `,
    contact: {
      name: 'FastDeliveryBer Contact',
      email: 'info@fdb.fr',
      url: 'https://fdb.fr',
    },
  },
  servers: [
    {
      url: `https://fastdb-api.herokuapp.com/`,
      description: 'Server',
    },
  ],
  paths: {
    ...deliverer.paths,
    ...parcel.paths,
    ...round.paths,
    ...client.paths,
    ...admin.paths,
  },
  components: {
    schemas: {
      ...deliverer.schema,
      ...parcel.schema,
      ...round.schema,
      ...client.schema,
      ...admin.schema,
    },
  },
}
