import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import GuestLinks from './GuestLinks';
import { useSelector } from 'react-redux';
import UserLinks from './UserLinks';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const AppBarStyled = styled(Navbar)`
  height:70px;
`;

const AppBar = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <AppBarStyled bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand className="font-weight-bold" as={Link} to="/">Skill-test</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          {user ?
            <UserLinks/> :
            <GuestLinks/>
          }
        </Navbar.Collapse>
      </Container>
    </AppBarStyled>
  );
};

export default AppBar;
