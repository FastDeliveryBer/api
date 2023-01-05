import express from 'express'
import dotenv from 'dotenv'
import swaggerUI from 'swagger-ui-express'
import docs from './docs/index.js'
import morgan from 'morgan'
import { createWriteStream } from 'fs'

dotenv.config()

const app = express()
const router = express.Router()
const HOST = process.env.HOST || 'http://localhost'
const PORT = parseInt(process.env.PORT || '3000')

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(docs))

const accessLogStream = createWriteStream('./log/access.log', {
  flags: 'a',
})
app.use(
  morgan(
    ':date[clf] :remote-addr - :user-agent[family] :user-agent[major].:user-agent[minor] - :method :url[full] :status :response-time ms - :res[content-length]',
    { stream: accessLogStream }
  )
)

router.get('/test', (req, res) => {
  res.status(200).send('test')
})
router.get('/test2', (req, res) => {
  res.status(200).send('test')
})

app.use(router)

app.listen(PORT, async () => {
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`)
})
