import React from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Redirect} from 'react-router-dom';

const Profile = () => {
  const user = useSelector(state => state.auth.user);

  return (
      !user ? <Redirect to="/"/> :
      <div>
        <Container>
          <Row className="py-5">
            <Col sm={3}>
              <Image style={{width: "100%",height: "300px", objectFit: "cover"}} src='https://source.unsplash.com/random'/>
            </Col>
            <Col>
              <p className="h3">{user.username}</p>
              <p className="h5">Email: {user.email}</p>
            </Col>
          </Row>
        </Container>

      </div>

  );
};

export default Profile;
