import mongoose from 'mongoose'
import database from './../mogodb/mongo.connect.js'
import Model from './../models/model.js'
import { User } from './user.js'
import bcrypt from 'bcrypt'

export default class UserModel extends Model {
  queryGetUser = async () => {
    const query = {}
    const options = {}

    try {
      const hashedPassword = await bcrypt.hash('azerty', 10)
      let user = new User({
        first_name: 'Nicolas',
        last_name: 'String',
        email: 'String',
        password: hashedPassword,
        phone: 123,
        language: 'String',
      })
      await user.save()

      User.findOne({ first_name: 'Nicolas' })
      return user
    } catch (error) {
      throw error
    }
  }

  didUserAlreadyExiste = async (email) => {
    const query = { email: email }

    try {
      let userExist = await User.exists(query)
      return userExist
    } catch (error) {
      throw error
    }
  }

  queryCreateUser = async (
    firstname,
    lastname,
    email,
    password,
    phone,
    langage
  ) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      let user = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
        phone: phone,
        language: langage,
      })
      await user.save()
      return user
    } catch (error) {
      throw error
    }
  }

  queryGetUserByEmail = async (email) => {
    const query = { email: email }

    try {
      let user = await User.findOne(query)
      return user
    } catch (error) {
      throw error
    }
  }

  /* 
  static queryConnectUser = async (utilisateur: Utilisateur) => {
    let db = new client()
    let query = { mail: utilisateur.getMail }

    try {
      utilisateur.setConnexion()
      let userConnect = await db.connect(CollectionsConst.UTILISATEURS)
      let data = await userConnect.updateOne(query, {
        $set: {
          derniere_connexion: utilisateur.getDerniereConnexion,
          active: true,
        },
      })
      await db.disconnect()
      return utilisateur
    } catch (error) {
      await db.disconnect()
      throw error
    }
  }

  static queryDisconnectUser = async (utilisateur: Utilisateur) => {
    let db = new client()
    let query = { mail: utilisateur.getMail, role: utilisateur.getRole }

    try {
      utilisateur.setConnexion()
      let userConnect = await db.connect(CollectionsConst.UTILISATEURS)
      let data = await userConnect.updateOne(query, { $set: { active: false } })
      await db.disconnect()
      return utilisateur
    } catch (error) {
      await db.disconnect()
      throw error
    }
  } */
}
