const Role = require('../models/role');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${role} no existe la base de datos`);

    }
}

const existeEmail = async (correo = '') => {
    const existeEmail = await Student.findOne({correo});
    if(existeEmail){
        throw new Error (`El correo ${correo} ya esta registrado`);
    }
}

const existeStudentById = async (id = '') => {
    const existeStudent = await Student.findOne({id});
    if(existeStudent){
        throw  new Error(`El estudiante con el ${ id } no existe`);
    }
}

const existeTeacherById = async (id = '') => {
    const existeTeacher = await Teacher.findOne({id});
    if(existeTeacher){
        throw  new Error(`El maestro con el ${ id } no existe`);
    }
}

const existeEmailTeacher = async (correo = '') => {
    const existeEmailTeacher = await Teacher.findOne({correo});
    if(existeEmailTeacher){
        throw new Error (`El correo ${correo} ya esta registrado`);
    }
}
 
module.exports = {
    esRoleValido,
    existeEmail,
    existeStudentById,
    existeTeacherById,
    existeEmailTeacher
}