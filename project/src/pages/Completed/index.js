import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useCallback } from "react";
import { userAnswer, userReport } from "../../state";
import { useSetRecoilState } from "recoil";
import api from "../../api";

const Container = styled.div`
  background-color: white;
  border: 1px solid #f0f1f3;
  border-radius: 8px;
  width: 600px;
  box-sizing: border-box;
  padding: 28px 24px;
  position: relative;
  margin: 50px auto;
`;

export default function Completed() {
  const location = useLocation();
  const setAnswer = useSetRecoilState(userAnswer);
  const setReport = useSetRecoilState(userReport);
  const { seq } = location?.state?.seq ? location.state : "";

  const fetchReport = useCallback(async () => {
    const res = await api.result.getReport({ seq });
    if (res) {
      const { name, grade } = res.user;
      const { registDt } = res.inspct;
      setAnswer({
        username: name,
        gender: grade === "100323" ? "남자" : "여자",
        startDtm: registDt.substr(0, 10),
      });
    }
    res && setReport(res);
  }, [seq, setReport, setAnswer]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return (
    <Container>
      <div className="text-center">
        <h1>검사가 완료되었습니다.</h1>
        <p>
          검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
          생각하는지를 알려주고, 중요 가치를 충족시켜줄 수 있는 직업에 대해
          생각해 볼 기회를 제공합니다.
        </p>
        <Link
          to={{
            pathname: "/result",
            state: { seq: location?.state?.seq },
          }}
        >
          <button type="button" className="btn btn-outline-secondary">
            결과보기
          </button>
        </Link>
      </div>
    </Container>
  );
}
