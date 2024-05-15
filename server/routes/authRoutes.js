const express = require('express');
const authController = require('../controllers/authController');
const { protectRoute } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/check-auth', authController.checkAuth); // New route for checking authentication

// Apply the protectRoute middleware to all routes below this line
router.use(protectRoute);

router.get('/users', authController.getAllUsers);
router.get('/users/:id', authController.getUserById);
router.get('/users/role/:role', authController.getUsersByRole);
router.get('/admins', authController.getAdmins);
router.get('/registrars', authController.getRegistrars);
router.get('/teachers', authController.getTeachers);
router.put('/users/:id', authController.updateUserById);
router.delete('/users/:id', authController.deleteUserById);

module.exports = router;
