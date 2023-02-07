import schema from './_model.js'
import create from './create.js'
import update from './update.js'
import deleteParcel from './delete.js'
import get from './get.js'

export default {
  paths: {
    '/parcel': {
      ...create,
      ...get,
    },
    '/parcel/{id}': {
      ...update,
      ...deleteParcel,
    },
  },
  schema: {
    ...schema,
  },
}
