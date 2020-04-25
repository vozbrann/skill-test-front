import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';

import alarmImg from '../../img/alarm.svg';
import exitImg from '../../img/exit_to_app.svg';

import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import {testSubmit} from '../../store/actions/testActions';

import {useDispatch, useSelector} from 'react-redux';

import {useParams} from 'react-router';

import {testCancel} from '../../store/actions/testActions';

const InfoBar = () => {
  const isLoading = useSelector(state => state.test.isLoading);
  const errorMessage = useSelector(state => state.test.errorMessage);
  const test = useSelector(state => state.test.test);
  const testTaken = useSelector(state => state.test.testTaken);

  const [timeFinish, setTimeFinish] = useState(new Date().getTime() + parseInt(test.time_interval));

  const dispatch = useDispatch();

  const calculateTimeLeft = () => {
    const difference = timeFinish +  - +new Date();
    let timeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      // console.log("time finish");
      dispatch(testSubmit());
    }

    return timeLeft;
  };

  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let {id} = useParams();
  const stopTestHandle = () => {
    handleClose();
    dispatch(testCancel(id));
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timer)
    }
  });

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
            {isLoading ? 'Loading...' : 'Stop'}
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
          <div className="d-flex align-items-center">
            <span>{timeLeft.hours + ":" + timeLeft.minutes + ":" + timeLeft.seconds}<Image className="mb-1 ml-1" src={alarmImg}/></span>
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
