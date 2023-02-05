import { Router } from 'express'
import ParcelCtrl from './parcel.controller.js'

const router = Router()
router.get('', ParcelCtrl.get) //Récupérer les colis
router.post('', ParcelCtrl.create) //Créer un colis
router.put('', ParcelCtrl.update) //Modifier un colis
router.delete('', ParcelCtrl.delete) //Supprimer un colis

export default router
