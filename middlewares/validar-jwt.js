const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const { request, response } = require('express');
const { TEACHER_ROLE, STUDENT_ROLE } = require('../models/userModel');

// const validarJWT = async(req = request, res = response, next) => {
//     const token = req.header('x-token');

//     if (!token) {
//         return res.status(401).json({
//             msg: 'No hay token en la petición',
//         });
//     }

//     try {
//         const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
//         const teacher = await Teacher.findById(uid);
//         if (!teacher) {
//             return res.status(401).json({
//                 msg: "Maestro no existe en la base de datos"
//             });
//         }

//         if (!teacher.estado) {
//             return res.status(401).json({
//                 msg: "Token no válido, estudiante con estado fa lse"
//             });
//         }

//         req.teacher = teacher;
//         next();

//     } catch (e) {
//         console.log(e);
//         res.status(401).json({
//             msg: "Token no válido"
//         })
//     }
// }

const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }

    try {
        const { uid, role } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        let usuario;
        console.log({role});

        if (role === TEACHER_ROLE) {
            usuario = await Teacher.findById(uid);
            if (!usuario) {
                return res.status(401).json({
                    msg: "Maestro no existe en la base de datos"
                });
            }
            req.teacher = usuario
        } else if (role === STUDENT_ROLE) {
            usuario = await Student.findById(uid);
            if (!usuario) {
                return res.status(401).json({
                    msg: "Estudiante no existe en la base de datos"
                });
            }
        } else {
            return res.status(401).json({
                msg: "Rol de usuario inválido en el token"
            });
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Token no válido, usuario con estado falso"
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
}


module.exports = {
    validarJWT
}