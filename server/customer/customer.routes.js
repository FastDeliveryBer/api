import { Router } from 'express'
import CustomerCtrl from './customer.controller.js'

const router = Router()
router.get('', CustomerCtrl.get) //Récupérer les client
router.post('', CustomerCtrl.create) //Créer un client
router.patch('/:_id', CustomerCtrl.update) //Modifier un client
router.delete('/:_id', CustomerCtrl.delete) //Supprimer un client

export default router
