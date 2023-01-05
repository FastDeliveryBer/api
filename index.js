import express from 'express'
import dotenv from 'dotenv'
import swaggerUI from 'swagger-ui-express'
import docs from './docs/index.js'

dotenv.config()

const app = express()
const router = express.Router()
const HOST = process.env.HOST || 'http://localhost'
const PORT = parseInt(process.env.PORT || '3000')

app.listen(PORT, async () => {
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`)
})

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(docs))

router.get('/test', (req, res) => {
  res.status(200).send('test')
})

app.use(router)
