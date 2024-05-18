import React, { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from 'axios';

function UpdateUserProfile({ user }) {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    middlename: '',
    age: '',
    address: '',
    sex: '',
    email: '',
    mobile: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        middlename: user.middlename || '',
        age: user.age || '',
        address: user.address || '',
        sex: user.sex || '',
        email: user.email || '',
        mobile: user.mobile || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/auth/users/${user._id}`, formData, { withCredentials: true });
      alert('Profile updated successfully');
      // Optionally, you can refresh user data or close the modal here
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <Form id="updateUserProfileForm" onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleUsername">Username</Label>
        <Input
          id="exampleUsername"
          name="username"
          value={formData.username}
          onChange={handleChange}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFirstname">First Name</Label>
        <Input
          id="exampleFirstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleLastname">Last Name</Label>
        <Input
          id="exampleLastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleMiddlename">Middle Name</Label>
        <Input
          id="exampleMiddlename"
          name="middlename"
          value={formData.middlename}
          onChange={handleChange}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleAge">Age</Label>
        <Input
          id="exampleAge"
          name="age"
          value={formData.age}
          onChange={handleChange}
          type="number"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleAddress">Address</Label>
        <Input
          id="exampleAddress"
          name="address"
          value={formData.address}
          onChange={handleChange}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSex">Sex</Label>
        <Input
          id="exampleSex"
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          type="select"
        >
          <option>Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleMobile">Mobile</Label>
        <Input
          id="exampleMobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleDateOfBirth">Date of Birth</Label>
        <Input
          id="exampleDateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          type="date"
        />
      </FormGroup>
    </Form>
  )
}

export default UpdateUserProfile;
