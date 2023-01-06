import schema from './_model.js'
import create from './create.js'
import update from './update.js'
import deleteRound from './delete.js'
import get from './get.js'

export default {
  paths: {
    '/round/create': {
      ...create,
    },
    '/round/update': {
      ...update,
    },
    '/round/{id}': {
      ...get,
    },
    '/round/delete/{id}': {
      ...deleteRound,
    },
  },
  schema: {
    ...schema,
  },
}
