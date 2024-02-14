const validarCampos  = require('../middlewares/validarCampos');
const validarJWT  = require('../middlewares/validar-jwt');
const  esTEACHER_Role  = require('../middlewares/validar-roles');
const  esSTUDENT_Role  = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...esTEACHER_Role,
    ...esSTUDENT_Role
}