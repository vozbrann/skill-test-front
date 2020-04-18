import React from 'react';

import { Link } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';

import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../../store/actions/authActions'

import styled from 'styled-components';

const UserRoundImage = styled(Image)`
  width: 40px;
  height:40px;
  object-fit: cover;
`;

const UserLinks = () => {

  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  return (
    <>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/catalog">Catalog</Nav.Link>
        <Nav.Link as={Link} to="/test/score">My results</Nav.Link>
        <Nav.Link as={Link} to="/test/create">Create test</Nav.Link>
      </Nav>
      <Nav>
        <NavDropdown
          alignRight
          title={<UserRoundImage src={user.img} roundedCircle />}
        >
          <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </>
  );
};

export default UserLinks;
