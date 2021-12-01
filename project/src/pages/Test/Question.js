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
      <div
        className="mt-2 mb-2 card text-center"
        style={{ display: visible ? "block" : "none", height: 80 }}
        key={qitemNo}
      >
        <div className="mt-1 mb-1">{question}</div>
        <div className="mt-1 mb-1 d-flex justify-content-around">
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
      </div>
    </>
  );
};

export default Question;
