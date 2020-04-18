import React from 'react';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import {useSelector} from 'react-redux';

const QuestionsList = styled(Col)`
    max-height: 70vh;
    overflow-y: auto;
    
    
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0.3);
      background-color: #F5F5F5;
    }
    ::-webkit-scrollbar {
      width: 10px;
      background-color: #F5F5F5;
    }
      ::-webkit-scrollbar-thumb {
      background-color: #d5d5d5;
    }
    
    & > div {
      transition: all 0.3s ease;
      cursor: pointer;
      &.active {
        background-color: #f5f2f0;
        &.done {
          background-color: #ffdd9f;
        }
      }
      &.done {
        background-color: #ffecca;
      }
      &:hover {
        background-color: #f5f2f0;
        &.done {
          background-color: #ffdd9f;
        }
      }
    }
`;

const QuestionsPreviewList = ({currentTestIndex, setCurrentTestIndex}) => {
  const selectedAnswers = useSelector(state => state.test.selectedAnswers);
  const test = useSelector(state => state.test.test);

  return (
    <QuestionsList sm={3} className="px-0">
      {test.questions.map((el, i) => (
        <div
          key={el.id}
          className={"p-3 text-truncate " + (i === currentTestIndex ? "active " : "") + "" + (selectedAnswers && !!selectedAnswers[el.id] && !!selectedAnswers[el.id].length? "done ": "")}
          onClick={() => setCurrentTestIndex(i)}
        >
          <span className="mr-3">{i+1}</span>
          {el.text}
        </div>
      ))}
    </QuestionsList>
  );
};

export default QuestionsPreviewList;
