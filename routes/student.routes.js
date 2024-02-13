const { Router } = require('express');
const { check } = require('express-validator');
const { existeEmail, esRoleValido, existeStudentById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validarCampos');

const {
    studentPost,
    studentGet,
    getStudentById,
    putStudent,
    studentDelete } = require('../controllers/students.controllers');

const router = Router();

router.get("/", studentGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeStudentById),
        validarCampos,
    ], getStudentById
);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeStudentById),
        check("role").custom(esRoleValido),
        validarCampos,
    ], putStudent
);

router.post(
    "/",
    [
        check("nombre", "Nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo valido").isEmail(),
        check("curso", "debe ingresar un curso").not().isEmpty(),
        check("correo").custom(existeEmail),
        check("role").custom(esRoleValido),
        validarCampos,
    ], studentPost
);

router.delete(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeStudentById),
        validarCampos,
    ], studentDelete
);

module.exports = router;