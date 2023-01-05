import { Router } from "express";
import MessageCtrl from "./message.controller";

const router = Router();

router.get("/list", MessageCtrl.getMessage); //Récupérer l'ensemble des messages
router.get("/tour", MessageCtrl.getMessageReady); //Récupérer l'ensemble des messages prêt à être envoyés
router.get("/:id", MessageCtrl.msgUser); //Récupérer un message pour un compte
router.get("/list/user/:id", MessageCtrl.msgUser); //Récupérer l'ensemble des messages d'un user

export default router;
