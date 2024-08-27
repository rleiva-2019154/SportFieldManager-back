import { Router } from "express";
import { 
    register,
    login
} from './auth.controller.js'
import { registerValidator, loginValidator } from "../../middlewares/check-validators.js";
import { uploadProfileImage } from "../../middlewares/multer-uploads.js";
import { generateJwt } from "../../utils/generate-jwt.js";

const api = Router()

api.post('/register', uploadProfileImage.single("profilePicture"), registerValidator, register)
api.post('/login', loginValidator, login)

export default api