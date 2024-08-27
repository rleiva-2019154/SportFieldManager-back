import { Router } from "express";
import { 
    reserveField,
    userReservations,
    updateReservation,
    deleteReservation
} from "./reservation.controller.js";
import { uploadReservationImage } from "../../middlewares/multer-uploads.js";
import { addReservation } from "../../middlewares/check-validators.js";
import { validateJwt } from "../../middlewares/check-jwt.js";

const api = Router()

api.post(
    '/addReservation',
    validateJwt,
    uploadReservationImage.single('payment'),
    addReservation,
    reserveField
)

api.get(
    '/myReservations',
    validateJwt,
    userReservations
)

api.put("/updateReservation/:id", uploadReservationImage.single('payment'), updateReservation)

api.delete("/deleteReservation/:id", deleteReservation)

export default api