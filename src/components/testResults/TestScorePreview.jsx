import React from 'react';

import Form from 'react-bootstrap/Form';

import styled from 'styled-components';
import {Link} from 'react-router-dom';

const TestScorePreview = ({testResult, handleShowStatusChange}) => {
  return (
    <div className="shadow mb-3 p-3 d-flex justify-content-between">
      <Link to={"/test/"+testResult.test_id}>
        <h4 className="m-0">Test id: {testResult.test_id}</h4>
      </Link>
      <div className="d-flex align-items-center">
        <span className="mr-3 text-secondary">
          {new Date(parseInt(testResult.start_time)).toLocaleString()}
        </span>
        {handleShowStatusChange && !testResult.canceled &&
          <Form className="mr-3">
            <Form.Check
              checked={testResult.public}
              onChange={handleShowStatusChange}
              type="switch"
              id={"res_"+testResult.id}
              label="Public"
            />
          </Form>
        }
        {testResult.canceled ? <span className="h4 m-0">Canceled</span> :
          <span className="h4 m-0">{testResult.score}%</span>
        }
      </div>
    </div>
  );
};

export default TestScorePreview;
