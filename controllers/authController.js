const { STUDENT_ROLE, TEACHER_ROLE } = require ( "../models/userModel");
const { request, response } = require("express");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;
    try {
        let usuario = await Student.findOne({ correo });
 
        if (!usuario) {
            usuario = await Teacher.findOne({ correo });
 
            if (!usuario) {
                return res.status(400).json({
                    msg: "Credenciales incorrectas, correo no existe en la base de datos."
                });
            }
        }
 
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "El usuario no está activo en la base de datos."
            });
        }
 
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: "Contraseña incorrecta"
            });
        }
 
        const token = await generarJWT(usuario.id, usuario.role);

        res.status(200).json({
            msg: "Bienvenido",
            usuario,
            token
        });
 
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuníquese con el administrador"
        });
    }
};
 
const signup = async(req, res) => {
    const {nombre, correo, password, role} = req.body;
    let usuario;
    const salt = await bcryptjs.genSalt(10);
    const passwordEncripted = await bcryptjs.hash(password, salt);

    if ((role === STUDENT_ROLE)) {
        usuario = new Student({correo, password:passwordEncripted, nombre});
    }

    if (role === TEACHER_ROLE) {
        usuario = new Teacher({nombre, correo, password: passwordEncripted, role})
    }

    if (role !== STUDENT_ROLE && role !== TEACHER_ROLE) {
        return res.status(400).json({
            msg: `ROLE invalido, el rol debe ser ${TEACHER_ROLE} o ${STUDENT_ROLE}`
        })
    }


    
    usuario.save();
    res.status(201).json(usuario)
}

module.exports = {
    login,
    signup
};

