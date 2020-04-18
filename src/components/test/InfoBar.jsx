import React, {useState} from 'react';

import Button from 'react-bootstrap/Button';

import alarmImg from '../../img/alarm.svg';
import exitImg from '../../img/exit_to_app.svg';

import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import {useSelector, useDispatch} from 'react-redux';

import { useParams } from "react-router";

import {testCancel} from '../../store/actions/testActions'

const InfoBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isLoading = useSelector(state => state.test.isLoading);
  const errorMessage = useSelector(state => state.test.errorMessage);

  const dispatch = useDispatch();

  let { id } = useParams();
  const stopTestHandle = () => {
    handleClose();
    dispatch(testCancel(id));
  };

  return (
    <div className="py-3 shadow-sm">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your progress will be lost.<br/>
          Next attempt will be available in a month.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Return to test
          </Button>
          <Button variant="danger" onClick={stopTestHandle}>
            {isLoading ? "Loading..." : "Stop"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Container fluid className="px-5">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="m-0">HTML</h2>
          {errorMessage &&
            <Alert variant="danger m-0">
              {errorMessage}
            </Alert>
          }
          <div>
            <span>29.99 <Image className="mb-1" src={alarmImg}/></span>
            <Button onClick={handleShow} className="ml-3" variant="light">
              <Image src={exitImg}/>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InfoBar;
