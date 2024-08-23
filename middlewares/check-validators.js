import { check } from "express-validator";
import { validationResult } from "express-validator"

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