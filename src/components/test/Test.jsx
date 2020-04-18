import React, { useState, useEffect }  from 'react';
import InfoBar from './InfoBar';

import { useHistory, Redirect } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import styled from 'styled-components';
import Question from './Question';
import {useDispatch, useSelector} from 'react-redux';
import TestInfo from './TestInfo';
import QuestionsPreviewList from './QuestionsPreviewList';
import {testSubmit} from '../../store/actions/testActions';
import LoadingFullscreen from '../LoadingFullscreen';

const ControlBtn = styled(Button)`
  width: 100px;
`;

const Test = () => {
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const test = useSelector(state => state.test.test);
  const testTaken = useSelector(state => state.test.testTaken);
  const isLoading = useSelector(state => state.test.isLoading);
  const selectedAnswers = useSelector(state => state.test.selectedAnswers);
  const testFinishedId = useSelector(state => state.test.testFinishedId);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(testSubmit());
  };

  if (testFinishedId) {
    return <Redirect to={"/test/score/"+testFinishedId}/>
  }

  return (
    <>
      {!test ? <TestInfo/> :
        <>
          {isLoading && <LoadingFullscreen/>}
          <InfoBar/>
          <Container className="mb-5">
            <Row>
              <QuestionsPreviewList currentTestIndex={currentTestIndex} setCurrentTestIndex={setCurrentTestIndex}/>
              <Col sm={9} className="px-5 py-4">
                <Question question={test.questions[currentTestIndex]}/>
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
                    handleSubmit();
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
    </>
  );
};

export default Test;
