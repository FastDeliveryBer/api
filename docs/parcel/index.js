import schema from './_model.js'
import create from './create.js'
import update from './update.js'
import deleteParcel from './delete.js'
import get from './get.js'
import createForClient from './createForClient.js'
import updateByClient from './updateByClient.js'
import getByClient from './getByClient.js'
import deleteByClient from './deleteByClient.js'

export default {
  paths: {
    '/parcel': {
      ...create,
      ...update,
      ...get,
    },
    '/parcel/{id}': {
      ...deleteParcel,
    },
    '/parcel/client/create': {
      ...createForClient,
    },
    '/parcel/client/update': {
      ...updateByClient,
    },
    '/parcel/client/getAll': {
      ...getByClient,
    },
    '/parcel/client/delete': {
      ...deleteByClient,
    },
  },
  schema: {
    ...schema,
  },
}
