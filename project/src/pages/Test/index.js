import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import Question from "./Question";
import api from "../../api";

// Hooks 폴더 만들어서 분리하기
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
    setValue([]);
  };

  return [value, setValue, reset];
}

function Test() {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [selectedVal, setSelectedVal, reset] = useLocalStorage(
    "selectedVal",
    []
  );
  const [curPage, setCurPage] = useState(1);
  const pageLimit = 5;
  const lastPageIdx = parseInt(questions.length / pageLimit) + 1;

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

  const isDisabled = useMemo(() => {
    for (let i = pageLimit * (curPage - 1); i < pageLimit * curPage; i++) {
      if (!selectedVal[i]) {
        return true;
      } else if (i === questions.length - 1) {
        return false;
      }
    }
    return false;
  }, [selectedVal, curPage]);

  const handleSubmit = async () => {
    // 일단 임시로 정의
    const name = "홍길동";
    const gender = "100323";
    const startDtm = 1550466291034;

    const answers = selectedVal
      .map((item, idx) => {
        return `B${idx + 1}=${item}`;
      })
      .join(" ");
    const res = await api.test.submit({ name, gender, startDtm, answers });
    if (res?.url) {
      const seq = res.url.split("seq=").pop();
      seq && history.push("/completed", { seq });
    }
  };

  return (
    <>
      <h1>검사진행</h1>
      <button onClick={(e) => reset(e.target.value)} value="selectedVal">
        초기화
      </button>
      {curPage != 1 && <button onClick={gotoPrevPage}>이전</button>}
      {curPage != lastPageIdx && (
        <button onClick={gotoNextPage} disabled={isDisabled}>
          다음
        </button>
      )}
      {curPage == lastPageIdx && (
        <button disabled={isDisabled} onClick={handleSubmit}>
          다음1
        </button>
      )}
      {curPage == lastPageIdx && (
        <Link to="/completion">
          <button disabled={isDisabled} onClick={handleSubmit}>
            다음2
          </button>
        </Link>
      )}

      {questions.map(
        ({
          question,
          answer01,
          answer02,
          answer03,
          answer04,
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
              answer03={answer03}
              answer04={answer04}
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

export default Test;
