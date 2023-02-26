import { Router } from 'express'
import RoundCtrl from './round.controller.js'

const router = Router()
router.get('', RoundCtrl.get) //Récupérer une ou plusieur tournée(s)
router.get('/parcels', RoundCtrl.getWithParcelsDetails) //Récupérer une ou plusieur tournée(s)
router.post('', RoundCtrl.create) //Créer une tournée
router.post('/empty', RoundCtrl.createWithoutParcels) //Créer une tournée sans colis
router.patch('/:id', RoundCtrl.update) //Modifier une tournée
router.delete('/:id', RoundCtrl.delete) //Supprimer une tournée
router.post('/affect', RoundCtrl.affectDeliverer) //Affecter un livreur à une tournée

export default router
