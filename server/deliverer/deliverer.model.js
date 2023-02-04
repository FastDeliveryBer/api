import MongoDB from '../mogodb/mongo.connect.js'
import { Deliverer } from './../schemas/schema.deliverer.js'
import Model from './../models/model.js'

export default class DelivererMdl extends Model {
  queryGetDeliverer = async () => {
    const query = {}

    try {
      let deliverer = await Deliverer.find()
      return deliverer
    } catch (error) {
      throw error
    }
  }
}
