const { Router } = require('express');
const { check } = require('express-validator');
const { existeEmailTeacher, esRoleValido, existeTeacherById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validarCampos');

const {
    teacherPost,
    teacherGet,
    getTeacherById,
    putTeacher,
    teacherDelete } = require('../controllers/teacher.contoller');

const router = Router();

router.get("/", teacherGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeTeacherById),
        validarCampos,
    ], getTeacherById
);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeTeacherById),
        check("role").custom(esRoleValido),
        validarCampos,
    ], putTeacher
);

router.post(
    "/",
    [
        check("nombre", "Nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo valido").isEmail(),
        check("curso", "debe ingresar un curso").not().isEmpty(),
        check("correo").custom(existeEmailTeacher),
        check("role").custom(esRoleValido),
        validarCampos,
    ], teacherPost
);

router.delete(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeTeacherById),
        validarCampos,
    ], teacherDelete
);

module.exports = router;