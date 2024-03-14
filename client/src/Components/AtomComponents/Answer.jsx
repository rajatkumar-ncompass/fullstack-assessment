import React, { useState } from "react";

import Comment from "../Forum/Comment";
import AddComentComponent from "../Forum/AddComentComponent";

const AnswerComponent = (props) => {
  const [showComments, setShowComment] = useState(false);

  const { answer, answerAuthor, answerId } = props.answers;
  const handleOpenComment = () => {
    setShowComment(!showComments);
  };

  console.log(answer, answerAuthor, answerId);

  return (
    <div className="answer-details">
      <div className="answer-content">
        <div className="answer">
          <p className="answer-title">{props.answers.answer}</p>
          <p className="answer-author">
            Answered by {props.answers.answerAuthor}
          </p>
        </div>

        <button className="open-comment" onClick={handleOpenComment}>
          Show Comments
        </button>
      </div>

      {showComments ? (
        <Comment
          key={props.answers.answerId}
          comments={props.answers.comments}
        ></Comment>
      ) : (
        <></>
      )}

      <AddComentComponent answers={props} />
    </div>
  );
};

export default AnswerComponent;
