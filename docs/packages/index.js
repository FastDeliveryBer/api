import schema from './_model.js'
import create from './create.js'
import update from './update.js'
import deletePackage from './delete.js'
import get from './get.js'
import createForClient from './createForClient.js'

export default {
  paths: {
    '/package/create': {
      ...create,
    },
    '/package/update': {
      ...update,
    },
    '/package/get/{id}': {
      ...get,
    },
    '/package/delete/{id}': {
      ...deletePackage,
    },
    '/package/client/create': {
      ...createForClient,
    },
    '/package/client/update': {
      ...createForClient,
    },
    '/package/client/getAll': {
      ...createForClient,
    },
    '/package/client/delete': {
      ...createForClient,
    },
  },
  schema: {
    ...schema,
  },
}
