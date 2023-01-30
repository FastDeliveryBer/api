import schema from './_model.js'
import create from './create.js'
import update from './update.js'
import deleteRound from './delete.js'
import get from './get.js'
import getForDeliverer from './getForDeliverer.js'
import attribut from './attributToDeliverer.js'

export default {
  paths: {
    '/round/create': {
      ...create,
    },
    '/round/update': {
      ...update,
    },
    '/round/get/{id}': {
      ...get,
    },
    '/round/delete/{id}': {
      ...deleteRound,
    },
    '/round/deliverer/{id}': {
      ...getForDeliverer,
    },
    '/round/attribut/{id}': {
      ...attribut,
    },
  },
  schema: {
    ...schema,
  },
}
