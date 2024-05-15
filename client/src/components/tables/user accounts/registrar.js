import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Row, Card, CardBody, Table, CardTitle } from "reactstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const CreateTeachers = lazy(() => import("../../../views/forms/create/createTeachers.js"));
const UpdateTeachers = lazy(() => import("../../../views/forms/update/updateTeachers.js"))

function RegistrarUserAccounts({ handleClose}) {

  const [teacher, setTeacher] = useState([]);
  const [updateModalData, setUpdateModalData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const teacherResponse = await axios.get('http://localhost:5000/api/auth/teachers');

            setTeacher(teacherResponse.data);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        fetchData();
      }, []);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateTeacherModal, setshowUpdateTeacherModal] = useState(false);

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

   // Update modal
   // Teacher
   const handleCloseUpdateTeacherModal = () => setshowUpdateTeacherModal(false);
   const handleShowUpdateTeacherModal = (teacher) => {
       setUpdateModalData(teacher);
       setshowUpdateTeacherModal(true);
   }

   // Function to handle student deletion
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/auth/users/${userId}`);
      if (response.status === 200) {
        console.log('User deleted successfully:', response.data.message);
        // You can add additional logic here, such as showing a success message or updating the UI
        alert('User deleted successfully!');
        handleClose();
      } else {
        console.error('Error deleting user:', response.data.message);
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
              <Modal.Title>Add a Teacher</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Suspense fallback={<div>Loading...</div>}>
                  <CreateTeachers />
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
                <CardTitle tag="h5">Teachers</CardTitle>
                <Table className="no-wrap mt-3 align-middle" responsive borderless>
                <thead>
                    <tr>
                        <th>Added by</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Sex</th>
                        <th>Mobile no.</th>
                        <th>Role</th>
                        <th>Date of Birth</th>
                        <th>Created at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teacher.map(teacher => (
                        <tr className="border-top" key={teacher._id}>
                          <td>{teacher.addedBy}</td>
                          <td>{teacher.lastName}, {teacher.firstName} {teacher.middleName}</td>
                          <td>{teacher.username}</td>
                          <td>{teacher.address}</td>
                          <td>{teacher.email}</td>
                          <td>{teacher.sex}</td>
                          <td>{teacher.mobile}</td>
                          <td>{teacher.role}</td>
                          <td>{teacher.dateOfBirth}</td>
                          <td>{teacher.createdAt}</td>
                          <td>
                              <div className="mb-2" style={{ display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
                                  <Button variant="primary" onClick={() => handleShowUpdateTeacherModal(teacher._id)}>
                                      Update
                                  </Button>
                                  <Modal
                                          show={showUpdateTeacherModal}
                                          onHide={handleCloseUpdateTeacherModal}
                                          backdrop="static"
                                          keyboard={false}
                                          >
                                  <Modal.Header closeButton>
                                  <Modal.Title>Update a Teacher</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                      <Suspense fallback={<div>Loading...</div>}>
                                          <UpdateTeachers userData={updateModalData}/>
                                      </Suspense>
                                  </Modal.Body>
                                  <Modal.Footer>
                                      <Button variant="secondary" onClick={handleCloseUpdateTeacherModal}>
                                      Close
                                      </Button>
                                      <Button variant="primary" className="mt-2">Submit</Button>
                                  </Modal.Footer>
                                  </Modal>
                              </div>
                              <div>
                                    <Button variant="primary" className="btn btn-danger" onClick={() => handleDelete(teacher._id)}>
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
  )
}

export default RegistrarUserAccounts;
