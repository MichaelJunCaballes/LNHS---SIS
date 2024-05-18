import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from 'axios';

function UpdateStudents({ studentData }) {

    const [formData, setFormData] = useState(studentData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/student/students/${formData._id}`, formData);
      if (response.status === 200) {
        alert('Student updated successfully!');
      } else {
        console.error('Update Error:', response.data.message);
      }
    } catch (error) {
      console.error('Update Error:', error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup controlId="formFirstName">
        <Label for="firstName">First Name</Label>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="middleName">Middle Name</Label>
        <Input
          type="text"
          name="middleName"
          id="middleName"
          value={formData.middleName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="age">Age</Label>
        <Input
          type="number"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="address">Address</Label>
        <Input
          type="text"
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="sex">Sex</Label>
        <Input
          type="select"
          name="sex"
          id="sex"
          value={formData.sex}
          onChange={handleChange}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Prefer not to say</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="dateOfBirth">Date of Birth</Label>
        <Input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="gradeLevel">Grade Level</Label>
        <Input
          type="select"
          name="gradeLevel"
          id="gradeLevel"
          value={formData.gradeLevel}
          onChange={handleChange}
        >
          <option>Grade 7</option>
          <option>Grade 8</option>
          <option>Grade 9</option>
          <option>Grade 10</option>
          <option>Grade 11</option>
          <option>Grade 12</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="LRN">LRN</Label>
        <Input
          type="text"
          name="LRN"
          id="LRN"
          value={formData.LRN}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="academicStatus">Academic Status</Label>
        <Input
          type="select"
          name="academicStatus"
          id="academicStatus"
          value={formData.academicStatus}
          onChange={handleChange}
        >
          <option>Enrolled</option>
          <option>Transferee</option>
          <option>Kicked Out</option>
          <option>Alumni</option>
          <option>Archived</option>
          <option>Graduate</option>
          <option>Undergraduate</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="schoolYear">School Year</Label>
        <Input
          type="text"
          name="schoolYear"
          id="schoolYear"
          value={formData.schoolYear}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="Form10">Form 10</Label>
        <Input
          type="select"
          name="Form10"
          id="Form10"
          value={formData.Form10}
          onChange={handleChange}
        >
          <option>Yes</option>
          <option>No</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="Form9">Form 9</Label>
        <Input
          type="select"
          name="Form9"
          id="Form9"
          value={formData.Form9}
          onChange={handleChange}
        >
          <option>Yes</option>
          <option>No</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="section">Section</Label>
        <Input
          type="text"
          name="section"
          id="section"
          value={formData.section}
          onChange={handleChange}
        />
      </FormGroup>
    </Form>
  );
}

export default UpdateStudents;
