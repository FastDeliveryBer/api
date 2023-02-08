import express from 'express'
import ClassCtrl from '../controller/class.controller.js'
import UserMdl from '../user/user.model.js'
import bcrypt from 'bcrypt'
import Database from '../mogodb/mongo.connect.js'
import Authentication from './token.validation.js'

const { Request, Response } = express

export default class AuthController extends ClassCtrl {
  static login = async (req = Request, res = Response) => {
    let code = 400
    let response
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'email', type: 'string' },
        { label: 'password', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length === 0) {
        try {
          code = 404
          const db = await new Database()
          const userMdl = new UserMdl(db)
          const { email, password } = req.body
          const user = await userMdl.queryGetUserByEmail(email, password)

          if (user) {
            let isSamePassword = await bcrypt.compare(password, user.password)
            if (isSamePassword) {
              code = 400
              const { password, ...userWithoutPassword } = user._doc
              const token = Authentication.generateToken({ email: email })
              res.header('x-auth-token', token)
              response = userWithoutPassword
              code = 200
            }
          }
        } catch (error) {
          console.log(error)
          res.status(400).send(error)
        }
      }
      res.status(code).send(response)
    }
  }

  static register = async (req = Request, res = Response) => {
    let code = 400
    let response
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'lastname', type: 'string' },
        { label: 'firstname', type: 'string' },
        { label: 'email', type: 'string' },
        { label: 'phone', type: 'number' },
        { label: 'langage', type: 'string' },
        { label: 'password', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length === 0) {
        try {
          const db = await new Database()
          const userMdl = new UserMdl(db)
          const { firstname, lastname, email, password, phone, langage } =
            req.body

          const userAlreadyExist = await userMdl.didUserAlreadyExiste(email)
          response.message = 'Cet utilisateur existe déjà'
          if (!userAlreadyExist) {
            const user = await userMdl.queryCreateUser(
              firstname,
              lastname,
              email,
              password,
              phone,
              langage
            )
            if (user) {
              const token = Authentication.generateToken({ email: email })
              const { password, ...userWithoutPassword } = user._doc
              response = userWithoutPassword
              res.header('x-auth-token', token)
              code = 201
            }
          }
        } catch (error) {
          console.log(error)
          res.status(400).send(error)
        }
      }
      res.status(code).send(response)
    }
  }

  static disconnect = async (req = Request, res = Response) => {
    let code = 400
    let response
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'mail', type: 'string' },
        { label: 'role', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length === 0) {
        try {
          let { mail, role } = req.body
          let data = await UtilisateurMdl.queryGetUserByRole(mail, role)
          if (data instanceof Utilisateur) {
            try {
              data = await UtilisateurMdl.queryDisconnectUser(data)
            } catch (error) {
              console.log(error)
            }
          }
          code = 200
        } catch (error) {
          console.log(error)
          res.status(400).send(error)
        }
      }
      res.status(code).send(response)
    } else {
      res.status(code).send(response)
    }
  }
}
