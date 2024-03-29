const jwt = require('jsonwebtoken');

const generarJWT = (uid = '', role = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid, role};
        jwt.sign(
            payload,    
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '1h',
            },
            (err,token)=>{
                err ? (console.log(err),reject('No se se puede generar el token')): resolve(token);
            }
        );
    });
};

module.exports = {
    generarJWT
}