import { Router } from 'express'
import DeliveryCtrl from './deliverer.controller.js'

const router = Router()
router.get('/tournee', DeliveryCtrl.fnc) //Récupérer les tournées d'un livreur
router.get('/places', DeliveryCtrl.fnc) //Récupérer les points de livraion sur une carte
router.post('/photos', DeliveryCtrl.fnc) //Ajouter des photosà une livraison
router.post('/update/langage', DeliveryCtrl.fnc) //Changer la langue enregistré pour l'application

export default router
