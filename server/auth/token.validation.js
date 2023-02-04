import jwt from 'jsonwebtoken'
import UserMdl from '../user/user.model.js'

export default class Authentication {
  static generateToken = (data) => {
    return jwt.sign(data, `${process.env.SECRETKEY}`, { expiresIn: '1d' })
  }

  static isTokenValid = (token) => {
    return UserMdl.isTokenValid(token)
  }
}
