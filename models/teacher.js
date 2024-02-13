const {Schema, model} = require('mongoose');

const TeacherSchema = Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre debe de ser obligatorio']
    },
    correo:{
        type: String,
        require: [true, 'el correo debe res obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'la clave es obligatoria']
    },
    curso:{
        type: String,
        require: [true, 'el curso es obligatorio']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        enum: ["TEACHER_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

});

module.exports = model('Teacher', TeacherSchema);