import schema from './_model.js'
import create from './create.js'
import update from './update.js'
import deleteClient from './delete.js'
import get from './get.js'

export default {
  paths: {
    '/client/create': {
      ...create,
    },
    '/client/update': {
      ...update,
    },
    '/client/{id}': {
      ...get,
    },
    '/client/delete/{id}': {
      ...deleteClient,
    },
  },
  schema: {
    ...schema,
  },
}
