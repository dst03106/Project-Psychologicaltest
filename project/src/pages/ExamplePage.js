import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URL = "https://www.career.go.kr/inspct/openapi/test/questions?";
const APIKEY = "22b308e00e924ac13272794919934f05"; // 인증키
const Q = "6";

function ExamplePage({ data }) {
  useEffect(() => {
    console.log("ExamplePage.js에서 리렌더링");
  });

  let qList = data
    .filter((item) => {
      return item.qitemNo == 1;
    })
    .map((item, index) => {
      return (
        <li key={index}>
          {item.question}
          <br />
          <input type="radio" name={item.qitemNo} />
          {item.answer01}
          <input type="radio" name={item.qitemNo} />
          {item.answer02}
        </li>
      );
    });

  return (
    <div>
      <h1>검사예시</h1>
      <p>
        직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.
      </p>
      <p>
        가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.
      </p>
      {qList}
      <Link to="/test">
        <button type="submit" disabled={false}>
          검사시작
        </button>
      </Link>
    </div>
  );
}

export default ExamplePage;
