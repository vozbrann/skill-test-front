import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {useDispatch, useSelector} from 'react-redux';

import {updateAnswers} from '../../store/actions/testActions'

const AnswersBlock = ({id, type, answers}) => {
  const selectedAnswers = useSelector(state => state.test.selectedAnswers);

  const dispatch = useDispatch();
  const handleInput = (answerId) => {
    let newAnswer;
    if (!!selectedAnswers[id] && selectedAnswers[id].includes(answerId)) {
      newAnswer = selectedAnswers[id].filter(el => el !== answerId);
    } else {
      if (type === "radio" || !selectedAnswers[id]) {
        newAnswer = [answerId];
      } else {
        newAnswer = [...selectedAnswers[id], answerId];
      }
    }
    dispatch(updateAnswers({...selectedAnswers, [id]:newAnswer }))
  };

  return (
    <Container fluid="lg">
      <Row>
        {answers.map(el => (
          <Col key={el.id} className="mb-3 px-2" lg={6}>
            <Form.Label className="border rounded p-3 h-100 w-100" htmlFor={el.id}>
              <Form.Check
                custom
                type={type}
                id={el.id}
                checked={(selectedAnswers[id] && selectedAnswers[id].includes(el.id)) || false}
                label={el.text}
                onChange={() => handleInput(el.id)}
              />
            </Form.Label>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AnswersBlock;
