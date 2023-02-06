import schema from './_model.js'
import login from './login.js'

export default {
  paths: {
    '/captain/login': {
      ...login,
    },
  },
  schema: {
    ...schema,
  },
}
