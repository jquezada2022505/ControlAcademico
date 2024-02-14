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

    authenticate(correo, password) {
        // Aquí iría la lógica para verificar las credenciales y obtener el rol
        // Simplemente devolvemos un objeto con la autenticación y el rol por simplicidad
        if (correo === 'estudiante' && password === 'contraseña') {
            return { authenticated: true, role: STUDENT_ROLE };
        } else if (correo === 'maestro' && password === 'contraseña') {
            return { authenticated: true, role: TEACHER_ROLE };
        } else {
            return { authenticated: false };
        }
    }
}

module.exports = {
    UserModel,
    STUDENT_ROLE,
    TEACHER_ROLE
};

