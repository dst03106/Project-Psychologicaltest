import Axios from "axios";

const URL = "https://www.career.go.kr/inspct/openapi/test";
const APIKEY = "22b308e00e924ac13272794919934f05"; // 인증키
const axios = Axios.create({
  baseURL: URL,
});

const SUCCESS = {
  Y: "Y",
  N: "N",
};

const QUESTION_SEQ = "6";
const TARGET_SEQ = "100209";

const api = {};

api.getQuestions = async () => {
  const res = await axios.get("/questions", {
    params: { apikey : APIKEY, q: QUESTION_SEQ },
    headers: { "Access-Control-Allow-Origin": "*"},
  });
  if (res?.data?.SUCC_YN === SUCCESS.Y) {
    return res.data.RESULT;
  }
  throw new Error(res?.data?.ERROR_REASON || "");
};

api.submit = async ({ name, gender, startDtm, answers }) => {
  const qestrnSeq = QUESTION_SEQ;
  const trgetSe = TARGET_SEQ;
  const res = await axios.post("/report", {
    APIKEY,
    qestrnSeq,
    trgetSe,
    name,
    gender,
    startDtm,
    answers,
  });
  if (res?.data?.SUCC_YN === SUCCESS.Y) {
    return res.data.RESULT;
  }
  throw new Error(res?.data?.ERROR_REASON || "");
};

export default api;
