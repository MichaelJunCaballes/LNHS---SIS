import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Row, Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import Cookies library

const CreateStudents = lazy(() => import("../../../views/forms/create/createStudents.js"));
const UpdateStudents = lazy(() => import("../../../views/forms/update/updateStudents.js"));

const StudentsTable = ({ handleClose }) => {
  const [activeStudents, setActiveStudents] = useState([]);
  const [inactiveStudents, setInactiveStudents] = useState([]);
  const [alumniStudents, setAlumniStudents] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateActiveModal, setShowUpdateActiveModal] = useState(false);
  const [showUpdateInactiveModal, setShowUpdateInactiveModal] = useState(false);
  const [showUpdateAlumniModal, setShowUpdateAlumniModal] = useState(false);

  const [updateModalData, setUpdateModalData] = useState(null);

  const token = Cookies.get('token'); // Retrieve token from cookies

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const [activeResponse, inactiveResponse, alumniResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/student/students/active', config),
          axios.get('http://localhost:5000/api/student/students/inactive', config),
          axios.get('http://localhost:5000/api/student/students/alumni', config)
        ]);

        setActiveStudents(activeResponse.data);
        setInactiveStudents(inactiveResponse.data);
        setAlumniStudents(alumniResponse.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [token]);

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

  const handleCloseUpdateActiveModal = () => setShowUpdateActiveModal(false);
  const handleShowUpdateActiveModal = (student) => {
    setUpdateModalData(student);
    setShowUpdateActiveModal(true);
  };

  const handleCloseUpdateInactiveModal = () => setShowUpdateInactiveModal(false);
  const handleShowUpdateInactiveModal = (student) => {
    setUpdateModalData(student);
    setShowUpdateInactiveModal(true);
  };

  const handleCloseUpdateAlumniModal = () => setShowUpdateAlumniModal(false);
  const handleShowUpdateAlumniModal = (student) => {
    setUpdateModalData(student);
    setShowUpdateAlumniModal(true);
  };

  const handleDelete = async (studentId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      const response = await axios.delete(`http://localhost:5000/api/student/students/${studentId}`, config);
      if (response.status === 200) {
        alert('Student deleted successfully!');
        handleClose();
        setActiveStudents(activeStudents.filter(student => student._id !== studentId));
        setInactiveStudents(inactiveStudents.filter(student => student._id !== studentId));
        setAlumniStudents(alumniStudents.filter(student => student._id !== studentId));
      } else {
        console.error('Error deleting student:', response.data.message);
      }
    } catch (error) {
      console.error('Delete Error:', error.message);
    }
  };

  return (
    <Row>
      <div className="mb-2" style={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
        <Button variant="primary" className="btn-success" onClick={handleShowCreateModal}>
          Add
        </Button>
        <Modal show={showCreateModal} onHide={handleCloseCreateModal} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Suspense fallback={<div>Loading...</div>}>
              <CreateStudents />
            </Suspense>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreateModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Active Students</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            *active students are enrolled, transferee, etc..
          </CardSubtitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Added by</th>
                <th>Full Name</th>
                <th>Grade Level</th>
                <th>Email</th>
                <th>Sex</th>
                <th>LRN</th>
                <th>Academic Status</th>
                <th>School Year</th>
                <th>Date of Birth</th>
                <th>Age</th>
                <th>Form 10</th>
                <th>Form 9</th>
                <th>Section</th>
                <th>Created at</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeStudents.map(student => (
                <tr className="border-top" key={student._id}>
                  <td>{student.addedBy}</td>
                  <td>{student.lastName}, {student.firstName} {student.middleName}</td>
                  <td>{student.gradeLevel}</td>
                  <td>{student.email}</td>
                  <td>{student.sex}</td>
                  <td>{student.LRN}</td>
                  <td>{student.academicStatus}</td>
                  <td>{student.schoolYear}</td>
                  <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                  <td>{student.age}</td>
                  <td>{student.Form10}</td>
                  <td>{student.Form9}</td>
                  <td>{student.section}</td>
                  <td>{new Date(student.createdAt).toLocaleString()}</td>
                  <td>
                    <div className="mb-2" style={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                      <Button variant="primary" onClick={() => handleShowUpdateActiveModal(student)}>
                        Update
                      </Button>
                      <Modal show={showUpdateActiveModal} onHide={handleCloseUpdateActiveModal} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                          <Modal.Title>Update a Student</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Suspense fallback={<div>Loading...</div>}>
                            <UpdateStudents studentData={updateModalData} />
                          </Suspense>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseUpdateActiveModal}>
                            Close
                          </Button>
                          <Button type='submit' color="primary" >Submit</Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    <div>
                      <Button variant="primary" className="btn btn-danger" onClick={() => handleDelete(student._id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Repeat similar structure for inactive students */}
      <Card>
        <CardBody>
          <CardTitle tag="h5">Inactive Students</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            *inactive students are not currently enrolled
          </CardSubtitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Added by</th>
                <th>Full Name</th>
                <th>Grade Level</th>
                <th>Email</th>
                <th>Sex</th>
                <th>LRN</th>
                <th>Academic Status</th>
                <th>School Year</th>
                <th>Date of Birth</th>
                <th>Age</th>
                <th>Form 10</th>
                <th>Form 9</th>
                <th>Section</th>
                <th>Created at</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inactiveStudents.map(student => (
                <tr className="border-top" key={student._id}>
                  <td>{student.addedBy}</td>
                  <td>{student.lastName}, {student.firstName} {student.middleName}</td>
                  <td>{student.gradeLevel}</td>
                  <td>{student.email}</td>
                  <td>{student.sex}</td>
                  <td>{student.LRN}</td>
                  <td>{student.academicStatus}</td>
                  <td>{student.schoolYear}</td>
                  <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                  <td>{student.age}</td>
                  <td>{student.Form10}</td>
                  <td>{student.Form9}</td>
                  <td>{student.section}</td>
                  <td>{new Date(student.createdAt).toLocaleString()}</td>
                  <td>
                    <div className="mb-2" style={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                      <Button variant="primary" onClick={() => handleShowUpdateInactiveModal(student)}>
                        Update
                      </Button>
                      <Modal show={showUpdateInactiveModal} onHide={handleCloseUpdateInactiveModal} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                          <Modal.Title>Update a Student</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Suspense fallback={<div>Loading...</div>}>
                            <UpdateStudents studentData={updateModalData} />
                          </Suspense>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseUpdateInactiveModal}>
                            Close
                          </Button>
                          <Button type='submit' color="primary" controlId="formFirstName">Submit</Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    <div>
                      <Button variant="primary" className="btn btn-danger" onClick={() => handleDelete(student._id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Repeat similar structure for alumni students */}
      <Card>
        <CardBody>
          <CardTitle tag="h5">Alumni Students</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            *alumni students have graduated
          </CardSubtitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Added by</th>
                <th>Full Name</th>
                <th>Grade Level</th>
                <th>Email</th>
                <th>Sex</th>
                <th>LRN</th>
                <th>Academic Status</th>
                <th>School Year</th>
                <th>Date of Birth</th>
                <th>Age</th>
                <th>Form 10</th>
                <th>Form 9</th>
                <th>Section</th>
                <th>Created at</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {alumniStudents.map(student => (
                <tr className="border-top" key={student._id}>
                  <td>{student.addedBy}</td>
                  <td>{student.lastName}, {student.firstName} {student.middleName}</td>
                  <td>{student.gradeLevel}</td>
                  <td>{student.email}</td>
                  <td>{student.sex}</td>
                  <td>{student.LRN}</td>
                  <td>{student.academicStatus}</td>
                  <td>{student.schoolYear}</td>
                  <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                  <td>{student.age}</td>
                  <td>{student.Form10}</td>
                  <td>{student.Form9}</td>
                  <td>{student.section}</td>
                  <td>{new Date(student.createdAt).toLocaleString()}</td>
                  <td>
                    <div className="mb-2" style={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                      <Button variant="primary" onClick={() => handleShowUpdateAlumniModal(student)}>
                        Update
                      </Button>
                      <Modal show={showUpdateAlumniModal} onHide={handleCloseUpdateAlumniModal} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                          <Modal.Title>Update a Student</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Suspense fallback={<div>Loading...</div>}>
                            <UpdateStudents studentData={updateModalData} />
                          </Suspense>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseUpdateAlumniModal}>
                            Close
                          </Button>
                          <Button type='submit' color="primary" controlId="formFirstName">Submit</Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    <div>
                      <Button variant="primary" className="btn btn-danger" onClick={() => handleDelete(student._id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Row>
  );
};

export default StudentsTable;
