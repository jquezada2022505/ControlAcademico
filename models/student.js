const { Schema, model } = require('mongoose');

const StudentSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre debe de ser obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'el correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'la clave es obligatoria']
    },
    curso: {
        type: String,
        require: [true, 'el curso es obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        enum: ["STUDENT_ROLE"]
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

StudentSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...student} = this.toObject();
    student.uid = _id;
    return student;
};

module.exports = model('Student', StudentSchema);