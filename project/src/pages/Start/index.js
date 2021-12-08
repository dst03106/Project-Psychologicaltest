import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { userState } from "../../state";
import { useRecoilState } from "recoil";
import Popup from "./Popup";

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
  const [modalVisible, setModalVisible] = useState(false);
  const nameRegExp = /^[가-힣]{2,4}$/;

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
        <div className="d-flex justify-content-around w-50 mx-auto">
          <div>
            <h3>이름</h3>
          </div>
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
          // disabled={!user?.username || !user?.gender}
          onClick={() => {
            openModal();
            // if (user.username && user.gender) {
            //   history.push("/test");
            // }
          }}
        >
          검사시작
        </button>
      </form>
      {modalVisible && <Popup visible={modalVisible} onClose={closeModal} />}
    </Container>
  );
}
