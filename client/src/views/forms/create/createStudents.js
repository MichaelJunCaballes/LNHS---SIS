import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

function CreateStudents( {handleClose}) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        gradeLevel: '',
        email: '',
        sex: '',
        LRN: '',
        age: '',
        academicStatus: '',
        schoolYear: '',
        Form10: '',
        Form9: '',
        dateOfBirth: '',
        section: '',
        address: '',
        addedBy: '' // Added the 'addedBy' field to the formData state
      });
      
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
    
      const handleChange = e => {
        const { name, value } = e.target;
        // Update formData with the new value
        setFormData({ ...formData, [name]: value });
        
        // // For addedBy field, set the value to the user's _id
        // if (name === 'addedBy') {
        //   const selectedUser = users.find(user => user.username === value);
        //   if (selectedUser) {
        //     setFormData(prevState => ({ ...prevState, [name]: selectedUser._id }));
        //   }
        // }
      
        // Calculate age if the changed field is dateOfBirth
        if (name === 'dateOfBirth') {
          const dob = new Date(value); // Convert date of birth to Date object
          const today = new Date(); // Get today's date
          const ageDiff = today - dob.getTime(); // Difference in milliseconds
          const ageDate = new Date(ageDiff); // Convert age difference to date
          const age = Math.abs(ageDate.getUTCFullYear() - 1970); // Get the age
          // Update formData with the calculated age
          setFormData(prevState => ({ ...prevState, age }));
        }
      };
    
      const handleSubmit = async e => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/student/students', formData);
          if (response.status === 201) {
            console.log('Student added successfully:', response.data);
            handleClose(); // close the modal after successful create
            alert('Student added successfully!');
            // You can add additional logic here, such as showing a success message or redirecting the user
          } else {
            console.error('Error adding student:', response.data.message);
            // Handle error based on response status and message
            // You can show an appropriate error message to the user
          }
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            console.error('Server Error:', error.response.data);
            // Handle server errors, such as 400, 401, 404, etc.
            // You can show an appropriate error message to the user
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from server:', error.request);
            // Handle cases where the server is not reachable or no response is received
            // You can show an appropriate error message to the user
          } else {
            // Something happened in setting up the request that triggered an error
            console.error('Request Setup Error:', error.message);
            // Handle other types of errors, such as network errors, etc.
            // You can show an appropriate error message to the user
          }
        }
      };
      
      // <FormGroup>
      //   <Label for="exampleAddedBy">Added By</Label>
      //   <Input
      //     id="exampleAddedBy"
      //     name="addedBy"
      //     type="select"
      //     value={formData.addedBy}
      //     onChange={handleChange}
      //     required
      //   >
      //     <option value="">Select user</option>
      //     {/* Mapping through the list of users and populating the select options */}
      //     {users.map(user => (
      //       <option key={user._id} value={user.username}>{`${user.lastname}, ${user.firstname} ${user.middlename} `}</option>
      //     ))}
      //   </Input>
      // </FormGroup>

  return (
    <Form onSubmit={handleSubmit}>
        
      <FormGroup>
        <Label for="examplelastname">Last name</Label>
        <Input
          id="examplelastname"
          name="lastName"
          placeholder="Enter last name"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplefirstname">First name</Label>
        <Input
          id="examplefirstname"
          name="firstName"
          placeholder="Enter first name"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplemiddlename">Middle name</Label>
        <Input
          id="examplemiddlename"
          name="middleName"
          placeholder="Enter middle name"
          type="text"
          value={formData.middleName}
          onChange={handleChange}
          
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
        <Label for="exampleSelect">Grade Level</Label>
        <Input
          id="exampleSelect"
          name="gradeLevel"
          type="select"
          value={formData.gradeLevel}
          onChange={handleChange}
          required
        >
          <option value="">Select Grade Level</option>
          <option value="">Junior High</option>
          <option value="Grade 7">Grade 7</option>
          <option value="Grade 8">Grade 8</option>
          <option value="Grade 9">Grade 9</option>
          <option value="Grade 10">Grade 10</option>
          <option value="">Senior High</option>
          <option value="Grade 11">Grade 11</option>
          <option value="Grade 12">Grade 12</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Sex</Label>
        <Input
          id="exampleSelect"
          name="sex"
          type="select"
          value={formData.sex}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleBirth">Date of Birth</Label>
        <Input
          id="exampleBirth"
          name="dateOfBirth"
          placeholder="Enter a valid date"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleAge">Age</Label>
        <Input
          id="exampleAge"
          name="age"
          placeholder="Enter a valid age"
          type="text"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSection">Section</Label>
        <Input
          id="exampleSection"
          name="section"
          placeholder="Enter your section"
          type="text"
          value={formData.section}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleAddress">Address</Label>
        <Input
          id="exampleAddress"
          name="address"
          placeholder="Enter your address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleLRN">LRN</Label>
        <Input
          id="exampleLRN"
          name="LRN"
          placeholder="Enter your LRN"
          type="text"
          value={formData.LRN}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Academic Status</Label>
        <Input
          id="exampleSelect"
          name="academicStatus"
          type="select"
          value={formData.academicStatus}
          onChange={handleChange}
          required
        >
          <option value="">Select Academic Status</option>
          <option value="Enrolled">Enrolled</option>
          <option value="Transferee">Transferee</option>
          <option value="Kicked Out">Kicked Out</option>
          <option value="Alumni">Alumni</option>
          <option value="Archived">Archived</option>
          <option value="Graduate">Graduate</option>
          <option value="Undergraduate">Undergraduate</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleSchoolyear">School Year</Label>
        <Input
          id="exampleSchoolyear"
          name="schoolYear"
          placeholder="Enter a school year"
          type="text"
          value={formData.schoolYear}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Form 10</Label>
        <Input
          id="exampleSelect"
          name="Form10"
          type="select"
          value={formData.Form10}
          onChange={handleChange}
          required
        >
          <option value="">Do you have document?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Form 9</Label>
        <Input
          id="exampleSelect"
          name="Form9"
          type="select"
          value={formData.Form9}
          onChange={handleChange}
          required
        >
          <option value="">Do you have document?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Input>
      </FormGroup>
      <Button type="submit" color="primary">Submit</Button>
    </Form>
  );
}

export default CreateStudents;
