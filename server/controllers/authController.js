  const User = require('../models/User');
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcrypt');

  const generateToken = (user) => {
    return jwt.sign(
      { _id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Set an expiration time for the token
    );
  };

  exports.register = async (req, res) => {
    try {
      const { username, password, email, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword, email, role });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = generateToken(user);
  
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Strict',
        maxAge: 3600000 // 1 hour
      });
  
      res.json({ userId: user._id });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getUsersByRole = async (req, res) => {
    try {
      const users = await User.find({ role: req.params.role });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getAdmins = async (req, res) => {
    try {
      const admins = await User.find({ role: 'admin' });
      res.json(admins);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getRegistrars = async (req, res) => {
    try {
      const registrars = await User.find({ role: 'registrar' });
      res.json(registrars);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getTeachers = async (req, res) => {
    try {
      const teachers = await User.find({ role: 'teacher' });
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateUserById = async (req, res) => {
    try {
      // Filter out the password field from the req.body
      const { password, ...updateData } = req.body;
  
      // Update the user with the filtered updateData
      const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.deleteUserById = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.checkAuth = (req, res) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ message: 'Authenticated' });
    } catch (error) {
      res.status(401).json({ message: 'Not authenticated' });
    }
  };
  