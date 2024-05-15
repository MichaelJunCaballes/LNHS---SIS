import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from 'axios';

function UpdateTeachers({ userData, handleClose }) {

  // Function to calculate age based on date of birth
  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const ageDiffMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDiffMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const [formData, setFormData] = useState({
    username: userData.username,
    firstname: userData.firstname,
    lastname: userData.lastname,
    middlename: userData.middlename,
    age: userData.age,
    address: userData.address,
    sex: userData.sex,
    email: userData.email,
    mobile: userData.mobile,
    dateOfBirth: userData.dateOfBirth,
    role: userData.role,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dateOfBirth') {
      setFormData(prevState => ({
        ...prevState,
        age: calculateAge(value), // Update age based on new date of birth
        [name]: value
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/auth/users/${userData._id}`, formData);
      console.log('User updated successfully');
      alert('User updated successfully')
      // Optionally, you can add logic to handle success (e.g., show a success message)
      handleClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error updating user:', error);
      // Optionally, you can add logic to handle errors (e.g., show an error message)
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="firstname">First Name</Label>
        <Input
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastname">Last Name</Label>
        <Input
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="middlename">Middle Name</Label>
        <Input
          id="middlename"
          name="middlename"
          value={formData.middlename}
          onChange={handleChange}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="age">Age</Label>
        <Input
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          type="number"
        />
      </FormGroup>
      <FormGroup>
        <Label for="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="sex">Sex</Label>
        <Input
          id="sex"
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          type="select"
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <Label for="mobile">Mobile</Label>
        <Input
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          type="date"
        />
      </FormGroup>
      <FormGroup>
        <Label for="role">Role</Label>
        <Input
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          type="select"
        >
          <option value="">Select</option>
          <option value="admin">Admin</option>
          <option value="registrar">Registrar</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </Input>
      </FormGroup>
      <Button color="primary" type="submit">Update</Button>
    </Form>
  );
}

export default UpdateTeachers;
