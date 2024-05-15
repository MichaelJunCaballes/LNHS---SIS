import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { useAuth } from '../middlewares/authContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include', // This ensures cookies are included in the request
    });

    if (response.ok) {
      setIsAuthenticated(true);
      navigate('/dashboard'); // Redirect to dashboard or another protected route
    } else {
      const data = await response.json();
      alert(data.message); // Handle error accordingly
    }
  };

  return (
    <div className="bg-image">
      <Row className="justify-content-center">
        <Col md="5">
          <Card>
            <CardTitle tag="h4" className="p-1 text-center text-black">
              Welcome to Lampanusan National High School
            </CardTitle>
            <small className="p-3 text-center">Student Information System</small>
            <small className="p-3 text-center">LOGIN</small>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Button color="primary" className="w-100 mt-2" type="submit">Login</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
