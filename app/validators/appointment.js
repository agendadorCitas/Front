import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js"

export const validateCreate = [
    check('cedula')
    .isLength({min: 5}),
    check('nombre')
    .not()
    .isEmpty()
    .isAlpha(),
    check('apellido')
    .notEmpty(),
    check('telefono')
    .exists()
    .isNumeric()
    .isLength({min: 10}),
    check('direccion')
    .exists()
    .not()
    .isEmpty(),
    check('correo')
    .exists()
    .isEmail()
    .normalizeEmail(),
    check('idLab')
    .notEmpty()
    .isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]