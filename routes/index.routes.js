import { Router } from "express"
import { marco, ping } from "../controllers/index.controllers.js"

const router = Router()

router.get("/marco", marco)
router.get("/ping", ping)

export default router
