import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Row, Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const CreateStudents = lazy(() => import("../../../views/forms/create/createStudents.js"));
const UpdateStudents = lazy(() => import("../../../views/forms/update/updateStudents.js"))

const StudentsTable = ({ handleClose }) => {

  const [activeStudents, setActiveStudents] = useState([]);
  const [inactiveStudents, setInactiveStudents] = useState([]);
  const [alumniStudents, setAlumniStudents] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateActiveModal, setShowUpdateActiveModal] = useState(false);
  const [showUpdateInactiveModal, setShowUpdateInactiveModal] = useState(false);
  const [showUpdateAlumniModal, setShowUpdateAlumniModal] = useState(false);

  const [updateModalData, setUpdateModalData] = useState(null);

  useEffect(() => {
    // Function to fetch active students from the server
    const fetchActiveStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/students/active');
        setActiveStudents(response.data);
      } catch (error) {
        console.error('Error fetching active students:', error);
      }
    };

    // Function to fetch inactive students from the server
    const fetchInactiveStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/students/inactive');
        setInactiveStudents(response.data);
      } catch (error) {
        console.error('Error fetching inactive students:', error);
      }
    };

    // Function to fetch alumni students from the server
    const fetchAlumniStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/students/alumni');
        setAlumniStudents(response.data);
      } catch (error) {
        console.error('Error fetching alumni students:', error);
      }
    };

    // Call the functions to fetch students when the component mounts
    fetchActiveStudents();
    fetchInactiveStudents();
    fetchAlumniStudents();
  }, []);

  // Function to handle closing the create student modal
  const handleCloseCreateModal = () => setShowCreateModal(false);
  
  // Function to handle showing the create student modal
  const handleShowCreateModal = () => setShowCreateModal(true);

  // Function to handle closing the update active student modal
  const handleCloseUpdateActiveModal = () => setShowUpdateActiveModal(false);
  
  // Function to handle showing the update active student modal
  const handleShowUpdateActiveModal = (student) => {
    setUpdateModalData(student);
    setShowUpdateActiveModal(true);
  };

  // Function to handle closing the update inactive student modal
  const handleCloseUpdateInactiveModal = () => setShowUpdateInactiveModal(false);
  
  // Function to handle showing the update inactive student modal
  const handleShowUpdateInactiveModal = (student) => {
    setUpdateModalData(student);
    setShowUpdateInactiveModal(true);
  };

  // Function to handle closing the update alumni student modal
  const handleCloseUpdateAlumniModal = () => setShowUpdateAlumniModal(false);
  
  // Function to handle showing the update alumni student modal
  const handleShowUpdateAlumniModal = (student) => {
    setUpdateModalData(student);
    setShowUpdateAlumniModal(true);
  };

  // Function to handle student deletion
  const handleDelete = async (studentId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/student/students/${studentId}`);
      if (response.status === 200) {    
        console.log('Student deleted successfully:', response.data.message);
        // You can add additional logic here, such as showing a success message or updating the UI
        alert('Student deleted successfully!');
        handleClose();
      } else {
        console.error('Error deleting student:', response.data.message);
        // Handle error based on response status and message
        // You can show an appropriate error message to the user
      }
    } catch (error) {
      console.error('Delete Error:', error.message);
      // Handle delete error
      // You can show an appropriate error message to the user
    }
  };

  
  return (
    <Row>
            <div className="mb-2" style={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
              <Button variant="primary" className="btn-success" onClick={handleShowCreateModal}>
                Add
              </Button>
              <Modal
                show={showCreateModal}
                onHide={handleCloseCreateModal}
                backdrop="static"
                keyboard={false}
              >
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
                                        <Modal
                                          show={showUpdateActiveModal}
                                          onHide={handleCloseUpdateActiveModal}
                                          backdrop="static"
                                          keyboard={false}
                                        >
                                          <Modal.Header closeButton>
                                            <Modal.Title>Update a Student</Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                            <Suspense fallback={<div>Loading...</div>}>
                                              <UpdateStudents studentData={updateModalData}/>
                                            </Suspense>
                                          </Modal.Body>
                                          <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseUpdateActiveModal}>
                                              Close
                                            </Button>
                                        
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
        <Card>
        <CardBody>
          <CardTitle tag="h5">Inactive Students</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            *inactive students are kicked out, alumni, etc..
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
                                    <Button variant="primary" onClick={() =>handleShowUpdateInactiveModal(student)}>
                                      Update
                                    </Button>
                                    <Modal
                                      show={showUpdateInactiveModal}
                                      onHide={handleCloseUpdateInactiveModal}
                                      backdrop="static"
                                      keyboard={false}
                                    >
                                      <Modal.Header closeButton>
                                        <Modal.Title>Update a Student</Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        <Suspense fallback={<div>Loading...</div>}>
                                          <UpdateStudents />
                                        </Suspense>
                                      </Modal.Body>
                                      <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseUpdateInactiveModal}>
                                          Close
                                        </Button>
                                        <Button variant="primary" className="mt-2">Submit</Button>
                                      </Modal.Footer>
                                    </Modal>
                                  </div>
                                <div>
                                  <Button variant="primary" className="btn btn-danger" onClick={() => handleDelete(student._id)} >
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
      <Card>
        <CardBody>
          <CardTitle tag="h5">Alumni</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            *alumni are graduates, undergraduate, etc..
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
                                    <Button variant="primary" onClick={() =>handleShowUpdateAlumniModal(student)}>
                                      Update
                                    </Button>
                                    <Modal
                                      show={showUpdateAlumniModal}
                                      onHide={handleCloseUpdateAlumniModal}
                                      backdrop="static"
                                      keyboard={false}
                                    >
                                      <Modal.Header closeButton>
                                        <Modal.Title>Update a Student</Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        <Suspense fallback={<div>Loading...</div>}>
                                          <UpdateStudents />
                                        </Suspense>
                                      </Modal.Body>
                                      <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseUpdateAlumniModal}>
                                          Close
                                        </Button>
                                        <Button variant="primary" className="mt-2">Submit</Button>
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
