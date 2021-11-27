const Question = ({
  visible,
  question,
  answer01,
  answer02,
  answerScore01,
  answerScore02,
  qitemNo,
  handleChange,
  initalValue,
}) => {
  return (
    <>
      <div style={{ display: visible ? "block" : "none" }} key={qitemNo}>
        <div>{question}</div>
        <div>
          <input
            type="radio"
            id={answerScore01}
            name={qitemNo}
            value={answerScore01}
            onChange={handleChange}
            checked={initalValue === answerScore01}
          />
          <label htmlFor={answerScore01}>{answer01}</label>
        </div>
        <div>
          <input
            type="radio"
            id={answerScore02}
            name={qitemNo}
            value={answerScore02}
            onChange={handleChange}
            checked={initalValue === answerScore02}
          />
          <label htmlFor={answerScore02}>{answer02}</label>
        </div>
      </div>
    </>
  );
};

export default Question;
