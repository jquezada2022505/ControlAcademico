const { Schema, model } = require('mongoose');

const CursoSchema = Schema({

    nombre: {
        type: String,
        require: [true, "El nombre es obligatorio"],
    },
    descripcion: {
        type: String,
        require: [true, "La descripcion es obligatoria"]
    },
    maestro:{
        type: String,
        require:  [true, "El maestro es obligatorio"]
    },
    estudiante:{
        type: Array,
        default:  []
    },
    estado: {
        type: Boolean,
        default: true   
    }

});

module.exports = model('Curso', CursoSchema);