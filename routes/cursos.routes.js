const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { cursosPost, cursosGet, getCursoById, putCursos, cursosDelete, asignarCursosPost } = require('../controllers/cursos.controller');
const { existeCursosById } = require('../helpers/db-validators');
const { esTEACHER_Role } = require("../middlewares/validar-roles");

const router = Router();

router.get("/", cursosGet);

router.post(
    "/", [
        validarJWT,
        esTEACHER_Role,
        check("nombre", "Nombre no puede estar vacio").not().isEmpty(),
        check("descripcion", "Descripcion no puede estar vacia").not().isEmpty(),
        validarCampos,
    ], cursosPost);

router.post(
    "/asignar/:id",
    [
        check("correo", "Correo no puede estar vacio").not().isEmpty(),
    ], asignarCursosPost);

router.get(
    "/:id", [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursosById),
        validarCampos
    ], getCursoById);


router.put(
    "/:id", [
        validarJWT,
        esTEACHER_Role,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursosById),

        validarCampos
    ], putCursos);


router.delete(
    "/:id", [
        validarJWT,
        esTEACHER_Role,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCursosById),
        validarCampos
    ],
    cursosDelete
);


module.exports = router;