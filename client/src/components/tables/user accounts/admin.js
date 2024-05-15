import React, { useState, Suspense, lazy, useEffect} from 'react';
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const CreateUsers = lazy(() => import("../../../views/forms/create/createUsers.js"));
const UpdateUsers = lazy(() => import("../../../views/forms/update/updateUsers.js"))

function AdminUserAccounts ({ handleClose }) {

    const [admin, setAdmin] = useState([]);
    const [registrar, setRegistrar] = useState([]);
    const [teacher, setTeacher] = useState([]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateRegistrarModal, setshowUpdateRegistrarModal] = useState(false);
    const [showUpdateTeacherModal, setshowUpdateTeacherModal] = useState(false);
    const [showUpdateAdminModal, setshowUpdateAdminModal] = useState(false);

    const [updateModalData, setUpdateModalData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const adminResponse = await axios.get('http://localhost:5000/api/auth/admins');
            const registrarResponse = await axios.get('http://localhost:5000/api/auth/registrars');
            const teacherResponse = await axios.get('http://localhost:5000/api/auth/teachers');
    
            setAdmin(adminResponse.data);
            setRegistrar(registrarResponse.data);
            setTeacher(teacherResponse.data);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        fetchData();
      }, []);

    // Create modal
    const handleCloseCreateModal = () => setShowCreateModal(false);
    const handleShowCreateModal = () => setShowCreateModal(true);

     // Update modal
    // Admin
    const handleCloseUpdateAdminModal = () => setshowUpdateAdminModal(false);
    const handleShowUpdateAdminModal = (admin) => {
        setUpdateModalData(admin);
        setshowUpdateAdminModal(true);
    }
    // Registrar
    const handleCloseUpdateRegistrarModal = () => setshowUpdateRegistrarModal(false);
    const handleShowUpdateRegistrarModal = (registrar) => {
        setUpdateModalData(registrar);
        setshowUpdateAdminModal(true);
    }
    // Teacher
    const handleCloseUpdateTeacherModal = () => setshowUpdateTeacherModal(false);
    const handleShowUpdateTeacherModal = (teacher) => {
        setUpdateModalData(teacher);
        setshowUpdateTeacherModal(true);
    }

    // Function to handle user deletion
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
              <Modal.Title>Add a User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Suspense fallback={<div>Loading...</div>}>
                  <CreateUsers />
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
                <CardTitle tag="h5">Admins</CardTitle>
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
                    {admin.map((admin) => (
                        <tr className="border-top" key={admin._id}>
                            <td>{admin.addedBy}</td>
                            <td>{admin.lastName}, {admin.firstName} {admin.middleName}</td>
                            <td>{admin.username}</td>
                            <td>{admin.address}</td>
                            <td>{admin.email}</td>
                            <td>{admin.sex}</td>
                            <td>{admin.mobile}</td>
                            <td>{admin.role}</td>
                            <td>{admin.dateOfBirth}</td>
                            <td>{admin.createdAt}</td>
                            <td>
                                <div className="mb-2" style={{ display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
                                    <Button variant="primary" onClick={() => handleShowUpdateAdminModal(admin._id)}>
                                        Update
                                    </Button>
                                    <Modal
                                            show={showUpdateAdminModal}
                                            onHide={handleCloseUpdateAdminModal}
                                            backdrop="static"
                                            keyboard={false}
                                            >
                                    <Modal.Header closeButton>
                                    <Modal.Title>Update an Admin</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <UpdateUsers userData={updateModalData} />
                                        </Suspense>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseUpdateAdminModal}>
                                        Close
                                        </Button>
                                        <Button variant="primary" className="mt-2">Submit</Button>
                                    </Modal.Footer>
                                    </Modal>
                                </div>
                                <div>
                                    <Button variant="primary" className="btn btn-danger" onClick={() => handleDelete(admin._id)}>
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
                <CardTitle tag="h5">Registrars</CardTitle>
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
                    {registrar.map((registrar) => (
                        <tr className="border-top" key={registrar._id}>
                            <td>{registrar.addedBy}</td>
                            <td>{registrar.lastName}, {registrar.firstName} {registrar.middleName}</td>
                            <td>{registrar.username}</td>
                            <td>{registrar.address}</td>
                            <td>{registrar.email}</td>
                            <td>{registrar.sex}</td>
                            <td>{registrar.mobile}</td>
                            <td>{registrar.role}</td>
                            <td>{registrar.dateOfBirth}</td>
                            <td>{registrar.createdAt}</td>
                            <td>
                                <div className="mb-2" style={{ display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
                                    <Button variant="primary" onClick={() => handleShowUpdateRegistrarModal(registrar._id)}>
                                        Update
                                    </Button>
                                    <Modal
                                            show={showUpdateRegistrarModal}
                                            onHide={handleCloseUpdateRegistrarModal}
                                            backdrop="static"
                                            keyboard={false}
                                            >
                                    <Modal.Header closeButton>
                                    <Modal.Title>Update a Registrar</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <UpdateUsers userData={updateModalData}/>
                                        </Suspense>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseUpdateRegistrarModal}>
                                        Close
                                        </Button>
                                        <Button variant="primary" className="mt-2">Submit</Button>
                                    </Modal.Footer>
                                    </Modal>
                                </div>
                                <div>
                                    <Button variant="primary" className="btn btn-danger" onClick={() => handleDelete(registrar._id)}>
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
                    {teacher.map((teacher) => (
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
                                            <UpdateUsers userData={updateModalData} />
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

export default AdminUserAccounts;
