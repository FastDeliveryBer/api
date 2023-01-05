import express from 'express'
import dotenv from 'dotenv'
import swaggerUI from 'swagger-ui-express'
import docs from './docs/index.js'
import configlog from './log/log.js'
import deliverer from './server/deliverer/deliverer.routes.js'

dotenv.config()

const app = express()
const HOST = process.env.HOST || 'http://localhost'
const PORT = parseInt(process.env.PORT || '3000')

/**
 * Middlewares
 */
app.use(configlog)
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(docs))

/**
 * Route initialization
 */
app.use('/deliverer', deliverer)

app.listen(PORT, async () => {
  console.log('\x1b[43m%s\x1b[0m', `API listening at ${HOST}:${PORT}`)
})
