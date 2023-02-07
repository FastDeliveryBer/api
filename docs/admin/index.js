import schema from './_model.js'
import login from './login.js'

export default {
  paths: {
    '/admin/login': {
      ...login,
    },
  },
  schema: {
    ...schema,
  },
}
