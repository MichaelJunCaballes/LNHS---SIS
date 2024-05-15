import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

function CreateUsers({ handleClose }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: '' 
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [users, setUsers] = useState([]); // State to store the list of users 
  
  useEffect(() => {
    // Fetch users (teachers and registrar) from the database when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('User registered successfully:', response.data);
      alert('User added successfully!');
      handleClose(); // close the modal after successful create
      // You can add additional logic here, such as showing a success message or redirecting the user
    } catch (error) {
      console.error('Error registering user:', error);
      // You can add additional logic here, such as showing an error message to the user
    }
  };

  // <FormGroup>
  //       <Label for="exampleAddedBy">Added By</Label>
  //       <Input
  //         id="exampleAddedBy"
  //         name="addedBy"
  //         type="select"
  //         value={formData.addedBy}
  //         onChange={handleChange}
  //         required
  //       >
  //         <option value="">Select user</option>
  //         {/* Mapping through the list of users and populating the select options */}
  //         {users.map(user => (
  //           <option key={user._id} value={user.username}>{`${user.lastname}, ${user.firstname} ${user.middlename} `}</option>
  //         ))}
  //       </Input>
  //     </FormGroup>

  return (
    <Form onSubmit={handleSubmit}>
        
      <FormGroup>
        <Label for="exampleUsername">Username</Label>
        <Input
          id="exampleUsername"
          name="username"
          placeholder="Enter username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter a valid password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter email address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleRole">Role</Label>
        <Input
          id="exampleRole"
          name="role"
          type="select"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="registrar">Registrar</option>
          <option value="teacher">Teacher</option>
        </Input>
      </FormGroup>
      <Button type="submit" color="primary">Submit</Button>
    </Form>
  );
}

export default CreateUsers;
