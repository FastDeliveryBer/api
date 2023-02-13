import { Router } from 'express'
import DeliveryCtrl from './deliverer.controller.js'

const router = Router()
router.get('', DeliveryCtrl.get) //Récupérer les livreurs
router.post('', DeliveryCtrl.create) //Créer un livreur
router.patch('/:id', DeliveryCtrl.updateDeliverer) //Modifier un livreur
router.delete('/:id', DeliveryCtrl.deleteDeliverer) //Supprimer un livreur

export default router
