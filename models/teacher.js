const { Schema, model } = require('mongoose');
const { TEACHER_ROLE } = require('./userModel');

const TeacherSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre debe de ser obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'el correo debe ser obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'la clave es obligatoria']
    },
    curso: {
        type: String
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: TEACHER_ROLE
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

TeacherSchema.methods.toJSON = function() {
    const { __v, password, _id, ...teacher } = this.toObject();
    teacher.uid = _id;
    return teacher;
};

module.exports = model('Teacher', TeacherSchema);