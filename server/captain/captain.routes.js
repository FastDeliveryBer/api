import { Router } from 'express'
import CaptainCtrl from './captain.controller.js'

const router = Router()
router.get('', CaptainCtrl.get) //Récupérer les captains
router.post('', CaptainCtrl.create) //Créer un captain
router.patch('/:id', CaptainCtrl.update) //Modifier un captain
router.delete('/:_id', CaptainCtrl.delete) //Supprimer un captain

export default router
