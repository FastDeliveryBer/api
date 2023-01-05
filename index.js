import express from 'express'
import dotenv from 'dotenv'
import swaggerUI from 'swagger-ui-express'
import docs from './index.js'

dotenv.config()

const app = express()
const router = express.Router()
const HOST = process.env.HOST || 'http://localhost'
const PORT = parseInt(process.env.PORT || '3000')

app.listen(PORT, async () => {
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`)
})

router.get('/test', (req, res) => {
  res.status(200).send('test')
})

app.use(router)
