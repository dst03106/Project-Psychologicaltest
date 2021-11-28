import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

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
