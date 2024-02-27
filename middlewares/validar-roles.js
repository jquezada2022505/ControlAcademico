const { response } = require("express");
const { TEACHER_ROLE, STUDENT_ROLE } = require("../models/userModel");


const esTEACHER_Role = (req, res, next) => {
    console.log(req.teacher);
    if (!req.teacher) {
        return res.status(500).json({
            msg: "Se desea validar maestro sin validar token primero"
        });
    }

    const { role, nombre } = req.teacher;

    if (role !== TEACHER_ROLE) {
        return res.status(401).json({
            msg: `${nombre} no es un ${TEACHER_ROLE}, no puede usar este endpoint`
        });
    };
    next();
}

const esSTUDENT_Role = (req, res, next) => {
    if (!req.student) {
        return res.status(500).json({
            msg: "Se desea validar estudiante sin validar token primero"
        });
    }

    const { role, nombre } = req.teacher;

    if (role !== STUDENT_ROLE) {
        return res.status(401).json({
            msg: `${nombre} no es un ${STUDENT_ROLE}, no puede usar este endpoint`
        });
    };
    next();
}

module.exports = {
    esTEACHER_Role,
    esSTUDENT_Role
}