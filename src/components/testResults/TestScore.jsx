import React, {useEffect} from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

import { useParams } from "react-router";

import {setTestFinishedId} from '../../store/actions/testActions'
import {testScoreFetch} from '../../store/actions/testScoreActions'
import {useDispatch, useSelector} from 'react-redux';
import Alert from 'react-bootstrap/Alert';

const TestScore = () => {
  const dispatch = useDispatch();
  const testScore = useSelector(state => state.testScore.testScore);
  const testInfo = useSelector(state => state.testInfo.testInfo);
  const testScoreErrorMessage = useSelector(state => state.testScore.testScoreErrorMessage);
  const testScoreLoading = useSelector(state => state.testScore.testScoreLoading);

  let { id } = useParams();

  useEffect(() => {
    dispatch(setTestFinishedId(null));
    dispatch(testScoreFetch(id))
  }, []);
  return (
    <div>
      {testScoreErrorMessage ?
        <Container className="my-5">
          <Alert variant="danger">
            {testScoreErrorMessage}
          </Alert>
        </Container>
        :
        <Container className="my-5">
          <div className="d-flex mb-4 align-items-center justify-content-between">
            <span className="h2">{testInfo && testInfo.title}</span>
            <span className="h5">{testScore && new Date(parseInt(testScore.start_time)).toLocaleDateString()}</span>
          </div>
          <div className="mb-4">
            {testScore && testScore.canceled ? <p className="m-0 h3">Canceled</p> :
              <p className="m-0 h3">Score: {testScore && testScore.score} %</p>
            }
          </div>
          <div className="text-center">
            <Button as={Link} to="/catalog" variant="primary">Return to catalog</Button>
          </div>

        </Container>
      }
    </div>
  );
};

export default TestScore;
