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
 
        const token = await generarJWT(usuario.id);

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
 
module.exports = {
    login
};

