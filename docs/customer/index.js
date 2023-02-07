import schema from './_model.js'
import create from './create.js'
import update from './update.js'
import deleteCustomer from './delete.js'
import get from './get.js'

export default {
  paths: {
    '/customer': {
      ...create,
      ...get,
    },
    '/customer/{id}': {
      ...update,
      ...deleteCustomer,
    },
    '/customer/login': {
      ...deleteCustomer,
    },
  },
  schema: {
    ...schema,
  },
}
