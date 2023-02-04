import express from 'express'
import jwt from 'jsonwebtoken'

const AUTH_ROUTES = ['/auth/connect']

const { Request, Response, next } = express

const authToken = (req = Request, res = Response) => {
  if (AUTH_ROUTES.some((r) => r == req.url)) {
    next()
    return
  }

  // test le header avec bearer
  const authHeader = req.headers['authorization']
  if (!authHeader)
    return res.status(401).send('Access denied. No token provided.')

  // test l'existance du token
  const token = authHeader.split(' ')[1]
  if (token == null)
    return res.status(401).send('Access denied. No token provided.')

  // test la validation du token
  jwt.verify(token, `${process.env.SECRETKEY}`, (err, _) => {
    if (err) {
      console.log('ERR : authToken', err)
      return res.status(403).send('Invalid token.')
    }
    next()
  })
}

export default authToken
