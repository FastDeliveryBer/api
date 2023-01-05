import express from 'express'

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
