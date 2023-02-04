import express from 'express'
import dotenv from 'dotenv'
import swaggerUI from 'swagger-ui-express'
import docs from './docs/index.js'
import configlog from './log/log.js'
import authMiddleware from './server/middleware/auth.js'
import authRoute from './server/auth/auth.routes.js'
import deliverer from './server/deliverer/deliverer.routes.js'

dotenv.config()

const app = express()
const HOST = process.env.HOST || 'http://localhost'
const PORT = process.env.PORT || 4500

/**
 * Middlewares
 */
app.use(configlog)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(docs))

/**
 * Route initialization
 */
app.use('/auth', authRoute)
//app.use(authMiddleware)
app.use('/deliverer', deliverer)

app.listen(PORT, async () => {
  console.log('\x1b[43m%s\x1b[0m', `API listening at ${HOST}:${PORT}`)
})
