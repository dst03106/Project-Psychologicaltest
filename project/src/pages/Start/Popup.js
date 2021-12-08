import styled from "styled-components";

const Popup_container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Popup_inner = styled.div`
  box-sizing: border-box;
  width: 500px;
  border-radius: 30px;
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: 0 auto;
  background: white;
  text-align: center;
`;
export default function Popup({ visible, onClose }) {
  return (
    <Popup_container visible={visible}>
      <Popup_inner>
        <h2>이름를 입력해주세요</h2>
        <button onClick={onClose}>Close me</button>
      </Popup_inner>
    </Popup_container>
  );
}
