import express from "express"
import {login, signup} from "../controllers/authController.js"
import upload from "../middleware/multer.js"

const router = express.Router()

router.post("/signup", upload.single('profilePicture'), signup)

router.post("/login", login)

export default router