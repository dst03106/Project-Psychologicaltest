import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userState } from "../../state/userState";
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
  const [user, setUser] = useRecoilState(userState);
  const [click, setClick] = useState(false);
  console.log(user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

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
          {click && !user.username && "이름을 입력해주세요"}
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
          {click && !user.gender && "성별을 입력해주세요"}
        </div>
        <Link to="/test">
          <button
            type="button"
            className="btn btn-outline-secondary"
            type="submit"
            disabled={(!click && user?.username) || user?.gender}
            onClick={() => setClick(true)}
          >
            검사시작
          </button>
        </Link>
      </form>
    </Container>
  );
}
