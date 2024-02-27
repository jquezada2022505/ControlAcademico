const STUDENT_ROLE = 'estudiante';
const TEACHER_ROLE = 'maestro';
const mongoose = require('mongoose');

class UserModel {
    constructor() {
        mongoose.connect('mongodb://localhost:27017/dbControlAcademico_2022505', {

        });

        this.db = mongoose.connection;

        this.db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
        this.db.once('open', () => {
            console.log('Conexión exitosa a MongoDB');
        });
    }
}

module.exports = {
    UserModel,
    STUDENT_ROLE,
    TEACHER_ROLE
};