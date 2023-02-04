import { Router } from 'express'
import AuthController from './auth.controller.js'
import User from './../user/user.model.js'

const router = Router()

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
//router.post('/disconnect', AuthController.disconnect)

export default router
