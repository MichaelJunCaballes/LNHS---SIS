import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from 'axios';

function UpdateUsers({ userData, handleClose }) {

  const [formData, setFormData] = useState({userData});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:5000/api/auth/users/${userData._id}`, formData);
        console.log('User updated successfully');
        alert('User updated successfully');
        handleClose(); // Close the modal after successful update
    } catch (error) {
        console.error('Error updating user:', error);
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
          <option value="teacher">Teacher</option>
        </Input>
      </FormGroup>
    </Form>
  );
}

export default UpdateUsers;
