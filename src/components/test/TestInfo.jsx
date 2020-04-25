import React, {useEffect, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { useParams } from "react-router";
import {testStart} from '../../store/actions/testActions'

import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {testInfoFetch} from '../../store/actions/testInfoActions';
import alarmImage from '../../img/alarm.svg';
import Image from 'react-bootstrap/Image';
import Popover from 'react-bootstrap/Popover';
import {Link} from 'react-router-dom';

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
  const user = useSelector(state => state.auth.user);

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
            <Alert variant="danger">
              {testInfoErrorMessage ? testInfoErrorMessage : "Test not found."}
            </Alert>
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
              <MainDescription className="mb-5">{testInfo && testInfo.description}</MainDescription>
              <div>
                <p>Duration: {testInfo.time_interval}<Image style={{filter: "invert(1)"}} className="pb-1 ml-1" src={alarmImage}/></p>
                <p>Time between attempts: {testInfo.time_between_attempts}<Image style={{filter: "invert(1)"}} className="pb-1 ml-1" src={alarmImage}/></p>
              </div>
              {!user ?
                <OverlayTrigger
                  trigger="click"
                  placement='right'
                  overlay={
                    <Popover id={`popover-positioned-right`}>
                      <Popover.Title as="h3">Authentication required</Popover.Title>
                      <Popover.Content>
                        Please, <Link to="/login">login</Link> or <Link to="/signUp">sign up</Link>
                      </Popover.Content>
                    </Popover>
                  }
                >
                  <Button
                    className="font-weight-bolder text-dark"
                    size="lg"
                    variant="warning"
                  >
                    Start
                  </Button>
                </OverlayTrigger>
                :
                <Button
                  onClick={handleShow}
                  className="font-weight-bolder text-dark"
                  size="lg"
                  variant="warning"
                >
                  Start
                </Button>
              }
            </Container>
          </Header>
        </>
      }
    </div>
  );
};

export default TestInfo;
