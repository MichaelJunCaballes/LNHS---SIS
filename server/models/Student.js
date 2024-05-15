const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  // addedBy: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  middleName: String,
  gradeLevel: {
    type: String,
    enum: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  sex: {
    type: String,
    enum: ['Male', 'Female','Prefer not to say'],
    required: true
  },
  LRN: {
    type: String,
    required: true,
    unique: true
  },
  academicStatus: {
    type: String,
    enum: ['Enrolled', 'Transferee', 'Kicked Out', 'Alumni', 'Archived', 'Graduate', 'Undergraduate'],
    required: true
  },
  schoolYear: {
    type: String,
    required: true
  },
  Form10: {
    type: String,
    enum: ['Yes', 'No'],
  },
  Form9: {
    type: String,
    enum: ['Yes', 'No'],
  },
  age: {
    type: Number,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
