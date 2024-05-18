import React, { useState, useEffect, Suspense, lazy } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import UserProfile from "../../assets/images/users/profile_icon.png";

const UpdateUserProfile = lazy(() => import("../../views/forms/update/updateUserProfile"));

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authResponse = await axios.get('http://localhost:5000/api/auth/check-auth', { withCredentials: true });
        if (authResponse.status === 200) {
          const userId = authResponse.data.userId;
          if (!userId) {
            throw new Error('User ID is not defined');
          }
          const userDataResponse = await axios.get(`http://localhost:5000/api/auth/users/${userId}`, { withCredentials: true });
          setUser(userDataResponse.data);
        } else {
          console.error('Failed to authenticate');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <MDBContainer>
      <MDBRow className="p-0">
        <MDBCol lg="4">
          <MDBCard className="mb-4">
            <MDBCardBody className="text-center">
              <MDBCardImage
                src={UserProfile}
                alt="avatar"
                className="rounded-circle"
                style={{ width: '150px' }}
                fluid
              />
              <p className="text-muted mb-1">{user.lastname}, {user.firstname} {user.middlename}</p>
              <p className="text-muted mb-4">{user.role}</p>
              <div className="mb-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="primary" onClick={handleShow}>
                  Edit Profile
                </Button>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Edit your profile</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Suspense fallback={<div>Loading...</div>}>
                      <UpdateUserProfile user={user} />
                    </Suspense>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant="primary" form="updateUserProfileForm" type="submit">
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="8">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Info</span></MDBCardText>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Full Name</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.lastname}, {user.firstname} {user.middlename}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Username</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.username}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Address</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.address}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Age</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.age}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Sex</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.sex}</MDBCardText>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>

          <MDBRow>
            <MDBCol md="6">
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody>
                  <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Contacts</span></MDBCardText>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{user.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{user.mobile}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="6">
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody>
                  <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Type of User</span></MDBCardText>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Role</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{user.role}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Date of Birth</span></MDBCardText>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Date of Birth</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{new Date(user.dateOfBirth).toLocaleDateString()}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
