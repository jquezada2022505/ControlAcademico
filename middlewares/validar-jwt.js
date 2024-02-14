const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const { request, response } = require('express');

const validarJWT = async(req = request, res = response, next)=> {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const student = await Student.findById(uid);
        if(!student){
            return res.status(401).json({
                msg: "Estudiante no existe en la base de datos"
            });
        }

        if(!student.estado){
            return res.status(401).json({
                msg: "Token no válido, estudiante con estado false"
            });
        }

        req.student = student;
        next();
        
    }catch(e){
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        })
    }
} 

module.exports = {
    validarJWT
}