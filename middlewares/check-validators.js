import { check } from "express-validator";
import { validationResult } from "express-validator"
import { validateReservationData } from "../utils/db-validators.js";

const validateInput = (req, res, next)=>{
    const e = validationResult(req)
    if(!e.isEmpty()){
        return res.status(400).json(e)
    }
    next()
}

export const registerValidator = [
    check('name', "El nombre es obligatorio").not().isEmpty(),
    check('surname',"El apellido es obligatorio").not().isEmpty(),
    check('email')
        .not().isEmpty().withMessage("El correo electronico es obligatorio")
        .isEmail().withMessage("El correo proporcionado no es valido"),
    check('password')
    .not().isEmpty().withMessage("La password es obligatoria")
    .isLength({ min: 6 }).withMessage("La password debe ser mayor a seis caracteres"),
    validateInput
]

export const loginValidator = [
    check('username')
        .optional()  
        .notEmpty()
        .withMessage("El nombre de usuario no puede estar vacío"),
    check('email')
        .optional()  
        .notEmpty().withMessage("El correo electrónico no puede estar vacío")
        .isEmail().withMessage("El correo proporcionado no es válido"),
    check('password')
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 6 }).withMessage("La contraseña debe ser mayor a seis caracteres"),
    validateInput
];

export const addFieldValidator = [
    check("fieldName", "El nombre de la cancha es obligatoria").not().isEmpty(),
    check("fieldType", "El tipo de cancha es obligatoria").not().isEmpty(),
    check("capacity", "La capacidad de la cancha es obligatoria").not().isEmpty(),
    validateInput
]

export const addReservation = [
    check("startTime", "La hora de inicio es obligatoria").not().isEmpty(),
    check("endTime", "La hora de finalizacion es obligatoria").not().isEmpty(),
    check("fieldId", "Es necesario que seleccione una cancha").not().isEmpty(),
    check("uid", "No se puede reservar una cancha si no esta logueado")
        .not()
        .isEmpty(),
        validateInput,
        validateReservationData
]