import express from 'express'
import ClassCtrl from '../controller/class.controller.js'
import UserMdl from '../user/user.model.js'
import bcrypt from 'bcrypt'
import Database from '../mogodb/mongo.connect.js'
import Authentication from './token.validation.js'

const { Request, Response } = express

export default class AuthController extends ClassCtrl {
  static login = async (req = Request, res = Response) => {
    let code = 404
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'email', type: 'string' },
        { label: 'password', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      if (listError.length > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
      } else {
        try {
          const db = await new Database()
          const userMdl = new UserMdl(db)
          const { email, password } = req.body
          const user = await userMdl.queryGetUserByEmail(email, password)
          response.message = 'Utilisateur inconnu'
          if (user) {
            let isSamePassword = await bcrypt.compare(password, user.password)
            response.message = 'Mot de passe incorrect'
            if (isSamePassword) {
              const { password, ...userWithoutPassword } = user._doc
              const token = Authentication.generateToken({ email: email })
              response.message = 'Utilisateur connecté'
              response.error = false
              res.header('x-auth-token', token)
              response.data.push({
                user: userWithoutPassword,
              })
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
    let code = 404
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
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

      if (listError.length > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
      } else {
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
            response.message = 'Impossible de créer un compte'
            if (user) {
              const token = Authentication.generateToken({ email: email })
              const { password, ...userWithoutPassword } = user._doc
              response.message = 'Utilisateur créé'
              response.error = false
              response.data.push({
                user: userWithoutPassword,
              })
              res.header('x-auth-token', token)
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

  static disconnect = async (req = Request, res = Response) => {
    let code = 400
    let response = {
      error: true,
      message: 'Bad request',
      data: [],
    }
    if (Object.keys(req.body).length > 0) {
      let dataIpt = [
        { label: 'mail', type: 'string' },
        { label: 'role', type: 'string' },
      ]
      let listError = this.verifSecure(dataIpt, req.body)

      //Vérification si des erreurs ont été trouvée précédement
      if (listError.length > 0) {
        response.message = 'Erreur'
        response.data.push(listError)
      } else {
        try {
          let { mail, role } = req.body
          let data = await UtilisateurMdl.queryGetUserByRole(mail, role)
          let message = 'Utilisateur inexistant'
          if (data instanceof Utilisateur) {
            try {
              data = await UtilisateurMdl.queryDisconnectUser(data)
              if (data instanceof Utilisateur) {
                message = 'Utilisateur déconnecté'
                response.error = false
              }
            } catch (error) {
              console.log(error)
            }
          }
          response.message = message
          response.data = []
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
