import React, {useEffect} from 'react';
import AnswersBlock from './AnswersBlock';

import Prism from "prismjs";
import "prismjs/components/prism-jsx.min"
import "prismjs/themes/prism.css";

const Question = ({question}) => {
  let type = '';
  if (question.type === "0") {
    type = "radio";
  } else {
    type = "checkbox";
  }

  useEffect(() => {
    Prism.highlightAll();
  }, [question]);

  return (
    <>
      <div className="mb-3">
        <p>{question.text}</p>
        {question.code &&
          <pre>
            <code className={"language-"+question.progLang}>
              {question.code}
            </code>
          </pre>
        }
      </div>
      <AnswersBlock id={question.id} answers={question.answers} type={type}/>
    </>
  );
};

export default Question;
