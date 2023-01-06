import schema from './_model.js'
import create from './create.js'
import update from './update.js'
import deletePackage from './delete.js'
import get from './get.js'

export default {
  paths: {
    '/package/create': {
      ...create,
    },
    '/package/update': {
      ...update,
    },
    '/package/{id}': {
      ...get,
    },
    '/package/delete/{id}': {
      ...deletePackage,
    },
  },
  schema: {
    ...schema,
  },
}
