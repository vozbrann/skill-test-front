import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik';

import { loginFetch } from '../../store/actions/authActions'

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Redirect } from 'react-router-dom/';

import * as yup from 'yup';

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(8).required()
});

const Login = () => {
  const user = useSelector(state => state.auth.user);
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const isLoading = useSelector(state => state.auth.isLoading);

  const dispatch = useDispatch();

  const {handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(loginFetch(values));
    },
  });

  return (
    user ?
      <Redirect to="/"/>
        :
      <Container className="pt-5">
        <Row className="justify-content-center">
          <Col xs lg="4">
            <h3 className="text-center">Log in</h3>
            <Form className="mb-3" onSubmit={handleSubmit}>
              <Form.Group controlId="formGroupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  onChange={handleChange}
                  value={values.username}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={!!isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
              </Button>
            </Form>
            {errorMessage &&
              <Alert variant={"danger"}>
                {errorMessage}
              </Alert>
            }
          </Col>
        </Row>
      </Container>
  );
};

export default Login;
