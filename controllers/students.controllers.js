const bcryptjs = require('bcryptjs');
const Student = require('../models/student');

const studentGet = async(req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, student] = await Promise.all([
        Student.countDocuments(query),
        Student.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        student
    });
}

const getStudentById = async(req, res) => {
    const { id } = req.params;
    const student = await Student.findOne({ _id: id });

    res.status(200).json({
        student
    });
}

const putStudent = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, role, ...resto } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const student = await Student.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Estudiante Actualizado Exitosamente',
        student
    });
}

const studentDelete = async(req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'Estudiante eliminado exitosamente',
        student
    });
}

const studentPost = async(req, res) => {
    const { nombre, correo, password, curso, role } = req.body;
    const student = new Student({ nombre, correo, password, curso, role });

    const salt = bcryptjs.genSaltSync();
    console.log(password);
    student.password = bcryptjs.hashSync(password, salt);

    await student.save();
    console.log({ nombre, correo, password, curso, role })
    res.status(202).json({
        student
    });
}

module.exports = {
    studentPost,
    getStudentById,
    putStudent,
    studentGet,
    studentDelete
}