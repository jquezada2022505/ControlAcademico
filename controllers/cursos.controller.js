const { array } = require('i/lib/util');
const Curso = require('../models/cursos');
const { response, request } = require('express');

const cursosPost = async(req, res) => {
    const { nombre, descripcion, maestro} = req.body;
    const curso = new Curso({ nombre, descripcion, maestro });

    await curso.save();
    res.status(202).json({
        curso
    });

}


const asignarCursosPost = async(req, res) => {
    const {id} = req.params;
    const {correo} = req.body;
    const cursoAntiguo = await Curso.findById(id);
    console.log({cursoAntiguo});
    if (!cursoAntiguo) {
        return res.status(404).json({msg: "No se encontro el curso"});
    }
    const {estudiante} = cursoAntiguo;
    console.log({estudiante});
    const newEstudiantes = [...estudiante, correo]
    const curso = await Curso.findByIdAndUpdate(id, { estudiante: newEstudiantes });

    res.status(202).json({
        curso
    });
}

const cursosGet = async(req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });

}

const getCursoById = async(req, res) => {
    const { id } = req.params;
    const cursos = await Curso.find({ _id: id });

    res.status(200).json({
        cursos
    });
}

const putCursos = async(req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;



    const curso = await Curso.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Curso actualizado correctamente',
        curso
    })
}

const cursosDelete = async(req, res = response) => {
    const { id } = req.params;
    const curso = await Curso.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.maestro;

    res.status(200).json({
        msg: 'Curso eliminado correctamente',
        curso,
        usuarioAutenticado
    });
}

module.exports = {
    cursosPost,
    cursosGet,
    getCursoById,
    putCursos,
    cursosDelete, 
    asignarCursosPost
}