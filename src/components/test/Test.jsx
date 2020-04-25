import React, { useState, useEffect }  from 'react';
import {testCancel} from '../../store/actions/testActions';
import InfoBar from './InfoBar';
import {useParams} from 'react-router';

import { useHistory, Redirect } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';

import styled from 'styled-components';
import Question from './Question';
import {useDispatch, useSelector} from 'react-redux';
import TestInfo from './TestInfo';
import QuestionsPreviewList from './QuestionsPreviewList';
import {testSubmit} from '../../store/actions/testActions';
import LoadingFullscreen from '../LoadingFullscreen';
import Modal from 'react-bootstrap/Modal';

const ControlBtn = styled(Button)`
  width: 100px;
`;

const Test = () => {
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [showCheatingMessage, setShowCheatingMessage] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const test = useSelector(state => state.test.test);
  const testTaken = useSelector(state => state.test.testTaken);
  const isLoading = useSelector(state => state.test.isLoading);
  const selectedAnswers = useSelector(state => state.test.selectedAnswers);
  const testFinishedId = useSelector(state => state.test.testFinishedId);

  const dispatch = useDispatch();

  const cheatingDetected = () => {
    if (!!test) {
      setShowCheatingMessage(true);
    }
  };

  const onBeforeUnload = e => { // the method that will be used for both add and remove event
    if (test) {
      e.preventDefault();
      e.returnValue = 'Test progress will be lost';
    }
  };


  useEffect(() => {
    window.addEventListener('blur', cheatingDetected);
    window.addEventListener("beforeunload", onBeforeUnload);
    // Specify how to clean up after this effect:
  }, [test]);

  useEffect(() => {
    return () => {
      window.removeEventListener('blur', cheatingDetected);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [test]);

  const handleSubmit = () => {
    dispatch(testSubmit());
  };

  if (testFinishedId) {
    return <Redirect to={"/test/score/"+testFinishedId}/>
  }

  const numberUnansweredQuestions = test && test.questions ?
    test.questions.filter(question => {
      return !selectedAnswers[question.id] || selectedAnswers[question.id].length === 0
    }).length : 0;
  return (
    <div>
      {!test ? <TestInfo/> :
        <>
          <Modal show={showSubmitModal} onHide={() => setShowSubmitModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>You are going to submit the test.</p>
              {!!numberUnansweredQuestions &&
                <p>You have <Badge pill variant="warning">{numberUnansweredQuestions}</Badge> not answered {numberUnansweredQuestions === 1? "question" : "questions"}!</p>
              }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowSubmitModal(false)}>
                Return to test
              </Button>
              <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
          </Modal>
          <Toast
            onClose={() => setShowCheatingMessage(false)} show={showCheatingMessage}
            style={{
            position: 'absolute',
            bottom: 80,
            right: "2%",
            zIndex: 10,
            width: "300px"
          }}>
            <Toast.Header>
              <strong className="mr-auto">Cheating detected</strong>
            </Toast.Header>
            <Toast.Body>Don't leave the page. And don't try to copy questions.</Toast.Body>
          </Toast>
          {isLoading && <LoadingFullscreen/>}
          <InfoBar/>
          <Container className="mb-5">
            <Row>
              <QuestionsPreviewList currentTestIndex={currentTestIndex} setCurrentTestIndex={setCurrentTestIndex}/>
              <Col sm={9} className="px-5 py-4">
                <Question cheatingDetected={cheatingDetected} question={test.questions[currentTestIndex]}/>
              </Col>
            </Row>
          </Container>
          <div className="p-3 bg-white shadow fixed-bottom">
            <Container className="text-center">
              <ControlBtn
                disabled={!currentTestIndex}
                onClick={()=> setCurrentTestIndex(currentTestIndex-1)}
                className="mx-3"
                variant="secondary"
              >
                Previous
              </ControlBtn>
              <ControlBtn
                className="mx-3"
                variant={currentTestIndex === test.questions.length-1 ? "success" : "primary"}
                onClick={() => {
                  if (currentTestIndex === test.questions.length-1) {
                    setShowSubmitModal(true);
                  } else {
                    setCurrentTestIndex(currentTestIndex+1)
                  }
                }}
              >
                {currentTestIndex === test.questions.length-1 ? "Submit": "Next"}
              </ControlBtn>
            </Container>
          </div>
        </>
      }
    </div>
  );
};

export default Test;
