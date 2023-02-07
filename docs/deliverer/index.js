import schema from './_model.js'
import create from './create.js'
import update from './update.js'
import deleteDeliverer from './delete.js'
import get from './get.js'
import login from './login.js'

export default {
  paths: {
    '/deliverer': {
      ...create,
      ...get,
    },
    '/deliverer/{id}': {
      ...update,
      ...deleteDeliverer,
    },
    '/deliverer/login': {
      ...login,
    },
  },
  schema: {
    ...schema,
  },
}
