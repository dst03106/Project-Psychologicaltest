import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { userState } from "../../state";
import { useRecoilState } from "recoil";

const Container = styled.div`
  background-color: white;
  border: 1px solid #f0f1f3;
  border-radius: 8px;
  width: 600px;
  box-sizing: border-box;
  padding: 28px 24px;
  position: relative;
  margin: 50px auto;
  height: auto;
`;

export default function Start() {
  const history = useHistory();
  const [user, setUser] = useRecoilState(userState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <Container>
      <form className="text-center">
        <h1>직업가치관검사</h1>
        <br />
        <div className="d-flex justify-content-center mr-5">
          <h3>이름</h3>
          <input
            className="mb-3"
            name="username"
            value={user?.username}
            onChange={handleChange}
          />
        </div>
        <div className="mt-2 mb-2">
          <p class="text-danger">{!user.username && "이름을 입력해주세요"}</p>
        </div>
        <h3>성별</h3>
        <input
          type="radio"
          name="gender"
          value="100323"
          onChange={handleChange}
        />
        남자
        <br />
        <input
          type="radio"
          name="gender"
          value="100324"
          onChange={handleChange}
        />
        여자
        <br />
        <div className="mt-2 mb-2">
          <p class="text-danger">{!user.gender && "성별을 입력해주세요"}</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          type="submit"
          disabled={!user?.username || !user?.gender}
          onClick={() => {
            if (user.username && user.gender) {
              history.push("/test");
            }
          }}
        >
          검사시작
        </button>
      </form>
    </Container>
  );
}
