import React, {useEffect, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import { useParams } from "react-router";
import {testStart} from '../../store/actions/testActions'

import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {testInfoFetch} from '../../store/actions/testInfoActions';

const Header = styled.header`
  background-color: rgb(105, 99, 154);
  padding: 160px 0;
  clip-path: polygon(
    0 0,
    100% 0,
    100% 100%,
    0 calc(100% - 5vw)
  );
`;
const MainHeading = styled.h1`
  font-size: 60px;
`;
const MainDescription = styled.p`
  font-size: 20px;
`;


const TestInfo = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.test.isLoading);
  const errorMessage = useSelector(state => state.test.errorMessage);

  const testInfo = useSelector(state => state.testInfo.testInfo);
  const testInfoErrorMessage = useSelector(state => state.testInfo.testInfoErrorMessage);
  const testInfoLoading = useSelector(state => state.testInfo.testInfoLoading);

  let { id } = useParams();

  useEffect(() => {
    dispatch(testInfoFetch(id));
  },[]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
  };

  const startTest = () => {
    dispatch(testStart(id));
  };

  return (
    <div>
      {testInfoErrorMessage || testInfoLoading || !testInfo ?
        <Container className="my-5">
          {testInfoLoading ?
            <div className="text-center">
              <Spinner animation="border"/>
            </div>
          :
            <>
              <Alert variant="danger">
                {testInfoErrorMessage ? testInfoErrorMessage : "Test not found."}
              </Alert>
            </>
          }
        </Container>
        :
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                You can conduct this test only once a month. <br/>
                Make sure to read all their rules.
              </p>
              {errorMessage &&
              <Alert variant='danger'>
                {errorMessage}
              </Alert>
              }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={startTest}
                disabled={isLoading}
              >
                {!isLoading && !errorMessage ? "Start" : ""}
                {!isLoading && errorMessage ? "Try again" : ""}
                {isLoading ? "Loading..." : ""}
              </Button>
            </Modal.Footer>
          </Modal>
          <Header className="text-center text-white">
            <Container>
              <MainHeading>
                {testInfo && testInfo.title}
              </MainHeading>
              <MainDescription>{testInfo && testInfo.description}</MainDescription>
              <Button
                onClick={handleShow}
                className="mt-5 font-weight-bolder text-dark"
                size="lg"
                variant="warning"
              >
                Start
              </Button>
            </Container>
          </Header>
        </>
      }
    </div>
  );
};

export default TestInfo;
