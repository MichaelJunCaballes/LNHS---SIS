import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

function updateUserProfile() {
  return (
    <Form>
      <FormGroup>
        <Label for="exampleUsername">Username</Label>
        <Input
          id="exampleUsername"
          name="username"
          placeholder="Enter username"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFirstname">First Name</Label>
        <Input
          id="exampleFirstname"
          name="firstname"
          placeholder="Enter first name"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleLastname">Last Name</Label>
        <Input
          id="exampleLastname"
          name="lastname"
          placeholder="Enter last name"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleMiddlename">Middle Name</Label>
        <Input
          id="exampleMiddlename"
          name="middlename"
          placeholder="Enter middle name"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleAge">Age</Label>
        <Input
          id="exampleAge"
          name="age"
          placeholder="Enter age"
          type="number"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleAddress">Address</Label>
        <Input
          id="exampleAddress"
          name="address"
          placeholder="Enter address"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSex">Sex</Label>
        <Input
          id="exampleSex"
          name="sex"
          type="select"
        >
          <option>Male</option>
          <option>Female</option>
          <option>Prefer not to say</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter email address"
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleMobile">Mobile</Label>
        <Input
          id="exampleMobile"
          name="mobile"
          placeholder="Enter mobile number"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleDateOfBirth">Date of Birth</Label>
        <Input
          id="exampleDateOfBirth"
          name="dateOfBirth"
          type="date"
        />
      </FormGroup>
    </Form>
  )
}

export default updateUserProfile
