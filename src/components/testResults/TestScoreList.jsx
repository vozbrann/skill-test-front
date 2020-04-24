import React, {useEffect, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TestScorePreview from './TestScorePreview';
import {testScoreListFetch, testScorePublic} from '../../store/actions/testScoreActions';
import {useDispatch, useSelector} from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const TestScoreList = () => {

  const [modalShow, setModalShow] = useState(false);
  const [activeTestRes, setActiveTestRes] = useState(null);

  const testScoreList = useSelector(state => state.testScore.testScoreList);
  const testScoreListErrorMessage = useSelector(
    state => state.testScore.testScoreListErrorMessage);
  const testScoreListLoading = useSelector(
    state => state.testScore.testScoreListLoading);
  const dispatch = useDispatch();

  const handleClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const handleShowStatusChange = (testRes) => {
    setActiveTestRes(testRes);
    handleModalShow(true);
  };

  useEffect(() => {
    dispatch(testScoreListFetch());
  }, []);

  return (
    <div>
      {activeTestRes &&
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{activeTestRes.public
            ? 'Hide result'
            : 'Publish result'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your <span
            className="font-weight-bold">{activeTestRes.title}</span> test
            result will be
            {activeTestRes.public
              ? 'hidden'
              : 'visible to everyone'}
          </p>
          <TestScorePreview testResult={activeTestRes}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            dispatch(testScorePublic(activeTestRes.id, !activeTestRes.public));
            handleClose();
          }}>
            {activeTestRes.public
              ? 'Hide result'
              : 'Publish result'}
          </Button>
        </Modal.Footer>
      </Modal>
      }
      <Container className="my-3">
        <h1 className="mb-3">My results</h1>
        {testScoreListLoading ?
          <div className="text-center">
            <Spinner animation="border" />
          </div>
          :
          <>
            {testScoreListErrorMessage ?
              <Alert variant="danger">
                {testScoreListErrorMessage}
              </Alert>
              :
              <div>
                {testScoreList.map(el => (
                  <TestScorePreview key={el.id}
                                    handleShowStatusChange={() => handleShowStatusChange(
                                      el)} testResult={el}/>
                )).reverse()}
              </div>
            }
          </>
        }
      </Container>
    </div>
  );
};

export default TestScoreList;
