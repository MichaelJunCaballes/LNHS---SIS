const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Custom validator function to check if age is positive, starts with 1, and below 100
function validateAge(value) {
  return value >= 1 && value < 100; // Ensure age starts with 1 and is below 100
}

const userSchema = new Schema({
  // addedBy: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  username: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: true, 
    validate: {
      validator: function(v) {
        // Check if password has at least 6 characters and at least 1 special character
        return /^(?=.*[A-Za-z0-9])(?=.*[^A-Za-z0-9]).{6,}$/.test(v);
      },
      message: props => `${props.value} does not meet the password requirements.`,
    },
  },
  firstname: {type: String},
  lastname: {type: String},
  middlename: {type: String},
  age: { 
    type: Number,
    validate: { 
      validator: validateAge, 
      message: 'Age must be a positive number starting with 1 and below 100.' ,
    },
  },
  address: {String},
  sex: { type: String, enum: ['Male', 'Female', 'Prefer not to say']},
  email: { type: String, required: true, unique: true },  
  mobile: {type: String},
  role: { type: String, enum: ['admin', 'registrar', 'teacher', 'student']},
  dateOfBirth: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);