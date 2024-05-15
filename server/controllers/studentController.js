const Student = require('../models/Student');

exports.addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ message: 'Student added successfully', student });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getActiveStudents = async (req, res) => {
  try {
    const activeStudents = await Student.find({
      academicStatus: { $in: ['Enrolled', 'Transferee'] }
    });
    res.json(activeStudents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOnlyAlumniStudents = async (req, res) => {
  try {
    const alumniStudents = await Student.find({
      academicStatus: ['Alumni', 'Graduate', 'Undergraduate'],
    });
    res.json(alumniStudents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInactiveStudents = async (req, res) => {
  try {
    const inactiveStudents = await Student.find({
      academicStatus: { $in: ['Kicked Out', 'Archived'] }
    });
    res.json(inactiveStudents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};