import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import Question from "./Question";
import api from "../../api";
import styled from "styled-components";
import { ProgressBar } from "react-bootstrap";
import useLocalStorage from "../../hooks/useLocalStorage";
import { userState } from "../../state";
import { useRecoilState, selector } from "recoil";

const Container = styled.div`
  background-color: white;
  border: 1px solid #f0f1f3;
  border-radius: 8px;
  width: 600px;
  box-sizing: border-box;
  padding: 28px 24px;
  position: relative;
  margin: 20px auto;
`;

// Hooks 폴더 만들어서 분리하기

Test.defaultProps = {
  header: [],
};
function Test() {
  const [user, setUser] = useRecoilState(userState);
  console.log(user);
  useEffect(() => console.log(user), [user]);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedVal, setSelectedVal, reset] = useLocalStorage(
    "selectedVal",
    []
  );
  const [curPage, setCurPage] = useState(0);
  const pageLimit = 5;
  const lastPageIdx = parseInt(questions?.length / pageLimit) + 1;

  const percentage = useMemo(() => {
    return curPage && selectedVal
      ? Math.floor((selectedVal?.length * 100) / questions?.length)
      : 0;
  }, [selectedVal, questions]);

  useEffect(() => {
    if (questions) {
      setLoading(true);
    }
  }, [questions]);
  useEffect(() => console.log(selectedVal), [selectedVal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newArr = [...selectedVal];
    newArr[name - 1] = value;
    setSelectedVal(newArr);
  };

  const fetchQuestions = useCallback(async () => {
    const res = await api.test.getQuestions();
    setQuestions(res);
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  function gotoPrevPage() {
    setCurPage((cur) => cur - 1);
  }

  function gotoNextPage() {
    setCurPage((cur) => cur + 1);
  }

  const isDisabled = useMemo(() => {
    if (curPage === 0 && !!selectedVal[0]) return false;
    if (curPage > 0) {
      for (let i = pageLimit * (curPage - 1); i < pageLimit * curPage; i++) {
        if (!selectedVal[i]) {
          return true;
        } else if (i === questions?.length - 1) {
          return false;
        }
      }
    }
    return true;
  }, [selectedVal, curPage]);

  const handleSubmit = async () => {
    // 일단 임시로 정의
    console.log(user);
    const { username, gender, startDtm } = user;

    const answers = selectedVal
      .map((item, idx) => {
        return `B${idx + 1}=${item}`;
      })
      .join(" ");

    const res = await api.test.submit({
      name: username,
      gender,
      startDtm,
      answers,
    });

    if (res?.url) {
      console.log(res);
      const seq = res.url.split("seq=").pop();
      seq && history.push("/completed", { seq });
    }
  };

  return (
    <Container>
      <div className="row justify-content-between">
        <div className="mb-2 col col-auto">
          <h1>검사진행</h1>
        </div>
        <div className="mb-2 col col-auto">
          <h1>{percentage}%</h1>
        </div>
      </div>
      <ProgressBar now={percentage} />
      {curPage == 0 && (
        <Question
          visible={true}
          question={"두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요"}
          answer01={"능력발휘"}
          answer02={"자율성"}
          answerScore01={"1"}
          answerScore02={"2"}
          qitemNo={1}
          handleChange={handleChange}
          initalValue={selectedVal[0]}
        />
      )}
      {curPage > 0 &&
        questions.map(
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
      <div className="d-flex justify-content-between">
        {curPage > 0 && curPage != 1 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={gotoPrevPage}
          >
            이전
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => reset(e.target.value)}
          value="selectedVal"
        >
          초기화
        </button>
        {/* 예시 페이지  */}
        {curPage === 0 && (
          <button
            type="button"
            value="selectedVal"
            className="btn btn-primary"
            onClick={(e) => {
              reset(e.target.value);
              gotoNextPage();
            }}
            disabled={isDisabled}
          >
            다음
          </button>
        )}
        {/* 진행 페이지  */}
        {curPage > 0 && curPage != lastPageIdx && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={gotoNextPage}
            disabled={isDisabled}
          >
            다음
          </button>
        )}
        {curPage == lastPageIdx && (
          <button
            type="button"
            className="btn btn-primary"
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            다음
          </button>
        )}
      </div>
    </Container>
  );
}

export default Test;
