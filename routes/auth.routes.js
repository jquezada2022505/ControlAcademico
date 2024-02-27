const { Router } = require('express');
const { check } =  require('express-validator');

const { login, signup } = require('../controllers/authController');
const { validarCampos } =  require('../middlewares/validarCampos');

const router = Router();

router.post(
    '/login',
    [
        check('correo', "Este no es un correo válido").isEmail(),
        check('password'," el password es obligatorio").not().isEmpty(),
        validarCampos
    ], login);

router.post(
    '/signup', 
    [
    check('nombre'," el nombre es obligatorio").not().isEmpty(),
    check('correo', "Este no es un correo válido").isEmail(),
    check('password'," el password es obligatorio").not().isEmpty(),
    check('role'," el role es obligatorio").not().isEmpty(),
    ], signup);

module.exports = router;