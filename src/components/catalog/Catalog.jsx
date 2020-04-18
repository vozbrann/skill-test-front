import React, {useEffect, useState} from 'react';

import {testInfoListFetch} from '../../store/actions/testInfoActions';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import TestCard from './TestCard';
import {useDispatch, useSelector} from 'react-redux';

const Catalog = () => {
  const [searchValue, setSearchValue] = useState("");

  const testInfoList = useSelector(state => state.testInfo.testInfoList);
  const errorMessage = useSelector(state => state.testInfo.errorMessage);
  const testInfoListLoading = useSelector(state => state.testInfo.testInfoListLoading);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(testInfoListFetch());
  }, []);

  return (
    <div>
      <Container>
        <Row className="mb-5 mt-4">
          <Col>
            <h1>Catalog</h1>
          </Col>
          <Col lg={4}>
            <Form.Group className="d-flex"
                        controlId="exampleForm.ControlInput1">
              <Form.Label className="mr-3 h3">Search:</Form.Label>
              <Form.Control
                className="border-secondary"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        {errorMessage &&
          <Alert variant="danger">
            {errorMessage}
          </Alert>
        }

        {!!testInfoList.length &&
        testInfoList.filter(el => el.title.includes(searchValue)).map(testInfo => <TestCard key={testInfo.id} testInfo={testInfo}/>)}
      </Container>
    </div>
  );
};

export default Catalog;
