import { Router } from 'express'
import AdminCtrl from './admin.controller.js'

const router = Router()
router.get('', AdminCtrl.get) //Récupérer les admins
router.post('', AdminCtrl.create) //Créer un admin
router.patch('/:id', AdminCtrl.update) //Modifier un admin
router.delete('/:id', AdminCtrl.delete) //Supprimer un admin

export default router
