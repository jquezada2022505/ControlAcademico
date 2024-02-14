const { STUDENT_ROLE, TEACHER_ROLE } = require('../controllers/authController');

function isAuthenticated(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.status(401).json({ error: 'No autorizado' });
    }
}

function isStudent(req, res, next) {
    if (req.session.role === STUDENT_ROLE) {
        next();
    } else {
        res.status(403).json({ error: 'No tiene permiso de estudiante' });
    }
}

function isTeacher(req, res, next) {
    if (req.session.role === TEACHER_ROLE) {
        next();
    } else {
        res.status(403).json({ error: 'No tiene permiso de maestro' });
    }
}


module.exports = {
    isAuthenticated,
    isStudent,
    isTeacher
};

