const bcryptjs = require('bcryptjs');
const Teacher = require('../models/teacher');

const teacherGet = async(req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, teacher] = await Promise.all([
        Teacher.countDocuments(query),
        Teacher.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        teacher
    });
}

const getTeacherById = async(req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findOne({ _id: id });

    res.status(200).json({
        teacher
    });
}

const putTeacher = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, role, ...resto } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const teacher = await Teacher.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Maestro Actualizado Exitosamente',
        teacher
    });
}

const teacherDelete = async(req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'Maestro eliminado exitosamente',
        teacher
    });
}

const teacherPost = async(req, res) => {
    const { nombre, correo, password, curso, role } = req.body;
    const teacher = new Teacher({ nombre, correo, password, curso, role });

    const salt = bcryptjs.genSaltSync();
    console.log(password);
    teacher.password = bcryptjs.hashSync(password, salt);

    await teacher.save();
    console.log({ nombre, correo, password, curso, role })
    res.status(202).json({
        teacher
    });
}

module.exports = {
    teacherPost,
    getTeacherById,
    putTeacher,
    teacherGet,
    teacherDelete
}