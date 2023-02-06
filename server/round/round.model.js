import { Round } from '../schemas/schema.round.js'
import Model from '../models/model.js'

export default class RoundMdl extends Model {
  queryCreateRound = async (deliverer_id, date, arrayTrackinId) => {
    try {
      let round = new Round({
        deliverer_id: deliverer_id,
        date: date,
        parcels: arrayTrackinId,
      })
      await round.save()
      return round
    } catch (error) {
      throw error
    }
  }

  queryGetRound = async (filteredData) => {
    const query = filteredData
    try {
      let round = await Round.find(query)
      return round
    } catch (error) {
      throw error
    }
  }

  queryUpdateRound = async (id, data) => {
    try {
      const round = await Round.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
      )
      return round
    } catch (error) {
      throw error
    }
  }

  queryAffectDelivererToRound = async (id, deliverer_id, date) => {
    try {
      const round = await Round.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            deliverer_id: deliverer_id,
            date: date,
          },
        },
        { new: true }
      )
      return round
    } catch (error) {
      throw error
    }
  }

  queryDeleteRound = async (id) => {
    try {
      const round = await Round.findOneAndDelete({ _id: id })
      return round
    } catch (error) {
      throw error
    }
  }

  didRoundAlreadyExiste = async (id) => {
    const query = { _id: id }

    try {
      const roundExist = await Round.exists(query)
      return roundExist
    } catch (error) {
      throw error
    }
  }

  didParcelAlreadyExisteForARound = async (idParcel) => {
    const query = { parcels: idParcel }

    try {
      const roundExist = await Round.exists(query)
      return roundExist
    } catch (error) {
      throw error
    }
  }
}
