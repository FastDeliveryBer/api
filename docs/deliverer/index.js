import schema from './_model.js'
import create from './create.js'
import update from './update.js'
import deleteDeliverer from './delete.js'
import get from './get.js'

export default {
  paths: {
    '/deliverer/create': {
      ...create,
    },
    '/deliverer/update': {
      ...update,
    },
    '/deliverer/{id}': {
      ...get,
    },
    '/deliverer/delete/{id}': {
      ...deleteDeliverer,
    },
  },
  schema: {
    ...schema,
  },
}
