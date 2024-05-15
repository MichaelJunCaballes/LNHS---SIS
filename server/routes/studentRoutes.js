const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { protectRoute } = require('../middlewares/authMiddleware');

router.use(protectRoute);
// Student Routes
router.post('/students', studentController.addStudent);
router.put('/students/:id', studentController.updateStudent);
router.get('/students', studentController.getAllStudents);
router.get('/students/active', studentController.getActiveStudents);
router.get('/students/alumni', studentController.getOnlyAlumniStudents);
router.get('/students/inactive', studentController.getInactiveStudents);
router.get('/students/:id', studentController.getStudentById);
router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
