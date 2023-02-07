import schema from './_model.js'
import create from './create.js'
import update from './update.js'
import deleteRound from './delete.js'
import get from './get.js'

export default {
  paths: {
    '/round': {
      ...create,
      ...get,
    },
    '/round/{id}': {
      ...update,
      ...deleteRound,
    },
  },
  schema: {
    ...schema,
  },
}
