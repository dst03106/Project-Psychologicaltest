import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import api from "../api";

// Custom Hook
function useLocalStorage(key, defaultValue = null) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      console.log(e);
      return defaultValue;
    }
  });

  useEffect(() => {
    const rawValue = JSON.stringify(value);
    window.localStorage.setItem(key, rawValue);
  }, [value]);

  const reset = (key) => {
    window.localStorage.removeItem(key);
  };

  return [value, setValue, reset];
}

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
      <div style={{ display: visible ? "block" : "none" }}>
        <div>{question}</div>
        <div>
          <input
            type="radio"
            id={answerScore01}
            name={qitemNo}
            value={answerScore01}
            onChange={handleChange}
            defaultChecked={initalValue === answerScore01}
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
            defaultChecked={initalValue === answerScore02}
          />
          <label htmlFor={answerScore02}>{answer02}</label>
        </div>
      </div>
    </>
  );
};
function TestPage1() {
  const [questions, setQuestions] = useState([]);
  const [selectedVal, setSelectedVal, reset] = useLocalStorage("temp", []);
  const [curPage, setCurPage] = useState(1);
  const pageLimit = 5;
  const pageLen = parseInt(questions.length / pageLimit) + 1;

  useEffect(() => {
    console.log(selectedVal);
  }, [selectedVal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newArr = [...selectedVal];
    newArr[name - 1] = value;
    setSelectedVal(newArr);
  };

  useEffect(() => {
    console.log("TestPage.js에서 리렌더링");
  });

  const fetchQuestions = useCallback(async () => {
    const res = await api.test.getQuestions();
    setQuestions(res);
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  function gotoPrevPage() {
    setCurPage((cur) => cur - 1);
  }

  function gotoNextPage() {
    setCurPage((cur) => cur + 1);
  }
  return (
    <>
      <h1>검사진행</h1>
      <button onClick={(e) => reset(e.target.value)} value="temp">
        temp
      </button>
      <button onClick={(e) => reset(e.target.value)} value="selectedVal">
        selectedVal
      </button>
      {curPage != 1 && <button onClick={gotoPrevPage}>이전</button>}
      {curPage != pageLen && <button onClick={gotoNextPage}>다음</button>}
      {curPage == pageLen && (
        <Link to="/completion">
          <button
          // name="answers"
          // value={answers.join(" ")}
          // disabled={Object.keys(answers).length == data.length ? false : true}
          // onClick={onChange}
          >
            다음
          </button>
        </Link>
      )}

      {questions.map(
        ({
          question,
          answer01,
          answer02,
          answerScore01,
          answerScore02,
          qitemNo,
        }) => {
          return (
            <Question
              visible={qitemNo > 5 * (curPage - 1) && qitemNo <= 5 * curPage}
              question={question}
              answer01={answer01}
              answer02={answer02}
              answerScore01={answerScore01}
              answerScore02={answerScore02}
              qitemNo={qitemNo}
              handleChange={handleChange}
              initalValue={selectedVal[qitemNo - 1]}
            />
          );
        }
      )}
    </>
  );
}

export default TestPage1;
