import { Router } from 'express'
import DeliveryCtrl from './deliverer.controller'

const router = Router()

router.get('/tournee', _) //Récupérer les tournées d'un livreur
router.get('/places', DeliveryCtrl.msgUser) //Récupérer les points de livraion sur une carte
router.post('/photos', _) //Ajouter des photosà une livraison
router.post('/update/langage', _) //Changer la langue enregistré pour l'application

export default router
