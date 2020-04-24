import React, {useState} from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux';

import {testCreate} from '../../store/actions/testAdminActions.js'

const ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

const CreateTest = () => {
  const [questions, setQuestions] = useState([
    {
      id: ID(),
      text: "",
      code: "",
      type: "0",
      progLang: "html",
      answers: [
        {
          text: '',
          is_correct: '0',
        }
      ]
    }
  ]);
  const [testInfo, setTestInfo] = useState({
    title: "",
    description: "",
    time_interval: 30,
    time_between_attempts: 30
  });
  const dispatch = useDispatch();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: ID(),
        text: "",
        code: "",
        type: "0",
        progLang: "html",
        answers: [
          {
            text: "",
            is_correct: "0"
          }
        ]
      }
    ])
  };

  const deleteQuestion = (i) => {
    let newQArr = questions;
    newQArr.splice(i, 1);
    setQuestions([...newQArr])
  };

  const addAnswer = (questionIndex) => {
    let newQArr = questions;
    newQArr[questionIndex].answers.push({
      id: ID(),
      text: "",
      is_correct: "0"
    });
    setQuestions([...newQArr]);
  };

  const deleteAnswer = (questionIndex, answerIndex) => {
    let newQArr = questions;
    newQArr[questionIndex].answers.splice(answerIndex, 1);
    setQuestions([...newQArr])
  };

  const handleTestInfoChange = (e) => {
    setTestInfo({
      ...testInfo,
      [e.target.name]:e.target.value
    })
  };

  const handleQuestionChange = (e, i) => {
    let newQArr = questions;
    newQArr[i][e.target.name] = e.target.value;
    setQuestions([...newQArr]);
  };

  const handleAnswerChange = (e, i, j) => {
    let newQArr = questions;
    newQArr[i].answers[j][e.target.name] = e.target.value;
    setQuestions([...newQArr]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(testCreate({
      ...testInfo,
      time_interval: testInfo.time_interval * 60000,
      questions
    }));
  };

  return (
    <div>
      <Container>
        <h1 className="my-3 text-center">Create new test</h1>
        <Form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-3 p-3">
            <Form.Group>
              <Form.Label className="h3" style={{borderBottom: "4px solid #0097A7"}}>Title</Form.Label>
              <Form.Control required onChange={handleTestInfoChange} value={testInfo.title} name="title" type="text"/>
            </Form.Group>
            <Form.Group>
              <Form.Label className="h3">Description</Form.Label>
              <Form.Control required onChange={handleTestInfoChange} value={testInfo.description} name="description" as="textarea" rows="3" />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} md="6">
                <Form.Label className="h5">Duration (minutes)</Form.Label>
                <Form.Control required onChange={handleTestInfoChange} value={testInfo.time_interval} name="time_interval" type="number"/>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label className="h5">Days between attempts</Form.Label>
                <Form.Control required onChange={handleTestInfoChange} value={testInfo.time_between_attempts} name="time_between_attempts" type="number"/>
              </Form.Group>
            </Form.Row>
          </div>

          <div className="mb-3">
            <h2 className="bg-info text-white p-3"><span >Questions:</span></h2>
            {questions.map((question, i) => (
              <div key={i} className="border border-info shadow p-3 mb-3 rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h3 mb-0">{"Question " + (i+1)}</span>
                  <button onClick={() => deleteQuestion(i)} type="button" className="btn d-flex align-items-center justify-content-center">
                    <span className="material-icons text-danger h3 m-0">clear</span>
                  </button>
                </div>
                <Form.Group>
                  <Form.Label>Question text:</Form.Label>
                  <Form.Control required onChange={(e) => handleQuestionChange(e, i)} name="text" value={question.text} type="text"/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Code</Form.Label>
                  <Form.Control onChange={(e) => handleQuestionChange(e, i)} name="code" value={question.code} style={{whiteSpace: "pre-wrap"}} as="textarea" rows="3" />
                </Form.Group>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Question type</Form.Label>
                    <Form.Control onChange={(e) => handleQuestionChange(e, i)} name="type" value={question.type} as="select">
                      <option value="0">Single answer</option>
                      <option value="1">Multiple answer</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Programming language</Form.Label>
                    <Form.Control onChange={(e) => handleQuestionChange(e, i)} name="progLang" value={question.progLang} as="select">
                      <option value="html">html</option>
                      <option value="css">css</option>
                      <option value="js">js</option>
                      <option value="jsx">jsx</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <h2 className="bg-warning text-white p-3">Answers:</h2>
                <div>
                  {question.answers.map((answer, j) => (
                    <div key={j} className="border border-warning p-3 mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h3 mb-0">{"Answer "+ (j+1)}</span>
                        <button onClick={() => deleteAnswer(i, j)} type="button" className="btn d-flex align-items-center justify-content-center">
                          <span className="material-icons text-danger h3 m-0">clear</span>
                        </button>
                      </div>
                      <Form.Group>
                        <Form.Label>Answer text</Form.Label>
                        <Form.Control required onChange={(e) => handleAnswerChange(e, i, j)} name="text" value={answer.text} type="text"/>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Is correct</Form.Label>
                        <Form.Control required onChange={(e) => handleAnswerChange(e, i, j)} name="is_correct" value={answer.is_correct} as="select">
                          <option value="0">False</option>
                          <option value="1">True</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  ))}
                </div>
                <Button onClick={() => addAnswer(i)} variant="secondary">
                  Add answer
                </Button>
              </div>
            ))}

            <Button onClick={addQuestion} variant="secondary">
              Add question
            </Button>

          </div>

          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateTest;
